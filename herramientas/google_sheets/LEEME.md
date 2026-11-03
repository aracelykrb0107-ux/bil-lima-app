# Conectar la app a Google Sheets (tu Drive)

Se hace una sola vez y toma unos 10 minutos.

## 1. Crear la hoja de cálculo
1. Entra a https://drive.google.com con tu cuenta.
2. **Nuevo → Hojas de cálculo de Google**.
3. Ponle de nombre **Base de datos BIL-Lima**.

## 2. Pegar el script
1. En esa hoja, menú **Extensiones → Apps Script**. Se abre el editor en otra pestaña.
2. Borra todo lo que aparece en `Código.gs` y pega el contenido de `Code.gs` (de esta carpeta).
3. Pulsa el ícono del disquete (**Guardar**).

## 3. Autorizar los permisos
1. Arriba, en el selector de funciones, elige **probar** y pulsa **Ejecutar**.
2. Aparece "Se requiere autorización": **Revisar permisos** y elige tu cuenta.
3. Google muestra "Google no verificó esta aplicación" (es normal: el script es tuyo).
   Pulsa **Configuración avanzada → Ir a … (no seguro)** y luego **Permitir**.
4. En el registro de ejecución debe aparecer "Permisos concedidos".
   En tu Drive se crea la carpeta **BIL-Lima respaldos**.

## 4. Publicar como aplicación web
1. Botón azul **Implementar → Nueva implementación**.
2. En el engranaje de "Seleccionar tipo", elige **Aplicación web**.
3. Completa:
   - Descripción: `BIL-Lima`
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
4. **Implementar** y copia la **URL de la aplicación web** (termina en `/exec`).

Comprobación: abre esa URL en el navegador. Debe mostrar `{"ok":true,"servicio":"Base de datos BIL-Lima"}`.

## 5. Conectar la app
Pega la URL en `config.js`, en `urlBaseDatos`, y sube el cambio (o pásasela a Claude).

## Qué se guarda
Cada vez que una empresa pulsa **Finalizar**:
- **Evaluaciones:** una fila con los datos generales, el proyecto, los evaluadores, el tiempo, las prioridades y el nivel acordado de los 21 subatributos.
- **Niveles:** una fila por subatributo (acordado, sugerido, discrepancia, dudas, prioritario).
- **Componentes:** el peldaño elegido en cada componente.
- **Cierre:** las tres respuestas de cierre.
- Una copia completa en JSON en la carpeta **BIL-Lima respaldos**.

Si la misma evaluación se finaliza otra vez, sus filas se reemplazan (no se duplican).

## Si cambias el script después
Tras editar `Code.gs`, usa **Implementar → Gestionar implementaciones → Editar (lápiz) → Versión: Nueva versión → Implementar**. Así la URL no cambia.
