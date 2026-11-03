/**
 * Base de datos BIL-Lima en Google Sheets
 *
 * Recibe cada evaluación que se finaliza en la app y la guarda en esta hoja de cálculo:
 *   - Evaluaciones: una fila por evaluación (datos generales y nivel de cada subatributo)
 *   - Niveles:      una fila por subatributo
 *   - Componentes:  el peldaño elegido en cada componente
 *   - Cierre:       las respuestas de cierre
 * Además guarda una copia completa (JSON) en la carpeta "BIL-Lima respaldos" de tu Drive.
 * Si llega otra vez la misma evaluación (mismo ID), sus filas se reemplazan, no se duplican.
 *
 * CLAVE debe ser igual a "clave" en config.js de la app.
 */
const CLAVE = 'bil-8d440df9b305c89a619897f0';
const CARPETA = 'BIL-Lima respaldos';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.clave !== CLAVE) return salida({ ok: false, error: 'clave incorrecta' });
    if (!d.id || !d.hojas) return salida({ ok: false, error: 'datos incompletos' });
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    Object.keys(d.hojas).forEach(function (nombre) {
      reemplazar(ss, nombre, d.hojas[nombre].cab, d.id, d.hojas[nombre].filas || []);
    });
    respaldo(d);
    return salida({ ok: true });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Para comprobar en el navegador que la URL funciona
function doGet() {
  return salida({ ok: true, servicio: 'Base de datos BIL-Lima' });
}

// Ejecútala una vez desde el editor para autorizar los permisos y crear la carpeta de respaldos
function probar() {
  carpeta();
  SpreadsheetApp.getActiveSpreadsheet().getName();
  Logger.log('Permisos concedidos. Ya puedes implementar la aplicación web.');
}

function reemplazar(ss, nombre, cab, id, filas) {
  let h = ss.getSheetByName(nombre);
  if (!h) {
    h = ss.insertSheet(nombre);
    h.getRange(1, 1, 1, cab.length).setValues([cab]).setFontWeight('bold');
    h.setFrozenRows(1);
  } else if (h.getLastColumn() < cab.length || h.getRange(1, 1, 1, cab.length).getValues()[0].join('|') !== cab.join('|')) {
    // La app cambió de columnas: se actualiza la cabecera
    h.getRange(1, 1, 1, cab.length).setValues([cab]).setFontWeight('bold');
  }
  // Borra las filas anteriores de esta evaluación (columna A = ID)
  const n = h.getLastRow();
  if (n > 1) {
    const ids = h.getRange(2, 1, n - 1, 1).getValues();
    for (let i = ids.length - 1; i >= 0; i--) {
      if (ids[i][0] === id) h.deleteRow(i + 2);
    }
  }
  if (filas.length) {
    const datos = filas.map(function (f) { return cab.map(function (_, j) { return f[j] == null ? '' : f[j]; }); });
    h.getRange(h.getLastRow() + 1, 1, datos.length, cab.length).setValues(datos);
  }
}

function carpeta() {
  const it = DriveApp.getFoldersByName(CARPETA);
  return it.hasNext() ? it.next() : DriveApp.createFolder(CARPETA);
}

function respaldo(d) {
  const f = carpeta();
  const nombre = (d.organizacion || 'evaluacion').replace(/[\\/:*?"<>|]+/g, '_') + '_' + d.id + '.json';
  const previos = f.getFilesByName(nombre);
  while (previos.hasNext()) previos.next().setTrashed(true);
  f.createFile(nombre, JSON.stringify(d.evaluacion, null, 2), MimeType.PLAIN_TEXT);
}

function salida(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
