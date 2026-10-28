#!/usr/bin/env python3
"""
Convierte las fichas de subatributos (Markdown) en data.js.

Uso:
  python3 herramientas/fichas_a_data.py fuentes/Descriptores_BIL-Lima_v1.md \
      --version "BIL-Lima v1 (preliminar)" --fecha 2026-10-28 > data.js

Acepta un archivo con las 21 fichas juntas o varios archivos (una ficha por
archivo, por ejemplo Modelo_v2/*.md). De cada ficha toma:
  - encabezado "# Subatributo X.Y — Nombre en inglés (Nombre en español)"
  - línea "### Atributo en inglés (Atributo en español) | ..."
  - "**Descripción:** ..."
  - B. Matriz de reparto (tabla Componente | N1..N5)
  - C. Descriptores (tabla Nivel | Descriptor)
Ignora los límites, la sección D y las referencias.
Si algo no cuadra, lo informa por stderr y termina con error.
"""
import argparse
import json
import re
import sys

ESTADOS = {"●", "○", "·", "-"}
errores = []


def separar_parentesis_final(texto):
    """'Visual Management (VM) (Gestión visual)' -> ('Visual Management (VM)', 'Gestión visual')"""
    texto = texto.strip()
    if not texto.endswith(")"):
        return texto, ""
    prof = 0
    for i in range(len(texto) - 1, -1, -1):
        if texto[i] == ")":
            prof += 1
        elif texto[i] == "(":
            prof -= 1
            if prof == 0:
                return texto[:i].strip(), texto[i + 1:-1].strip()
    return texto, ""


def celdas(linea):
    partes = linea.strip().strip("|").split("|")
    return [p.strip() for p in partes]


def leer_celda(c, donde):
    if c in ESTADOS:
        return {"e": c, "t": ""}
    m = re.match(r"^([●○·])\s*\((.*)\)\s*$", c)
    if m:
        return {"e": m.group(1), "t": m.group(2).strip()}
    errores.append(f"{donde}: celda no reconocida '{c}' (se marca [REVISAR])")
    return {"e": c[:1] if c[:1] in ESTADOS else "-", "t": "[REVISAR] " + c}


def parsear(texto):
    fichas = re.split(r"(?m)^# Subatributo ", texto)[1:]
    subs = []
    for f in fichas:
        lineas = f.splitlines()
        cab = lineas[0]
        m = re.match(r"^(\d+)\.(\d+)\s+—\s+(.*)$", cab)
        if not m:
            errores.append(f"Encabezado no reconocido: {cab}")
            continue
        codigo = f"{m.group(1)}.{m.group(2)}"
        en, es = separar_parentesis_final(m.group(3))
        attr_linea = next((l for l in lineas if l.startswith("### ")), "")
        a_en, a_es = separar_parentesis_final(attr_linea[4:].split("|")[0])
        desc = ""
        for l in lineas:
            if l.startswith("**Descripción:**"):
                desc = l[len("**Descripción:**"):].strip()
        if not desc:
            errores.append(f"{codigo}: sin descripción")

        seccion = None
        componentes, descriptores, niveles = [], {}, {}
        for l in lineas:
            if l.startswith("## "):
                seccion = l[3:4]
                continue
            if not l.startswith("|") or re.match(r"^\|\s*-{3}", l):
                continue
            c = celdas(l)
            if seccion == "B":
                if c[0] == "Componente":
                    continue
                mc = re.match(r"^([A-Z]+\d+)\.\s*(.*)$", c[0])
                if not mc or len(c) != 6:
                    errores.append(f"{codigo}: fila de matriz no reconocida: {l}")
                    continue
                componentes.append({
                    "codigo": mc.group(1),
                    "nombre": mc.group(2).strip(),
                    "niveles": [leer_celda(c[k], f"{codigo} {mc.group(1)} N{k}") for k in range(1, 6)],
                })
            elif seccion == "C":
                if c[0] == "Nivel":
                    continue
                mn = re.match(r"^\*\*N(\d)\s+—\s+(.*?)\*\*$", c[0])
                if not mn:
                    errores.append(f"{codigo}: fila de descriptor no reconocida: {l}")
                    continue
                n = int(mn.group(1))
                descriptores[n] = c[1]
                niveles[n] = mn.group(2).strip()
        if sorted(descriptores) != [1, 2, 3, 4, 5]:
            errores.append(f"{codigo}: descriptores incompletos ({sorted(descriptores)})")
        if not componentes:
            errores.append(f"{codigo}: sin matriz de componentes")
        codigos = [x["codigo"] for x in componentes]
        if len(set(codigos)) != len(codigos):
            errores.append(f"{codigo}: códigos de componente repetidos")
        subs.append({
            "codigo": codigo, "atributo": int(m.group(1)),
            "atributo_en": a_en, "atributo_es": a_es,
            "nombre_en": en, "nombre_es": es, "descripcion": desc,
            "descriptores": [descriptores.get(k, "[REVISAR]") for k in range(1, 6)],
            "componentes": componentes, "_niveles": niveles,
        })
    return subs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("archivos", nargs="+")
    ap.add_argument("--nombre", default="Modelo de madurez BIL-Lima (BIM, IPD y Lean Construction)")
    ap.add_argument("--version", required=True)
    ap.add_argument("--fecha", required=True)
    args = ap.parse_args()

    texto = "\n".join(open(a, encoding="utf-8").read() for a in args.archivos)
    subs = parsear(texto)
    subs.sort(key=lambda s: tuple(int(x) for x in s["codigo"].split(".")))

    # Nombres de nivel: tomados de las fichas, deben coincidir en todas
    nombres = {}
    for s in subs:
        for n, nom in s["_niveles"].items():
            if n in nombres and nombres[n] != nom:
                errores.append(f"{s['codigo']}: nombre del N{n} distinto ('{nom}' vs '{nombres[n]}')")
            nombres.setdefault(n, nom)

    atributos = []
    for s in subs:
        if not atributos or atributos[-1]["codigo"] != str(s["atributo"]):
            atributos.append({"codigo": str(s["atributo"]), "nombre_en": s["atributo_en"],
                              "nombre_es": s["atributo_es"], "subatributos": []})
        atributos[-1]["subatributos"].append({k: s[k] for k in
            ("codigo", "nombre_en", "nombre_es", "descripcion", "descriptores", "componentes")})

    modelo = {
        "meta": {
            "nombre": args.nombre, "version": args.version, "fecha": args.fecha,
            "niveles": [{"n": n, "nombre": nombres.get(n, "[REVISAR]")} for n in range(1, 6)],
        },
        "atributos": atributos,
    }

    n_comp = sum(len(s["componentes"]) for a in atributos for s in a["subatributos"])
    n_check = sum(1 for a in atributos for s in a["subatributos"] for c in s["componentes"]
                  for x in c["niveles"] if x["e"] == "●")
    print(f"Atributos: {len(atributos)} | Subatributos: {len(subs)} | Componentes: {n_comp} | "
          f"Descriptores: {sum(len(s['descriptores']) for s in subs)} | Celdas ●: {n_check}", file=sys.stderr)
    for e in errores:
        print("AVISO:", e, file=sys.stderr)

    cuerpo = json.dumps(modelo, ensure_ascii=False, indent=1)
    print("""// ============================================================
// data.js — Modelo de madurez BIL-Lima
// Es el ÚNICO archivo que hay que editar para cambiar el modelo.
// Generado con herramientas/fichas_a_data.py a partir de las fichas
// de los subatributos (Bloques B y C). Puede editarse a mano.
//
// Estructura:
//   meta: nombre, version, fecha, niveles[5]
//   atributos[] -> { codigo, nombre_en, nombre_es, subatributos[] }
//   subatributos[] -> { codigo, nombre_en, nombre_es, descripcion,
//                       descriptores[5] (N1..N5), componentes[] }
//   componentes[] -> { codigo, nombre, niveles[5] }  (N1..N5)
//   cada nivel -> { e: estado, t: texto entre paréntesis }
//     e = "●" se exige en ese nivel (casilla de verificación)
//         "○" presupuesto por acumulación   "·" aún no exigido
//         "-" sin contenido
// ============================================================
window.BIL_DATA = """ + cuerpo + ";")
    if errores:
        sys.exit(1)


if __name__ == "__main__":
    main()
