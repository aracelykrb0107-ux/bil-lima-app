# Evaluación de madurez BIL-Lima (BIM, IPD y Lean Construction)

Aplicación web para aplicar el modelo de madurez **BIL-Lima** (adaptado de Rashidian et al., 2024, a Lima Metropolitana) en una organización del sector construcción. Es un sitio estático: no necesita servidor ni instalación.

## Cómo abrirla
- **En la computadora:** descarga la carpeta y haz doble clic en `index.html`.
- **En GitHub Pages:** en *Settings → Pages*, publica la rama principal (carpeta raíz).
- Necesita internet para cargar las librerías (Chart.js, SheetJS y jsPDF) desde un CDN.
- El avance se guarda solo en el navegador. Al pie de la página están **Importar JSON**, **Exportar JSON** (para retomar una evaluación en otra computadora) y **Nueva evaluación**.
- Cada evaluación tiene un identificador único y guarda la versión del modelo con que se hizo.

## Archivos
| Archivo | Contenido |
|---|---|
| `index.html`, `styles.css`, `app.js` | Interfaz y lógica. No hace falta tocarlos para cambiar el modelo. |
| `data.js` | **Todo el modelo:** atributos, subatributos, descriptores y matriz de componentes. |
| `config.js` | URL de la base de datos en Google Sheets. Si está vacía, no se envía nada. |
| `fuentes/` | Fichas de los subatributos en Markdown (fuente de `data.js`). |
| `herramientas/fichas_a_data.py` | Convierte las fichas en `data.js`. |

## Cómo editar `data.js`
El modelo es el objeto `window.BIL_DATA`:
```js
meta: { nombre, version, fecha, niveles: [{ n: 1, nombre: "Initial (individual)" }, …] }
atributos: [{ codigo: "1", nombre_en, nombre_es, subatributos: [
  { codigo: "1.1", nombre_en, nombre_es, descripcion,
    descriptores: ["N1…", "N2…", "N3…", "N4…", "N5…"],
    componentes: [{ codigo: "L1", nombre,
      niveles: [ {e:"-", t:""}, {e:"●", t:"lookahead del proyecto"}, … ] }] } ] }]
```
- `e` es el estado de la celda: `"●"` se exige en ese nivel (lleva casilla), `"○"` presupuesto por acumulación, `"·"` aún no exigido, `"-"` sin contenido. `t` es el texto entre paréntesis, sin los paréntesis.
- **Cambiar un texto:** edita `descripcion`, un elemento de `descriptores` (`[0]` = N1 … `[4]` = N5) o el `t` de una celda.
- **Mover un componente de nivel:** cambia los `e` de su fila (por ejemplo, el `"●"` pasa a N2 y en N3 queda `"○"`).
- **Agregar o quitar** un componente, un subatributo o un atributo: copia o borra su bloque. Los gráficos, las tablas, el progreso y la hoja de ruta se ajustan solos.
- Mantén los códigos (`1.1`, `L1`…) entre versiones siempre que puedas: las evaluaciones guardadas se vinculan por esos códigos.

### Regenerar `data.js` desde las fichas (recomendado para el modelo v2)
Las fichas deben conservar el formato de `fuentes/`: encabezado `# Subatributo X.Y — Nombre (Nombre en español)`, la línea del atributo, `**Descripción:**`, la tabla **B. Matriz de reparto** y la tabla **C. Descriptores**. Puede ser un solo archivo con todas o un archivo por ficha.
```bash
python3 herramientas/fichas_a_data.py Modelo_v2/*.md --version "BIL-Lima v2" --fecha 2027-01-15 > data.js
```
El script muestra los conteos y avisa si falta un descriptor, si una celda no se reconoce (la marca `[REVISAR]`) o si un nombre de nivel no coincide.

## Cómo cambiar la versión del modelo
En `data.js`, cambia `meta.version` (por ejemplo `"BIL-Lima v2"`) y `meta.fecha`, o usa `--version` y `--fecha` del script. La versión aparece en la cabecera, en el pie del PDF y en el Excel. Al importar un JSON hecho con otra versión, la app avisa antes de cargarlo.

## Otras opciones que se editan en `app.js`
- **Áreas de los evaluadores:** lista `AREAS` al inicio de `app.js` (la opción "Otro" permite escribir el área).
- **Preguntas de cierre:** lista `PREGUNTAS` (texto y respuesta rápida: "Ninguno", "Ninguna", "Nada").
- **Ayuda en los diagramas:** al pasar el cursor sobre un subatributo se muestra su descripción. Si en `data.js` se agrega a un subatributo el campo `"resumen": "…"`, se muestra ese texto breve en su lugar.

## Conectar Google Sheets (después)
Pon en `config.js` la URL de la aplicación web de Google Apps Script en `urlBaseDatos`. La evaluación se envía automáticamente al pulsar **Finalizar** (POST, JSON en texto plano), sin botón visible.
