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

## Página "El modelo"
Es la portada de la app: presenta la estructura del modelo (BIL-Lima al centro y los atributos alrededor; al pulsar uno se ven sus subatributos con su descripción), los cinco niveles, las instrucciones de aplicación y las características del modelo. El botón **Ver un ejemplo de resultados** carga una evaluación ficticia para mostrar el reporte; esa evaluación no se envía a la base de datos y se sale de ella con **Salir del ejemplo**.

## Cómo se evalúa cada subatributo
- **Proyecto de referencia:** en el Inicio se registra un proyecto. Las prácticas de N2 se verifican en ese proyecto; las de N3 y N4, en la empresa; las de N5, entre las partes. Los colores de la matriz indican ese alcance.
- **Matriz de componentes:** en cada fila se marca la práctica más alta que se cumple (o "Aún no"); las anteriores de la fila se marcan solas. Con eso se calcula el **nivel sugerido** (regla acumulativa), que se resalta en dorado. Los evaluadores eligen el **nivel acordado**.

## Otras opciones que se editan en `app.js`
- **Áreas de los evaluadores:** lista `AREAS` al inicio de `app.js` (la opción "Otro" permite escribir el área).
- **Preguntas de cierre:** lista `PREGUNTAS` (texto y respuesta rápida: "Ninguno", "Ninguna", "Nada").
- **Ayuda en los diagramas:** al pasar el cursor sobre un subatributo se muestra su descripción. Si en `data.js` se agrega a un subatributo el campo `"resumen": "…"`, se muestra ese texto breve en su lugar.

## Base de datos en Google Sheets
Cada evaluación se envía automáticamente al pulsar **Finalizar** a un Google Sheets de tu Drive (hojas Evaluaciones, Niveles, Componentes y Cierre, más una copia JSON en la carpeta "BIL-Lima respaldos"). Los pasos para crearlo están en `herramientas/google_sheets/LEEME.md`; luego se pega la URL en `config.js` (`urlBaseDatos`). La `clave` de `config.js` debe coincidir con `CLAVE` en `Code.gs`.
