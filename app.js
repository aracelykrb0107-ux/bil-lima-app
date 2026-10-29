(function () {
  'use strict';

  const D = window.BIL_DATA;
  const CFG = window.BIL_CONFIG || {};
  const KEY = 'bil-lima-evaluacion';
  const $ = (id) => document.getElementById(id);
  const NIV = D.meta.niveles;                       // [{n, nombre}]
  const NMAX = NIV.length;                          // 5
  const SUBS = [];                                  // lista plana en el orden del modelo
  D.atributos.forEach((a) => a.subatributos.forEach((s) => SUBS.push({ a, s })));
  const TOTAL = SUBS.length;
  const MIN_EV = 2, MAX_EV = 4;
  // Áreas de los evaluadores (la última opción permite escribir otra)
  const AREAS = ['Gerencia General', 'Gerencia de Proyectos', 'Operaciones / Producción', 'VDC / BIM',
    'Planeamiento y Control de Proyectos', 'Oficina Técnica', 'Ingeniería / Diseño', 'Calidad',
    'Seguridad y Salud en el Trabajo', 'Logística', 'Comercial', 'Otro'];
  const PREGUNTAS = [
    { k: 'p1', t: '1. ¿Qué descriptores o subatributos les costó interpretar, y por qué?', nada: 'Ninguno' },
    { k: 'p2', t: '2. ¿Qué dificultades tuvieron con la herramienta web?', nada: 'Ninguna' },
    { k: 'p3', t: '3. ¿Qué cambiarían para que el modelo sea más útil para su empresa?', nada: 'Nada' }
  ];
  let charts = [];

  /* ================= Utilidades ================= */
  function el(tag, cls, txt) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function uuid() {
    try { if (window.crypto && crypto.randomUUID) return crypto.randomUUID(); } catch (e) { /* contexto no seguro */ }
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    const h = Array.from(b, (x) => x.toString(16).padStart(2, '0')).join('');
    return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
  }
  const hoy = () => new Date().toLocaleDateString('en-CA');
  const fechaHora = (iso) => iso ? new Date(iso).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) : '—';
  function duracionTxt(min) {
    if (min == null) return '—';
    const h = Math.floor(min / 60), m = min % 60;
    return (h ? h + ' h ' : '') + m + ' min';
  }
  const nivelNombre = (n) => 'N' + n + ' ' + NIV[n - 1].nombre;
  const subEtq = (s) => s.codigo + ' ' + s.nombre_en;
  const subEtqLarga = (s) => s.codigo + ' ' + s.nombre_en + ' (' + s.nombre_es + ')';
  const attrEtq = (a) => a.nombre_en + ' (' + a.nombre_es + ')';
  const dec = (x) => x.toLocaleString('es-PE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  function descargar(blob, nombre) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  function nombreArchivo(base, ext, anon) {
    const org = anon ? 'Organizacion_X' : (estado.inicio.org || 'organizacion');
    return base + '_' + org.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w-]+/g, '_') + '_' + (estado.inicio.fecha || hoy()) + '.' + ext;
  }
  function mensaje(txt, ok) {
    const m = $('msg-global');
    m.textContent = txt; m.className = 'msg' + (ok ? ' ok' : '');
    if (txt) setTimeout(() => { if (m.textContent === txt) m.textContent = ''; }, 6000);
  }

  /* ================= Estado ================= */
  const evVacio = () => ({ cargo: '', area: '', areaOtro: '', anios: '', nombre: '', anon: false });
  function nuevoEstado() {
    return {
      id: uuid(),
      modelo: { nombre: D.meta.nombre, version: D.meta.version, fecha: D.meta.fecha },
      creado: new Date().toISOString(), actualizado: null,
      inicio: { org: '', fecha: hoy(), tipo: '', cat: '', ev: [evVacio(), evVacio()], facil: '' },
      horaInicio: null, horaFin: null, envio: null,
      vista: 'inicio', paso: 0,
      subs: {},                                 // codigo -> estado del subatributo
      prior: { modo: '', sel: {} },             // modo: 'app' | 'evaluadores'; sel: atributo -> subatributo
      cierre: { p1: '', p1n: false, p2: '', p2n: false, p3: '', p3n: false }
    };
  }
  // Completa campos y convierte evaluaciones guardadas con versiones anteriores de la app
  function normalizar(s) {
    const base = nuevoEstado();
    const e = Object.assign(base, s);
    e.inicio = Object.assign(nuevoEstado().inicio, s.inicio || {});
    e.inicio.ev = (e.inicio.ev || []).map((v) => Object.assign(evVacio(), v));
    while (e.inicio.ev.length < MIN_EV) e.inicio.ev.push(evVacio());
    Object.values(e.subs || {}).forEach((st) => {
      if (!Array.isArray(st.prop)) st.prop = [st.p1 || '', st.p2 || ''];
      delete st.p1; delete st.p2; delete st.ejemplo;
      if (st.sinDudas == null) st.sinDudas = false;
    });
    if (Array.isArray(s.prioridades)) {
      const sel = {};
      s.prioridades.forEach((c) => { const a = c.split('.')[0]; if (!sel[a]) sel[a] = c; });
      e.prior = { modo: s.prioridades.length ? 'evaluadores' : '', sel };
    }
    delete e.prioridades;
    e.prior = Object.assign({ modo: '', sel: {} }, e.prior || {});
    e.cierre = Object.assign(nuevoEstado().cierre, s.cierre || {});
    delete e.cierre.nInd; delete e.cierre.nEval;
    return e;
  }
  let estado = nuevoEstado();

  function subEstado(cod) {
    if (!estado.subs[cod]) estado.subs[cod] = { m: {}, acordado: null, notaDif: '', disc: '', prop: [], sinDudas: false, dudas: '' };
    return estado.subs[cod];
  }
  function guardar() {
    estado.actualizado = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(estado)); } catch (e) { /* almacenamiento no disponible */ }
  }
  function cargar() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === 'object' && s.id) estado = normalizar(s);
    } catch (e) { /* sin datos */ }
  }
  const areaTxt = (v) => v.area === 'Otro' ? (v.areaOtro || 'Otro') : v.area;
  const evTxt = (v, conNombre) => [v.cargo, areaTxt(v), v.anios ? v.anios + ' años' : ''].filter(Boolean).join(' · ') +
    (conNombre && v.nombre && !v.anon ? ' (' + v.nombre + ')' : '');

  /* ================= Lógica del modelo ================= */
  // Celdas "●" de un subatributo: casillas de verificación
  function celdasReq(s) {
    const out = [];
    s.componentes.forEach((c) => c.niveles.forEach((x, i) => {
      if (x.e === '●') out.push({ c, n: i + 1, t: x.t, k: c.codigo + '@' + (i + 1) });
    }));
    return out;
  }
  const marcada = (cod, k) => !!(estado.subs[cod] && estado.subs[cod].m[k]);
  // Celdas "●" del nivel n que no están marcadas
  function faltantes(s, n) {
    return celdasReq(s).filter((r) => r.n === n && !marcada(s.codigo, r.k));
  }
  // N1 es la base; el nivel k se alcanza si están marcadas todas las "●" de N2..Nk, sin saltos
  function sugerido(s) {
    let k = 1;
    for (let n = 2; n <= NMAX; n++) {
      if (faltantes(s, n).length) break;
      k = n;
    }
    return k;
  }
  const acordado = (cod) => (estado.subs[cod] && estado.subs[cod].acordado) || null;
  const conNivel = () => SUBS.filter((x) => acordado(x.s.codigo)).length;
  const compTxt = (r) => r.c.codigo + '. ' + r.c.nombre + (r.t ? ' (' + r.t + ')' : '');

  // Nivel actual para resultados: el acordado (si falta, el sugerido, señalado)
  function nivelActual(s) {
    const ac = acordado(s.codigo);
    return ac ? { n: ac, fuente: 'acordado' } : { n: sugerido(s), fuente: 'sugerido' };
  }

  // Prioridades: uno por atributo, como máximo
  function propuestaApp() {
    const out = {};
    D.atributos.forEach((a) => {
      let mejor = null;
      a.subatributos.forEach((s) => {
        const n = nivelActual(s).n;
        if (n < NMAX && (!mejor || n < mejor.n)) mejor = { s, n };
      });
      out[a.codigo] = mejor ? mejor.s.codigo : '';
    });
    return out;
  }
  function prioridadesSel() {
    if (estado.prior.modo === 'app') return propuestaApp();
    if (estado.prior.modo === 'evaluadores') return estado.prior.sel;
    return {};
  }
  const listaPrior = () => Object.values(prioridadesSel()).filter(Boolean);
  const esPrior = (cod) => listaPrior().includes(cod);
  const modoPriorTxt = () => estado.prior.modo === 'app' ? 'Propuesta de la aplicación' : estado.prior.modo === 'evaluadores' ? 'Elegidas por los evaluadores' : 'Sin definir';

  function hojaDeRuta() {
    const items = SUBS.map((x, i) => {
      const na = nivelActual(x.s);
      return { a: x.a, s: x.s, i, n: na.n, fuente: na.fuente, prior: esPrior(x.s.codigo) };
    });
    const ruta = items.filter((it) => it.n < NMAX)
      .sort((p, q) => p.n - q.n || p.i - q.i)
      .map((it, j) => Object.assign(it, {
        prioridad: j + 1,
        siguiente: it.n + 1,
        exige: it.s.descriptores[it.n],
        faltan: faltantes(it.s, it.n + 1)
      }));
    const incons = [];
    items.forEach((it) => {
      for (let n = 2; n <= it.n; n++) faltantes(it.s, n).forEach((r) => incons.push({ it, n, r }));
    });
    const max = items.filter((it) => it.n >= NMAX);
    return { ruta, incons, max };
  }

  function rangoAtributo(a) {
    const v = a.subatributos.map((s) => acordado(s.codigo)).filter(Boolean);
    if (!v.length) return 'sin niveles acordados';
    const mi = Math.min(...v), ma = Math.max(...v);
    const txt = mi === ma ? 'N' + mi : 'N' + mi + ' a N' + ma;
    return v.length < a.subatributos.length ? txt + ' (faltan ' + (a.subatributos.length - v.length) + ')' : txt;
  }
  // Solo de referencia en el PDF: el modelo no promedia niveles
  function promedioRef(a) {
    const v = a.subatributos.map((s) => acordado(s.codigo)).filter(Boolean);
    return v.length ? v.reduce((x, y) => x + y, 0) / v.length : null;
  }
  // Subatributos agrupados por nivel acordado, de N5 a N1
  function gruposPorNivel() {
    const g = [];
    for (let n = NMAX; n >= 1; n--) {
      const l = SUBS.filter((x) => acordado(x.s.codigo) === n).map((x) => x.s);
      if (l.length) g.push({ n, subs: l });
    }
    const sin = SUBS.filter((x) => !acordado(x.s.codigo)).map((x) => x.s);
    return { g, sin };
  }

  /* ================= Navegación ================= */
  const VISTAS = ['inicio', 'eval', 'prior', 'cierre', 'res'];
  function mostrar(v) {
    if (v !== 'inicio' && !estado.horaInicio) v = 'inicio';
    estado.vista = v;
    $('tip').hidden = true;
    VISTAS.forEach((n) => { $('vista-' + n).hidden = n !== v; });
    document.querySelectorAll('#pasos button').forEach((b) => {
      b.setAttribute('aria-current', b.dataset.vista === v ? 'true' : 'false');
      b.disabled = b.dataset.vista !== 'inicio' && !estado.horaInicio;
    });
    guardar();
    if (v === 'inicio') renderInicio();
    if (v === 'eval') renderEval();
    if (v === 'prior') renderPrior();
    if (v === 'cierre') renderCierre();
    if (v === 'res') renderResultados();
    window.scrollTo(0, 0);
  }
  document.querySelectorAll('#pasos button').forEach((b) => b.addEventListener('click', () => mostrar(b.dataset.vista)));
  document.querySelectorAll('[data-ir]').forEach((b) => b.addEventListener('click', () => mostrar(b.dataset.ir)));

  /* ================= 1. Inicio ================= */
  const CAMPOS_ORG = [['f-org', 'org', true], ['f-fecha', 'fecha', true], ['f-tipo', 'tipo', true], ['f-cat', 'cat', true], ['f-facil', 'facil', false]];
  CAMPOS_ORG.forEach(([id, k]) => $(id).addEventListener('input', () => { estado.inicio[k] = $(id).value.trim(); guardar(); }));

  function campoTexto(lbl, tipo, v, k, extra) {
    const l = el('label', '', lbl);
    const i = el('input'); i.type = tipo; i.value = v[k] || ''; i.dataset.k = k;
    if (extra) Object.assign(i, extra);
    i.addEventListener('input', () => { v[k] = i.value.trim(); guardar(); });
    l.appendChild(i);
    return l;
  }
  function renderEvaluadores() {
    const cont = $('evaluadores');
    cont.innerHTML = '';
    estado.inicio.ev.forEach((v, k) => {
      const fs = el('fieldset');
      fs.dataset.ev = k;
      const lg = el('legend', 'ev-cab', 'Evaluador ' + (k + 1));
      fs.appendChild(lg);
      if (k >= MIN_EV) {
        const q = el('button', 'enlace ev-quitar', 'Quitar');
        q.type = 'button';
        q.addEventListener('click', () => { estado.inicio.ev.splice(k, 1); guardar(); renderEvaluadores(); });
        lg.appendChild(document.createTextNode(' · ')); lg.appendChild(q);
      }
      const g = el('div', 'grid4');
      g.appendChild(campoTexto('Cargo', 'text', v, 'cargo'));
      // Área: lista desplegable con opción "Otro"
      const la = el('label', '', 'Área');
      const sa = el('select'); sa.dataset.k = 'area';
      sa.appendChild(el('option', '', 'Seleccione…')).value = '';
      AREAS.forEach((a) => { const o = el('option', '', a === 'Otro' ? 'Otro (especificar)' : a); o.value = a; sa.appendChild(o); });
      sa.value = v.area || '';
      const io = el('input', 'otro'); io.type = 'text'; io.placeholder = 'Escriba el área'; io.value = v.areaOtro || ''; io.dataset.k = 'areaOtro';
      io.hidden = v.area !== 'Otro';
      sa.addEventListener('change', () => { v.area = sa.value; io.hidden = v.area !== 'Otro'; guardar(); });
      io.addEventListener('input', () => { v.areaOtro = io.value.trim(); guardar(); });
      la.appendChild(sa); la.appendChild(io);
      g.appendChild(la);
      g.appendChild(campoTexto('Años de experiencia', 'number', v, 'anios', { min: 0, max: 70 }));
      // Nombre opcional, con opción de anonimizar
      const ln = campoTexto('Nombre (opcional)', 'text', v, 'nombre');
      const inN = ln.querySelector('input');
      const lchk = el('label', 'chk');
      const cb = el('input'); cb.type = 'checkbox'; cb.checked = !!v.anon; cb.dataset.k = 'anon';
      const aplicar = () => { inN.disabled = cb.checked; if (cb.checked) { inN.value = ''; v.nombre = ''; } };
      cb.addEventListener('change', () => { v.anon = cb.checked; aplicar(); guardar(); });
      lchk.appendChild(cb); lchk.appendChild(document.createTextNode('Anonimizar'));
      ln.appendChild(lchk);
      aplicar();
      g.appendChild(ln);
      fs.appendChild(g);
      cont.appendChild(fs);
    });
    $('btn-agregar-ev').hidden = estado.inicio.ev.length >= MAX_EV;
  }
  $('btn-agregar-ev').addEventListener('click', () => {
    if (estado.inicio.ev.length >= MAX_EV) return;
    estado.inicio.ev.push(evVacio()); guardar(); renderEvaluadores();
  });

  function renderInicio() {
    CAMPOS_ORG.forEach(([id, k]) => { $(id).value = estado.inicio[k] || ''; $(id).classList.remove('invalido'); });
    renderEvaluadores();
    $('btn-iniciar').textContent = estado.horaInicio ? 'Guardar y continuar' : 'Iniciar';
    $('hora-inicio-txt').textContent = estado.horaInicio ? 'Hora de inicio registrada: ' + fechaHora(estado.horaInicio) : '';
    $('inicio-msg').textContent = '';
  }
  $('form-inicio').addEventListener('submit', (e) => {
    e.preventDefault();
    let faltan = 0;
    const marcar = (nodo, vacio) => { nodo.classList.toggle('invalido', vacio); if (vacio) faltan++; };
    CAMPOS_ORG.forEach(([id, k, req]) => { estado.inicio[k] = $(id).value.trim(); marcar($(id), req && !estado.inicio[k]); });
    document.querySelectorAll('#evaluadores fieldset').forEach((fs) => {
      const v = estado.inicio.ev[+fs.dataset.ev];
      fs.querySelectorAll('[data-k]').forEach((n) => {
        const k = n.dataset.k;
        if (k === 'cargo' || k === 'anios') marcar(n, !v[k]);
        if (k === 'area') marcar(n, !v.area);
        if (k === 'areaOtro') marcar(n, v.area === 'Otro' && !v.areaOtro);
      });
    });
    if (faltan) { $('inicio-msg').textContent = 'Complete los campos marcados en rojo.'; guardar(); return; }
    if (!estado.horaInicio) estado.horaInicio = new Date().toISOString();
    mostrar('eval');
  });

  /* ================= 2. Evaluación ================= */
  function llenarIrA() {
    const sel = $('sel-ir');
    sel.innerHTML = '';
    D.atributos.forEach((a) => {
      const g = document.createElement('optgroup');
      g.label = a.codigo + '. ' + a.nombre_en;
      a.subatributos.forEach((s) => {
        const o = el('option', '', (acordado(s.codigo) ? '✓ ' : '· ') + subEtq(s));
        o.value = SUBS.findIndex((x) => x.s === s);
        g.appendChild(o);
      });
      sel.appendChild(g);
    });
    sel.value = estado.paso;
  }
  $('sel-ir').addEventListener('change', () => { estado.paso = +$('sel-ir').value; renderEval(); window.scrollTo(0, 0); });

  function actualizarProgreso() {
    const n = conNivel();
    $('prog-pos').textContent = 'Subatributo ' + (estado.paso + 1) + ' de ' + TOTAL;
    $('prog-cnt').textContent = n + ' de ' + TOTAL + ' con nivel acordado';
    $('barra-fill').style.width = (100 * n / TOTAL) + '%';
  }

  function renderEval() {
    if (estado.paso < 0 || estado.paso >= TOTAL) estado.paso = 0;
    const { a, s } = SUBS[estado.paso];
    const st = subEstado(s.codigo);
    const cont = $('eval-sub');
    cont.innerHTML = '';
    const card = el('div', 'card');
    card.appendChild(el('p', 'attr-etq', 'Atributo ' + a.codigo + ' · ' + attrEtq(a)));
    const h = el('h2', 'sub-tit', s.codigo + ' ' + s.nombre_en + ' ');
    h.appendChild(el('span', 'es', '(' + s.nombre_es + ')'));
    card.appendChild(h);
    card.appendChild(el('p', 'desc', s.descripcion));

    // Matriz de componentes como lista de verificación
    card.appendChild(el('h3', '', 'Matriz de componentes'));
    card.appendChild(el('p', 'leyenda', 'Marquen las prácticas "●" que la organización cumple. "○" se presupone por acumulación (ya se verificó en un nivel anterior) · "·" aún no se exige · "–" sin contenido.'));
    const wrap = el('div', 'tabla-scroll');
    const t = el('table', 'matriz');
    const th = el('thead'), trh = el('tr');
    trh.appendChild(el('th', '', 'Componente'));
    NIV.forEach((nv) => trh.appendChild(el('th', nv.n === 1 ? 'n1' : '', 'N' + nv.n)));
    th.appendChild(trh); t.appendChild(th);
    const tb = el('tbody');
    s.componentes.forEach((c) => {
      const tr = el('tr');
      const td0 = el('td');
      td0.appendChild(el('span', 'cod', c.codigo + '. '));
      td0.appendChild(document.createTextNode(c.nombre));
      tr.appendChild(td0);
      c.niveles.forEach((x, i) => {
        const n = i + 1, td = el('td', 'cel');
        td.dataset.n = 'N' + n;
        if (x.e === '●') {
          const k = c.codigo + '@' + n;
          td.classList.add('req');
          const lb = el('label');
          const cb = el('input');
          cb.type = 'checkbox'; cb.checked = !!st.m[k]; cb.dataset.k = k;
          cb.setAttribute('aria-label', c.codigo + ' N' + n + (x.t ? ': ' + x.t : ''));
          cb.addEventListener('change', () => {
            if (cb.checked) st.m[k] = true; else delete st.m[k];
            td.classList.toggle('marcada', cb.checked);
            guardar(); refrescarNivel();
          });
          td.classList.toggle('marcada', cb.checked);
          lb.appendChild(cb);
          lb.appendChild(el('span', '', x.t || '●'));
          td.appendChild(lb);
        } else if (x.e === '○') {
          td.classList.add('acum');
          td.title = 'Presupuesto por acumulación';
          td.appendChild(el('span', 'sim', '○'));
        } else {
          td.classList.add('vacia');
          td.title = x.e === '·' ? 'Aún no se exige' : 'Sin contenido';
          td.appendChild(el('span', 'sim', x.e === '-' ? '–' : x.e));
        }
        tr.appendChild(td);
      });
      tb.appendChild(tr);
    });
    t.appendChild(tb); wrap.appendChild(t); card.appendChild(wrap);

    card.appendChild(el('div', 'sugerido-txt')).id = 'sugerido-txt';

    // Tarjetas de nivel
    card.appendChild(el('h3', '', 'Descriptores: hagan clic en el nivel acordado'));
    const grid = el('div', 'niveles');
    grid.id = 'tarjetas';
    grid.setAttribute('role', 'group');
    s.descriptores.forEach((txt, i) => {
      const n = i + 1;
      const b = el('button', 'nivel');
      b.type = 'button'; b.dataset.n = n;
      b.appendChild(el('div', 'badges'));
      const cab = el('div', 'cab', 'N' + n);
      cab.appendChild(el('small', '', NIV[i].nombre));
      b.appendChild(cab);
      b.appendChild(el('div', 'txt', txt));
      b.addEventListener('click', () => {
        st.acordado = st.acordado === n ? null : n;
        guardar(); refrescarNivel(); llenarIrA();
      });
      grid.appendChild(b);
    });
    card.appendChild(grid);

    // Aviso si el acordado difiere del sugerido
    const dif = el('div', 'alerta');
    dif.id = 'aviso-dif';
    dif.appendChild(el('p', '', '')).id = 'aviso-dif-txt';
    const ln = el('label', '', 'Nota breve: ¿por qué el nivel acordado difiere del sugerido?');
    const ta = el('textarea'); ta.rows = 2; ta.id = 'f-notadif'; ta.value = st.notaDif;
    ta.addEventListener('input', () => { st.notaDif = ta.value; guardar(); });
    ln.appendChild(ta); dif.appendChild(ln);
    card.appendChild(dif);

    // Discrepancia
    const campos = el('div', 'campos');
    const dDisc = el('div', 'full');
    dDisc.appendChild(el('label', '', '¿Hubo discrepancia entre los evaluadores?'));
    const rad = el('div', 'radios');
    const props = el('div', 'props');
    [['no', 'No'], ['si', 'Sí']].forEach(([v, txt]) => {
      const l = el('label'); const r = el('input');
      r.type = 'radio'; r.name = 'disc'; r.value = v; r.checked = st.disc === v;
      r.addEventListener('change', () => { st.disc = v; guardar(); props.hidden = v !== 'si'; });
      l.appendChild(r); l.appendChild(document.createTextNode(txt)); rad.appendChild(l);
    });
    dDisc.appendChild(rad);
    props.hidden = st.disc !== 'si';
    estado.inicio.ev.forEach((v, j) => {
      const l = el('label', '', 'Nivel propuesto por el evaluador ' + (j + 1) + (v.cargo ? ' (' + v.cargo + ')' : ''));
      const sel = el('select'); sel.className = 'f-prop'; sel.dataset.j = j;
      sel.appendChild(el('option', '', '—')).value = '';
      NIV.forEach((nv) => { const o = el('option', '', 'N' + nv.n); o.value = nv.n; sel.appendChild(o); });
      sel.value = st.prop[j] || '';
      sel.addEventListener('change', () => { st.prop[j] = sel.value ? +sel.value : ''; guardar(); refrescarInferior(); });
      l.appendChild(sel); props.appendChild(l);
    });
    const bInf = el('button', 'btn', '');
    bInf.type = 'button'; bInf.id = 'btn-inferior';
    bInf.addEventListener('click', () => {
      const v = propuestos(st);
      if (v.length >= 2) { st.acordado = Math.min(...v); guardar(); refrescarNivel(); llenarIrA(); }
    });
    props.appendChild(bInf);
    props.appendChild(el('p', 'hint', 'Si no hay acuerdo, se asigna el nivel inferior de los propuestos y se registra la discrepancia.'));
    dDisc.appendChild(props);
    campos.appendChild(dDisc);

    // Dudas o dificultades
    const dDu = el('div', 'full');
    dDu.appendChild(el('label', '', 'Dudas o dificultades'));
    const lsd = el('label', 'sin-dudas');
    const csd = el('input'); csd.type = 'checkbox'; csd.id = 'f-sindudas'; csd.checked = !!st.sinDudas;
    lsd.appendChild(csd); lsd.appendChild(document.createTextNode('No hubo dudas ni dificultades'));
    dDu.appendChild(lsd);
    const tDu = el('textarea'); tDu.rows = 2; tDu.id = 'f-dudas'; tDu.value = st.dudas; tDu.placeholder = 'Escriban aquí sus dudas o dificultades';
    tDu.hidden = !!st.sinDudas;
    csd.addEventListener('change', () => { st.sinDudas = csd.checked; tDu.hidden = csd.checked; guardar(); });
    tDu.addEventListener('input', () => { st.dudas = tDu.value; guardar(); });
    dDu.appendChild(tDu);
    campos.appendChild(dDu);
    card.appendChild(campos);

    cont.appendChild(card);
    $('btn-ant').disabled = estado.paso === 0;
    $('btn-sig').textContent = estado.paso === TOTAL - 1 ? 'Ir a prioridades →' : 'Siguiente →';
    llenarIrA();
    refrescarNivel();
    refrescarInferior();
    guardar();
  }
  const propuestos = (st) => (st.prop || []).slice(0, estado.inicio.ev.length).filter(Boolean);

  function refrescarInferior() {
    const st = subEstado(SUBS[estado.paso].s.codigo);
    const b = $('btn-inferior'); if (!b) return;
    const v = propuestos(st);
    b.disabled = v.length < 2;
    b.textContent = v.length >= 2 ? 'Asignar el nivel inferior (N' + Math.min(...v) + ')' : 'Asignar el nivel inferior';
  }

  function refrescarNivel() {
    const s = SUBS[estado.paso].s;
    const st = subEstado(s.codigo);
    const sug = sugerido(s);
    const sp = $('sugerido-txt');
    sp.textContent = '';
    sp.appendChild(document.createTextNode('Nivel sugerido por la matriz: '));
    sp.appendChild(el('b', '', nivelNombre(sug)));
    sp.appendChild(el('br'));
    sp.appendChild(el('span', 'hint', sug < NMAX
      ? 'Es el nivel que corresponde a los componentes marcados. Para N' + (sug + 1) + ' faltan ' + faltantes(s, sug + 1).length + ' componente(s).'
      : 'Es el nivel que corresponde a los componentes marcados.'));
    document.querySelectorAll('#tarjetas .nivel').forEach((b) => {
      const n = +b.dataset.n;
      b.setAttribute('aria-pressed', st.acordado === n ? 'true' : 'false');
      b.classList.toggle('sug', n === sug);
      const bd = b.querySelector('.badges');
      bd.innerHTML = '';
      if (n === sug) bd.appendChild(el('span', 'badge sug', '★ Sugerido por la matriz'));
      if (n === st.acordado) bd.appendChild(el('span', 'badge acord', 'Acordado'));
    });
    const dif = $('aviso-dif');
    dif.hidden = !(st.acordado && st.acordado !== sug);
    $('aviso-dif-txt').textContent = st.acordado
      ? 'El nivel acordado (N' + st.acordado + ') difiere del sugerido por la matriz (N' + sug + '). ' +
        (st.acordado > sug ? 'Recuerden que solo se está en un nivel si se cumple todo lo de los niveles anteriores. ' : '') +
        'Pueden mantenerlo; registren una nota breve.'
      : '';
    actualizarProgreso();
  }

  $('btn-ant').addEventListener('click', () => { if (estado.paso > 0) { estado.paso--; renderEval(); window.scrollTo(0, 0); } });
  $('btn-sig').addEventListener('click', () => {
    if (estado.paso < TOTAL - 1) { estado.paso++; renderEval(); window.scrollTo(0, 0); } else mostrar('prior');
  });

  /* ================= 3. Prioridades ================= */
  document.querySelectorAll('input[name=prior-modo]').forEach((r) => r.addEventListener('change', () => {
    estado.prior.modo = r.value; guardar(); renderPrior();
  }));
  function renderPrior() {
    document.querySelectorAll('input[name=prior-modo]').forEach((r) => { r.checked = r.value === estado.prior.modo; });
    const lista = $('prior-lista');
    lista.innerHTML = '';
    const modo = estado.prior.modo;
    const sel = prioridadesSel();
    if (modo) {
      D.atributos.forEach((a) => {
        lista.appendChild(el('div', 'prior-attr', a.codigo + '. ' + attrEtq(a)));
        const opciones = a.subatributos.map((s) => [s.codigo, subEtqLarga(s), nivelActual(s).n]).concat([['', 'Ninguno', null]]);
        opciones.forEach(([cod, txt, n]) => {
          const l = el('label');
          const r = el('input'); r.type = 'radio'; r.name = 'prior-' + a.codigo; r.value = cod;
          r.checked = (sel[a.codigo] || '') === cod;
          r.disabled = modo === 'app';
          r.addEventListener('change', () => { estado.prior.sel[a.codigo] = cod; guardar(); });
          l.classList.toggle('off', r.disabled && !r.checked);
          l.appendChild(r);
          l.appendChild(el('span', '', txt));
          if (n) l.appendChild(el('span', 'niv', 'N' + n));
          lista.appendChild(l);
        });
      });
    }
    const pend = SUBS.filter((x) => !acordado(x.s.codigo)).map((x) => x.s.codigo);
    $('prior-pend').textContent = !modo ? 'Elijan una de las dos opciones.' :
      pend.length ? 'Aún no tienen nivel acordado: ' + pend.join(', ') + '.' : '';
  }

  /* ================= 4. Cierre ================= */
  function renderCierre() {
    const c = $('preguntas-cierre');
    c.querySelectorAll('.pregunta').forEach((n) => n.remove());
    PREGUNTAS.forEach((p) => {
      const d = el('div', 'pregunta');
      d.appendChild(el('label', '', p.t));
      const l = el('label', 'sin-dudas');
      const cb = el('input'); cb.type = 'checkbox'; cb.id = 'c-' + p.k + 'n'; cb.checked = !!estado.cierre[p.k + 'n'];
      l.appendChild(cb); l.appendChild(document.createTextNode(p.nada));
      d.appendChild(l);
      const ta = el('textarea'); ta.rows = 3; ta.id = 'c-' + p.k; ta.value = estado.cierre[p.k] || ''; ta.placeholder = 'Escriban su respuesta';
      ta.hidden = cb.checked;
      cb.addEventListener('change', () => { estado.cierre[p.k + 'n'] = cb.checked; ta.hidden = cb.checked; guardar(); });
      ta.addEventListener('input', () => { estado.cierre[p.k] = ta.value; guardar(); });
      d.appendChild(ta);
      c.appendChild(d);
    });
    $('tiempo-txt').textContent = estado.horaFin
      ? 'Inicio: ' + fechaHora(estado.horaInicio) + ' · Fin: ' + fechaHora(estado.horaFin) + ' · Tiempo total: ' + duracionTxt(duracionMin())
      : 'Inicio: ' + fechaHora(estado.horaInicio) + ' · Al pulsar "Finalizar" se registra la hora de fin.';
  }
  const respuesta = (k) => {
    const p = PREGUNTAS.find((x) => x.k === k);
    return estado.cierre[k + 'n'] ? p.nada : (estado.cierre[k] || '').trim();
  };
  function duracionMin() {
    if (!estado.horaInicio || !estado.horaFin) return null;
    return Math.max(0, Math.round((new Date(estado.horaFin) - new Date(estado.horaInicio)) / 60000));
  }
  $('btn-finalizar').addEventListener('click', () => {
    if (estado.horaFin && !confirm('Ya se registró una hora de fin (' + fechaHora(estado.horaFin) + '). ¿Reemplazarla por la hora actual?')) return;
    estado.horaFin = new Date().toISOString();
    guardar();
    enviarBaseDatos();
    mostrar('res');
  });

  /* ================= 5. Resultados ================= */
  function partir(t, max) {
    const out = []; let act = '';
    t.split(' ').forEach((w) => {
      if ((act + ' ' + w).trim().length > max && act) { out.push(act); act = w; } else act = (act + ' ' + w).trim();
    });
    if (act) out.push(act);
    return out;
  }
  const fondoBlanco = {
    id: 'fondoBlanco',
    beforeDraw(c) { const x = c.ctx; x.save(); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.restore(); }
  };
  function radar(canvas, subs, opciones) {
    const o = Object.assign({ responsive: true, fuente: 11, ancho: 18 }, opciones || {});
    const c = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: subs.map((s) => partir(subEtq(s), o.ancho)),
        datasets: [{
          label: 'Nivel acordado',
          data: subs.map((s) => acordado(s.codigo) || 0),
          borderColor: '#b22222', borderDash: [5, 4], borderWidth: 2,
          backgroundColor: 'rgba(178,34,34,0.04)', fill: true,
          pointBackgroundColor: '#b22222', pointRadius: 3
        }]
      },
      options: {
        responsive: o.responsive, maintainAspectRatio: false, animation: false,
        devicePixelRatio: o.dpr || window.devicePixelRatio || 1,
        layout: { padding: 6 },
        scales: {
          r: {
            min: 0, max: NMAX,
            ticks: { stepSize: 1, backdropColor: 'rgba(255,255,255,0.8)', font: { size: o.fuente - 1 }, color: '#333' },
            grid: { color: '#555' }, angleLines: { color: '#999' },
            pointLabels: { font: { size: o.fuente }, color: '#222' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { title: (it) => subEtq(subs[it[0].dataIndex]), label: (ctx) => 'Nivel N' + ctx.raw } }
        }
      },
      plugins: [fondoBlanco]
    });
    if (o.responsive) activarTip(c, subs);
    return c;
  }
  // Ayuda al pasar el cursor (o tocar) el nombre de un subatributo en el diagrama
  function activarTip(chart, subs) {
    const cv = chart.canvas, tip = $('tip');
    cv._tip = { chart, subs };
    if (cv._tipActivo) return;
    cv._tipActivo = true;
    const buscar = (ev) => {
      const { chart: ch } = cv._tip;
      const r = cv.getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top;
      const items = (ch.scales.r && ch.scales.r._pointLabelItems) || [];
      return items.findIndex((it) => x >= it.left - 4 && x <= it.right + 4 && y >= it.top - 4 && y <= it.bottom + 4);
    };
    const ver = (ev) => {
      const k = buscar(ev);
      if (k < 0) { tip.hidden = true; cv.style.cursor = ''; return; }
      const s = cv._tip.subs[k];
      tip.innerHTML = '';
      tip.appendChild(el('b', '', s.codigo + ' ' + s.nombre_es));
      tip.appendChild(document.createTextNode(s.resumen || s.descripcion));
      tip.hidden = false;
      cv.style.cursor = 'help';
      const w = tip.offsetWidth, h = tip.offsetHeight;
      tip.style.left = Math.max(8, Math.min(ev.clientX + 14, window.innerWidth - w - 8)) + 'px';
      tip.style.top = Math.max(8, Math.min(ev.clientY + 14, window.innerHeight - h - 8)) + 'px';
    };
    cv.addEventListener('mousemove', ver);
    cv.addEventListener('click', ver);
    cv.addEventListener('mouseleave', () => { tip.hidden = true; });
  }
  window.addEventListener('scroll', () => { $('tip').hidden = true; }, { passive: true });

  function renderResultados() {
    charts.forEach((c) => c.destroy());
    charts = [];
    const i = estado.inicio;
    const cab = $('res-cabecera');
    cab.innerHTML = '';
    cab.appendChild(el('h2', '', 'Resultados'));
    const meta = el('div', 'meta');
    const filas = [['Organización', i.org], ['Tipo / categoría', [i.tipo, i.cat].filter(Boolean).join(' · ')], ['Fecha', i.fecha]];
    i.ev.forEach((v, k) => filas.push(['Evaluador ' + (k + 1), evTxt(v, true)]));
    filas.push(['Facilitador(a)', i.facil], ['Tiempo total', duracionTxt(duracionMin())]);
    filas.forEach(([k, v]) => { const d = el('div'); d.appendChild(el('b', '', k)); d.appendChild(document.createTextNode(v || '—')); meta.appendChild(d); });
    cab.appendChild(meta);

    charts.push(radar($('chart-general'), SUBS.map((x) => x.s), { ancho: 22, fuente: 10 }));

    const cont = $('res-radares');
    cont.innerHTML = '';
    D.atributos.forEach((a) => {
      const card = el('div', 'radar-attr');
      const h = el('h3', '', a.nombre_en + ': ');
      h.appendChild(el('span', 'rango', rangoAtributo(a)));
      card.appendChild(h);
      card.appendChild(el('p', 'hint', a.nombre_es));
      const box = el('div', 'chart-box'); const cv = el('canvas'); box.appendChild(cv); card.appendChild(box);
      cont.appendChild(card);
      charts.push(radar(cv, a.subatributos));
    });

    // Subatributos ordenados por nivel (N5 a N1)
    const { g, sin } = gruposPorNivel(), dx = $('res-orden');
    dx.innerHTML = '';
    if (!g.length) dx.appendChild(el('p', 'hint', 'Aún no hay niveles acordados.'));
    g.forEach((grp, j) => {
      const fila = el('div', 'nivel-grupo');
      const nn = el('div', 'ng-n', 'N' + grp.n);
      if (g.length > 1 && j === 0) nn.appendChild(el('small', '', 'Más maduros'));
      if (g.length > 1 && j === g.length - 1) nn.appendChild(el('small', '', 'Menos maduros'));
      fila.appendChild(nn);
      fila.appendChild(listaNodo(grp.subs.map(subEtqLarga), ''));
      dx.appendChild(fila);
    });
    if (sin.length) {
      const fila = el('div', 'nivel-grupo');
      fila.appendChild(el('div', 'ng-n', 'Sin nivel'));
      fila.appendChild(listaNodo(sin.map(subEtqLarga), ''));
      dx.appendChild(fila);
    }

    // Tabla de niveles
    const tn = $('tabla-niveles');
    tn.innerHTML = '';
    filaTabla(tn, ['Subatributo', 'Nivel acordado', 'Nivel sugerido', 'Discrepancia'], true);
    SUBS.forEach((x) => {
      const st = subEstado(x.s.codigo), ac = st.acordado;
      filaTabla(tn, [subEtqLarga(x.s), ac ? 'N' + ac : '—', 'N' + sugerido(x.s), discTxt(st)], false, [1, 2]);
    });

    renderRuta();
    renderVerificacion();
  }
  function discTxt(st) {
    if (st.disc === 'si') {
      const p = (st.prop || []).slice(0, estado.inicio.ev.length);
      return 'Sí' + (p.some(Boolean) ? ' (' + p.map((v) => v ? 'N' + v : '?').join(' / ') + ')' : '');
    }
    if (st.disc === 'no') return 'No';
    return '—';
  }
  const dudasTxt = (st) => st.sinDudas ? 'No hubo dudas ni dificultades' : (st.dudas || '').trim();
  function filaTabla(t, celdas, cab, num) {
    const tr = el('tr');
    celdas.forEach((c, j) => {
      const td = el(cab ? 'th' : 'td', num && num.includes(j) ? 'num' : '');
      if (c instanceof Node) td.appendChild(c); else td.textContent = c;
      tr.appendChild(td);
    });
    t.appendChild(tr);
  }
  function listaNodo(items, vacio) {
    if (!items.length) return document.createTextNode(vacio);
    const ul = el('ul');
    items.forEach((t) => ul.appendChild(el('li', '', t)));
    return ul;
  }
  const VACIO_FALTAN = 'Ninguno: todos los componentes exigidos en el siguiente nivel están marcados';

  function renderRuta() {
    const { ruta, incons, max } = hojaDeRuta();
    const cont = $('ruta');
    cont.innerHTML = '';
    ruta.forEach((it) => {
      const d = el('div', 'ruta-item');
      const cab = el('div', 'ruta-cab');
      cab.appendChild(el('span', 'ruta-num', String(it.prioridad)));
      const sub = el('span', 'ruta-sub', subEtq(it.s) + ' ');
      sub.appendChild(el('small', '', '(' + it.s.nombre_es + ')'));
      cab.appendChild(sub);
      cab.appendChild(el('span', 'ruta-salto', 'N' + it.n + ' → N' + it.siguiente + (it.fuente === 'sugerido' ? ' (sugerido; falta acordar)' : '')));
      cab.appendChild(el('span', 'ruta-prior' + (it.prior ? ' si' : ''), 'Prioritario para la empresa: ' + (it.prior ? 'Sí' : 'No')));
      d.appendChild(cab);
      const cu = el('div', 'ruta-cuerpo');
      const c1 = el('div');
      c1.appendChild(el('h4', '', 'Qué exige N' + it.siguiente));
      c1.appendChild(el('p', '', it.exige));
      const c2 = el('div');
      c2.appendChild(el('h4', '', 'Componentes faltantes'));
      c2.appendChild(listaNodo(it.faltan.map(compTxt), VACIO_FALTAN));
      cu.appendChild(c1); cu.appendChild(c2);
      d.appendChild(cu);
      cont.appendChild(d);
    });
    const di = $('ruta-incons');
    di.innerHTML = '';
    if (incons.length) {
      di.appendChild(el('h3', '', 'Inconsistencias: componentes de niveles ya alcanzados que no están marcados'));
      di.appendChild(el('p', 'hint', 'Según la regla acumulativa, estos componentes deberían cumplirse para estar en el nivel acordado.'));
      const ti = el('table', 'tabla'); const w = el('div', 'tabla-scroll'); w.appendChild(ti); di.appendChild(w);
      filaTabla(ti, ['Subatributo', 'Nivel actual', 'Nivel del componente', 'Componente no marcado'], true);
      incons.forEach((x) => filaTabla(ti, [subEtqLarga(x.it.s), 'N' + x.it.n, 'N' + x.n, compTxt(x.r)], false, [1, 2]));
    }
    const dm = $('ruta-max');
    dm.innerHTML = '';
    if (max.length) {
      dm.appendChild(el('h3', '', 'Nivel máximo alcanzado (N' + NMAX + ')'));
      dm.appendChild(listaNodo(max.map((it) => subEtqLarga(it.s) + (it.prior ? ' (prioritario)' : '')), ''));
    }
  }

  function verificacion() {
    const sin = SUBS.filter((x) => !acordado(x.s.codigo)).map((x) => x.s.codigo);
    const { ruta } = hojaDeRuta();
    const bajo5 = SUBS.filter((x) => acordado(x.s.codigo) && acordado(x.s.codigo) < NMAX);
    const derivados = ruta.filter((it) => it.fuente === 'acordado' && it.exige && it.siguiente <= NMAX);
    return [
      { ok: !sin.length, t: '¿Los ' + TOTAL + ' subatributos tienen nivel acordado?', d: (TOTAL - sin.length) + ' de ' + TOTAL + (sin.length ? '. Sin nivel: ' + sin.join(', ') : '') },
      { ok: !sin.length && charts.length > 0, t: '¿Se generó el perfil?', d: !sin.length ? 'Diagrama de araña de los ' + TOTAL + ' subatributos, rango por atributo y subatributos ordenados por nivel.' : 'Perfil incompleto: faltan niveles acordados.' },
      { ok: !sin.length && derivados.length === bajo5.length, t: '¿Cada subatributo bajo N' + NMAX + ' tiene su siguiente nivel derivado?', d: derivados.length + ' de ' + bajo5.length + ' subatributos bajo N' + NMAX + ' tienen siguiente nivel, descriptor y componentes faltantes.' }
    ];
  }
  function renderVerificacion() {
    const ul = $('verif');
    ul.innerHTML = '';
    verificacion().forEach((v) => {
      const li = el('li');
      li.appendChild(el('span', v.ok ? 'si' : 'no', v.ok ? 'Sí ' : 'No '));
      li.appendChild(el('strong', '', v.t + ' '));
      li.appendChild(el('span', 'hint', v.d));
      ul.appendChild(li);
    });
    const extra = el('li');
    extra.appendChild(el('span', 'hint', 'Prioridades: ' + modoPriorTxt() + ' (' + listaPrior().length + ') · Tiempo total: ' +
      duracionTxt(duracionMin()) + ' · Inconsistencias: ' + hojaDeRuta().incons.length +
      ' · Base de datos: ' + (estado.envio ? 'enviada el ' + fechaHora(estado.envio) : (CFG.urlBaseDatos ? 'no enviada' : 'no configurada'))));
    ul.appendChild(extra);
  }

  /* ================= PDF para la empresa ================= */
  const pdfTxt = (s) => String(s == null ? '' : s).replace(/—/g, '-').replace(/→/g, '->').replace(/[●★]/g, '*').replace(/[○]/g, 'o').replace(/[‘’]/g, "'").replace(/[“”]/g, '"');

  function imagenRadar(subs, w, h, ancho, fuente) {
    const box = el('div', 'oculto-render');
    const cv = el('canvas'); cv.width = w; cv.height = h;
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    box.appendChild(cv); document.body.appendChild(box);
    const c = radar(cv, subs, { responsive: false, dpr: 2, ancho, fuente });
    const url = c.toBase64Image('image/png', 1);
    c.destroy(); box.remove();
    return url;
  }

  function generarPDF() {
    if (!window.jspdf) { mensaje('No se pudo cargar la librería del PDF (revise la conexión a internet).'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210, M = 16, AN = W - 2 * M;
    const i = estado.inicio;
    let y;
    const tit = (t, yy) => { doc.setFont('helvetica', 'bold'); doc.setFontSize(13); doc.text(pdfTxt(t), M, yy); doc.setFont('helvetica', 'normal'); };
    const parrafo = (t, yy, tam) => {
      doc.setFontSize(tam || 10);
      const l = doc.splitTextToSize(pdfTxt(t), AN);
      doc.text(l, M, yy);
      return yy + l.length * (tam || 10) * 0.42 + 2;
    };

    // Portada
    doc.setFont('helvetica', 'bold'); doc.setFontSize(20);
    doc.text('Perfil de madurez BIL-Lima', M, 60);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(12);
    doc.text(doc.splitTextToSize(pdfTxt('Integración de BIM, IPD y Lean Construction'), AN), M, 70);
    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text(doc.splitTextToSize(pdfTxt(i.org || 'Organización'), AN), M, 100);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
    y = 112;
    [['Fecha de la evaluación', i.fecha], ['Tipo', i.tipo], ['Categoría', i.cat],
     ['Evaluadores', i.ev.map((v) => [v.cargo, areaTxt(v)].filter(Boolean).join(', ')).filter(Boolean).join('; ')],
     ['Facilitador(a)', i.facil], ['Modelo', D.meta.nombre + ' - ' + D.meta.version]
    ].forEach(([k, v]) => {
      const l = doc.splitTextToSize(pdfTxt(k + ': ' + (v || '-')), AN);
      doc.text(l, M, y); y += l.length * 5.5 + 1;
    });

    // Cómo leer el perfil
    doc.addPage();
    tit('Cómo leer el perfil', 22);
    y = 30;
    [
      'El modelo evalúa ' + D.atributos.length + ' atributos y ' + TOTAL + ' subatributos. Cada subatributo se ubica en uno de cinco niveles: ' +
        NIV.map((n) => 'N' + n.n + ' ' + n.nombre).join('; ') + '.',
      'Regla acumulativa: un subatributo se ubica en el nivel más alto cuyas prácticas exigidas cumple por completo, junto con las de todos los niveles anteriores. Si cumple solo una parte del nivel siguiente, permanece en el nivel inferior. Cada descriptor describe solo lo propio de su nivel; lo exigido en los niveles anteriores se presupone.',
      'El nivel de cada subatributo fue acordado por consenso de los evaluadores de la organización, con la matriz de componentes como lista de verificación. El "nivel sugerido" es el que resulta de las prácticas marcadas en esa matriz.',
      'El resultado se presenta como un perfil: un diagrama de araña de los ' + TOTAL + ' subatributos (escala 0 a 5, donde 0 indica que no se asignó nivel) y un diagrama por atributo con su rango. El modelo no asigna un nivel global ni por atributo, porque los niveles son etapas acumulativas; el promedio que acompaña a cada atributo es solo una referencia.',
      'La hoja de ruta indica, para cada subatributo, el siguiente nivel a alcanzar, lo que ese nivel exige y los componentes de la matriz que aún faltan. Se ordena de menor a mayor nivel actual. No incluye plazos, costos ni responsables, que corresponden a la planificación interna de la organización.'
    ].forEach((p) => { y = parrafo(p, y, 10.5) + 2; });

    // Diagramas
    doc.addPage();
    tit('Perfil de madurez de los ' + TOTAL + ' subatributos', 22);
    doc.addImage(imagenRadar(SUBS.map((x) => x.s), 1100, 1000, 22, 13), 'PNG', M, 28, AN, AN * 1000 / 1100);
    let k = 0;
    D.atributos.forEach((a) => {
      if (k % 2 === 0) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(12);
      doc.text(pdfTxt(a.nombre_en + ': ' + rangoAtributo(a)), M, y);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
      doc.text(pdfTxt(a.nombre_es), M, y + 5);
      // Promedio referencial en la esquina superior derecha
      const pr = promedioRef(a);
      if (pr != null) {
        doc.setDrawColor(150); doc.setFillColor(245, 247, 248);
        doc.roundedRect(W - M - 46, y - 5, 46, 15, 1.5, 1.5, 'FD');
        doc.setFontSize(7.5); doc.setTextColor(90);
        doc.text('Promedio referencial', W - M - 23, y - 0.5, { align: 'center' });
        doc.setFontSize(12); doc.setTextColor(0); doc.setFont('helvetica', 'bold');
        doc.text(dec(pr), W - M - 23, y + 5.5, { align: 'center' });
        doc.setFont('helvetica', 'normal'); doc.setFontSize(6.5); doc.setTextColor(110);
        doc.text(pdfTxt('(no forma parte del modelo)'), W - M - 23, y + 8.8, { align: 'center' });
        doc.setTextColor(0);
      }
      const h = 112;
      doc.addImage(imagenRadar(a.subatributos, 1000, 800, 20, 15), 'PNG', M + (AN - h * 1.25) / 2, y + 12, h * 1.25, h);
      y += 134; k++;
    });

    // Subatributos ordenados por nivel + tabla de niveles
    doc.addPage();
    tit('Subatributos ordenados por nivel', 22);
    const { g } = gruposPorNivel();
    doc.autoTable({
      startY: 27, margin: { left: M, right: M },
      head: [['Nivel', 'Subatributos']],
      body: g.map((grp, j) => ['N' + grp.n + (g.length > 1 && j === 0 ? '\nMás maduros' : '') + (g.length > 1 && j === g.length - 1 ? '\nMenos maduros' : ''),
        pdfTxt(grp.subs.map((s) => subEtqLarga(s)).join('\n'))]),
      styles: { fontSize: 8, cellPadding: 1.6, valign: 'top' },
      headStyles: { fillColor: [31, 78, 121] },
      columnStyles: { 0: { cellWidth: 26, fontStyle: 'bold' } }
    });
    doc.addPage(); y = 22;
    tit('Niveles por subatributo', y);
    doc.autoTable({
      startY: y + 4, margin: { left: M, right: M },
      head: [['Subatributo', 'Nivel acordado', 'Nivel sugerido', 'Discrepancia']],
      body: SUBS.map((x) => {
        const st = subEstado(x.s.codigo);
        return [pdfTxt(subEtqLarga(x.s)), st.acordado ? 'N' + st.acordado : '-', 'N' + sugerido(x.s), pdfTxt(discTxt(st))];
      }),
      styles: { fontSize: 8, cellPadding: 1.6, valign: 'top' },
      headStyles: { fillColor: [31, 78, 121] },
      columnStyles: { 1: { cellWidth: 24, halign: 'center' }, 2: { cellWidth: 24, halign: 'center' }, 3: { cellWidth: 34 } }
    });

    // Hoja de ruta: un bloque por subatributo
    const { ruta, incons, max } = hojaDeRuta();
    doc.addPage();
    tit('Hoja de ruta', 20);
    doc.setFontSize(9);
    doc.text(doc.splitTextToSize(pdfTxt('Siguiente nivel de cada subatributo, ordenado de menor a mayor nivel actual (empates en el orden del modelo). Sin plazos, costos ni responsables.'), AN), M, 26);
    y = 33;
    ruta.forEach((it) => {
      // Estima la altura del bloque para no separar su cabecera de su contenido
      doc.setFontSize(7.6);
      const lineas = Math.max(doc.splitTextToSize(pdfTxt(it.exige), AN / 2 - 4).length,
        it.faltan.reduce((t, r) => t + doc.splitTextToSize(pdfTxt('- ' + compTxt(r)), AN / 2 - 4).length, 0) || 2);
      if (y + 16 + lineas * 3.6 > 282) { doc.addPage(); y = 18; }
      doc.autoTable({
        startY: y, margin: { left: M, right: M }, rowPageBreak: 'avoid',
        head: [[{ content: pdfTxt(it.prioridad + '.  ' + subEtqLarga(it.s) + '   |   N' + it.n + ' -> N' + it.siguiente +
            (it.fuente === 'sugerido' ? ' (sugerido)' : '') + '   |   Prioritario para la empresa: ' + (it.prior ? 'Sí' : 'No')), colSpan: 2 }],
          ['Qué exige N' + it.siguiente, 'Componentes faltantes']],
        body: [[pdfTxt(it.exige), pdfTxt(it.faltan.length ? it.faltan.map((r) => '- ' + compTxt(r)).join('\n') : VACIO_FALTAN)]],
        styles: { fontSize: 7.6, cellPadding: 1.8, valign: 'top' },
        headStyles: { fillColor: [238, 241, 243], textColor: 30, fontSize: 8 },
        didParseCell: (d) => {
          if (d.section === 'head' && d.row.index === 0) { d.cell.styles.fillColor = it.prior ? [255, 240, 205] : [31, 78, 121]; d.cell.styles.textColor = it.prior ? 40 : 255; }
        },
        columnStyles: { 0: { cellWidth: AN / 2 }, 1: { cellWidth: AN / 2 } }
      });
      y = doc.lastAutoTable.finalY + 5;
    });
    if (incons.length) {
      if (y > 240) { doc.addPage(); y = 18; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
      doc.text(pdfTxt('Inconsistencias: componentes de niveles ya alcanzados que no están marcados'), M, y + 3);
      doc.setFont('helvetica', 'normal');
      doc.autoTable({
        startY: y + 6, margin: { left: M, right: M },
        head: [['Subatributo', 'Nivel actual', 'Nivel del componente', 'Componente no marcado']],
        body: incons.map((x) => [pdfTxt(subEtqLarga(x.it.s)), 'N' + x.it.n, 'N' + x.n, pdfTxt(compTxt(x.r))]),
        styles: { fontSize: 7.5, cellPadding: 1.5 }, headStyles: { fillColor: [120, 120, 120] }
      });
      y = doc.lastAutoTable.finalY + 5;
    }
    if (max.length) {
      if (y > 255) { doc.addPage(); y = 18; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
      doc.text(pdfTxt('Nivel máximo alcanzado (N' + NMAX + ')'), M, y + 3);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
      doc.text(max.map((it) => pdfTxt('- ' + subEtqLarga(it.s))), M, y + 9);
    }

    // Pie en todas las páginas
    const np = doc.getNumberOfPages();
    for (let p = 1; p <= np; p++) {
      doc.setPage(p);
      const ps = doc.internal.pageSize, w = ps.getWidth(), h = ps.getHeight();
      doc.setFontSize(8); doc.setTextColor(110);
      doc.text(pdfTxt(D.meta.nombre + ' · ' + D.meta.version + ' (' + D.meta.fecha + ')'), M, h - 8);
      doc.text('Página ' + p + ' de ' + np, w - M, h - 8, { align: 'right' });
      doc.setTextColor(0);
    }
    doc.save(nombreArchivo('Perfil_BIL-Lima', 'pdf', false));
  }
  $('btn-pdf').addEventListener('click', () => {
    try { generarPDF(); } catch (e) { console.error(e); mensaje('Error al generar el PDF: ' + e.message); }
  });

  /* ================= Excel interno ================= */
  function generarExcel(anon) {
    if (!window.XLSX) { mensaje('No se pudo cargar la librería de Excel (revise la conexión a internet).'); return; }
    const i = estado.inicio;
    const wb = XLSX.utils.book_new();
    const hoja = (nombre, filas, anchos) => {
      const ws = XLSX.utils.aoa_to_sheet(filas);
      ws['!cols'] = anchos.map((w) => ({ wch: w }));
      XLSX.utils.book_append_sheet(wb, ws, nombre);
    };
    const ver = verificacion();
    const filasEv = [];
    i.ev.forEach((v, k) => {
      const p = 'Evaluador ' + (k + 1) + ': ';
      filasEv.push([p + 'cargo', v.cargo], [p + 'área', areaTxt(v)], [p + 'años de experiencia', v.anios],
        [p + 'nombre', anon || v.anon ? '' : v.nombre]);
    });
    hoja('Datos generales', [
      ['Campo', 'Valor'],
      ['Identificador de la evaluación', estado.id],
      ['Modelo', D.meta.nombre],
      ['Versión del modelo', estado.modelo.version],
      ['Fecha del modelo', estado.modelo.fecha],
      ['Organización', anon ? 'Organización X' : i.org],
      ['Tipo', i.tipo], ['Categoría', i.cat], ['Fecha de la evaluación', i.fecha],
      ['Número de evaluadores', i.ev.length],
      ...filasEv,
      ['Facilitador(a)', i.facil],
      ['Hora de inicio', fechaHora(estado.horaInicio)], ['Hora de fin', fechaHora(estado.horaFin)],
      ['Tiempo total (min)', duracionMin() == null ? '' : duracionMin()],
      ['Prioridades: cómo se definieron', modoPriorTxt()],
      ['Subatributos prioritarios', listaPrior().join(', ')],
      ['Enviado a la base de datos', estado.envio ? fechaHora(estado.envio) : 'No'],
      ['Anonimizado', anon ? 'Sí' : 'No'],
      [],
      ['Verificación H.E.3', 'Resultado'],
      ...ver.map((v) => [v.t, (v.ok ? 'Sí. ' : 'No. ') + v.d])
    ], [44, 90]);

    const nEv = i.ev.length;
    hoja('Niveles', [
      ['Código', 'Atributo', 'Subatributo (inglés)', 'Subatributo (español)', 'Nivel acordado', 'Nivel sugerido', 'Nota (acordado ≠ sugerido)', 'Discrepancia',
        ...i.ev.map((v, k) => 'Nivel propuesto evaluador ' + (k + 1)), 'Dudas o dificultades', 'Prioritario'],
      ...SUBS.map((x) => {
        const st = subEstado(x.s.codigo);
        return [x.s.codigo, x.a.nombre_en, x.s.nombre_en, x.s.nombre_es, st.acordado || '', sugerido(x.s), st.notaDif,
          st.disc === 'si' ? 'Sí' : st.disc === 'no' ? 'No' : '',
          ...Array.from({ length: nEv }, (_, k) => st.disc === 'si' ? (st.prop[k] || '') : ''),
          dudasTxt(st), esPrior(x.s.codigo) ? 'Sí' : 'No'];
      })
    ], [8, 24, 36, 36, 10, 10, 30, 11, ...Array(nEv).fill(12), 40, 10]);

    const comp = [['Subatributo', 'Componente', 'Nombre del componente', 'Nivel', 'Texto de la celda', 'Marcado']];
    SUBS.forEach((x) => celdasReq(x.s).forEach((r) => comp.push([x.s.codigo, r.c.codigo, r.c.nombre, 'N' + r.n, r.t, marcada(x.s.codigo, r.k) ? 'Sí' : 'No'])));
    hoja('Componentes marcados', comp, [11, 11, 50, 7, 50, 9]);

    const { ruta, incons, max } = hojaDeRuta();
    const hr = [['Prioridad', 'Subatributo', 'Nivel actual', 'Siguiente nivel', 'Qué exige (descriptor del siguiente nivel)', 'Componentes faltantes', 'Prioritario para la empresa']];
    ruta.forEach((it) => hr.push([it.prioridad, subEtqLarga(it.s), 'N' + it.n + (it.fuente === 'sugerido' ? ' (sugerido)' : ''), 'N' + it.siguiente, it.exige,
      it.faltan.length ? it.faltan.map(compTxt).join('\n') : VACIO_FALTAN, it.prior ? 'Sí' : 'No']));
    hr.push([], ['Inconsistencias: componentes de niveles ya alcanzados que no están marcados']);
    hr.push(['', 'Subatributo', 'Nivel actual', 'Nivel del componente', 'Componente no marcado']);
    if (incons.length) incons.forEach((x) => hr.push(['', subEtqLarga(x.it.s), 'N' + x.it.n, 'N' + x.n, compTxt(x.r)]));
    else hr.push(['', 'Ninguna']);
    hr.push([], ['Nivel máximo alcanzado (N' + NMAX + ')']);
    if (max.length) max.forEach((it) => hr.push(['', subEtqLarga(it.s)])); else hr.push(['', 'Ninguno']);
    hoja('Hoja de ruta', hr, [9, 40, 12, 12, 70, 60, 12]);

    const dif = [['Dificultad', 'Subatributo o componente', 'Origen', 'Posible mejora']];
    SUBS.forEach((x) => {
      const st = subEstado(x.s.codigo);
      if (!st.sinDudas && st.dudas && st.dudas.trim()) dif.push([st.dudas.trim(), x.s.codigo + ' ' + x.s.nombre_en, 'Registro por subatributo', '']);
    });
    PREGUNTAS.forEach((p, j) => { if (!estado.cierre[p.k + 'n'] && respuesta(p.k)) dif.push([respuesta(p.k), '', 'Pregunta de cierre ' + (j + 1), '']); });
    hoja('Dificultades', dif, [60, 30, 28, 40]);

    hoja('Respuestas de cierre', [['Pregunta', 'Respuesta'], ...PREGUNTAS.map((p) => [p.t, respuesta(p.k)])], [60, 90]);

    XLSX.writeFile(wb, nombreArchivo('Evaluacion_BIL-Lima', 'xlsx', anon));
  }
  $('btn-xlsx').addEventListener('click', () => {
    try { generarExcel($('chk-anon').checked); } catch (e) { console.error(e); mensaje('Error al generar el Excel: ' + e.message); }
  });

  /* ================= JSON: exportar / importar ================= */
  $('btn-json').addEventListener('click', () => {
    guardar();
    descargar(new Blob([JSON.stringify(estado, null, 2)], { type: 'application/json' }), nombreArchivo('Evaluacion_BIL-Lima', 'json', false));
  });
  $('f-importar').addEventListener('change', (e) => {
    const f = e.target.files[0];
    e.target.value = '';
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      let s;
      try { s = JSON.parse(r.result); } catch (err) { mensaje('El archivo no es un JSON válido.'); return; }
      if (!s || !s.id || !s.subs || !s.inicio) { mensaje('El archivo no corresponde a una evaluación BIL-Lima.'); return; }
      const vArch = s.modelo && s.modelo.version;
      if (vArch !== D.meta.version && !confirm('La evaluación se hizo con el modelo "' + (vArch || 'desconocido') + '" y la app usa "' + D.meta.version + '". Los componentes que ya no existan se ignorarán. ¿Importar de todos modos?')) return;
      if (!confirm('Se reemplazará la evaluación abierta por la del archivo. ¿Continuar?')) return;
      estado = normalizar(s);
      guardar();
      mensaje('Evaluación importada.', true);
      mostrar(estado.vista || 'inicio');
    };
    r.readAsText(f);
  });
  $('btn-nueva').addEventListener('click', () => {
    if (!confirm('Se borrará la evaluación abierta en este navegador (exporte el JSON antes si desea conservarla). ¿Iniciar una nueva?')) return;
    estado = nuevoEstado();
    guardar();
    mostrar('inicio');
  });

  /* ================= Base de datos (Google Sheets) ================= */
  // Se envía automáticamente al pulsar "Finalizar", si config.js tiene la URL
  function enviarBaseDatos() {
    const url = (CFG.urlBaseDatos || '').trim();
    if (!url) return;
    const cuerpo = JSON.stringify({
      evaluacion: estado,
      niveles: SUBS.map((x) => ({ codigo: x.s.codigo, acordado: acordado(x.s.codigo), sugerido: sugerido(x.s) })),
      prioritarios: listaPrior()
    });
    fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: cuerpo })
      .then(() => { estado.envio = new Date().toISOString(); guardar(); })
      .catch((e) => console.warn('No se pudo enviar a la base de datos:', e));
  }

  /* ================= Arranque ================= */
  $('app-version').textContent = D.meta.version;
  $('pie').textContent = D.meta.nombre + ' · ' + D.meta.version + ' (' + D.meta.fecha + ')';
  cargar();
  mostrar(estado.vista || 'inicio');
  window.BIL_APP = { estado: () => estado, sugerido, hojaDeRuta, propuestaApp };   // para pruebas
})();
