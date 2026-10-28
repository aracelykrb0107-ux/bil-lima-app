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
  function nuevoEstado() {
    return {
      id: uuid(),
      modelo: { nombre: D.meta.nombre, version: D.meta.version, fecha: D.meta.fecha },
      creado: new Date().toISOString(), actualizado: null,
      inicio: {
        org: '', fecha: hoy(), tipo: '', cat: '',
        ev: [{ cargo: '', area: '', anios: '', nombre: '' }, { cargo: '', area: '', anios: '', nombre: '' }],
        facil: ''
      },
      horaInicio: null, horaFin: null,
      vista: 'inicio', paso: 0,
      subs: {},                 // codigo -> estado del subatributo
      prioridades: [],
      cierre: { p1: '', p2: '', p3: '', nInd: '', nEval: '' }
    };
  }
  let estado = nuevoEstado();

  function subEstado(cod) {
    if (!estado.subs[cod]) estado.subs[cod] = { m: {}, acordado: null, notaDif: '', ejemplo: '', disc: '', p1: '', p2: '', dudas: '' };
    return estado.subs[cod];
  }
  function guardar() {
    estado.actualizado = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(estado)); } catch (e) { /* almacenamiento no disponible */ }
  }
  function cargar() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && typeof s === 'object' && s.id) estado = Object.assign(nuevoEstado(), s);
    } catch (e) { /* sin datos */ }
  }

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

  function hojaDeRuta() {
    const items = SUBS.map((x, i) => {
      const na = nivelActual(x.s);
      return { a: x.a, s: x.s, i, n: na.n, fuente: na.fuente, prior: estado.prioridades.includes(x.s.codigo) };
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
  function extremos() {
    const con = SUBS.filter((x) => acordado(x.s.codigo)).map((x) => ({ s: x.s, n: acordado(x.s.codigo) }));
    if (!con.length) return null;
    const ma = Math.max(...con.map((c) => c.n)), mi = Math.min(...con.map((c) => c.n));
    return { ma, mi, mas: con.filter((c) => c.n === ma), menos: con.filter((c) => c.n === mi) };
  }

  /* ================= Navegación ================= */
  const VISTAS = ['inicio', 'eval', 'prior', 'cierre', 'res'];
  function mostrar(v) {
    if (v !== 'inicio' && !estado.horaInicio) v = 'inicio';
    estado.vista = v;
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
  const CAMPOS_INICIO = [
    ['f-org', (i) => i.org, (i, v) => { i.org = v; }, true],
    ['f-fecha', (i) => i.fecha, (i, v) => { i.fecha = v; }, true],
    ['f-tipo', (i) => i.tipo, (i, v) => { i.tipo = v; }, true],
    ['f-cat', (i) => i.cat, (i, v) => { i.cat = v; }, true],
    ['f-facil', (i) => i.facil, (i, v) => { i.facil = v; }, false]
  ];
  [0, 1].forEach((k) => ['cargo', 'area', 'anios', 'nombre'].forEach((f) => {
    CAMPOS_INICIO.push(['f-e' + (k + 1) + '-' + f, (i) => i.ev[k][f], (i, v) => { i.ev[k][f] = v; }, f !== 'nombre']);
  }));

  function renderInicio() {
    CAMPOS_INICIO.forEach(([id, get]) => { $(id).value = get(estado.inicio) || ''; $(id).classList.remove('invalido'); });
    $('id-eval').textContent = 'Identificador de la evaluación: ' + estado.id;
    $('btn-iniciar').textContent = estado.horaInicio ? 'Guardar y continuar' : 'Iniciar';
    $('hora-inicio-txt').textContent = estado.horaInicio ? 'Hora de inicio registrada: ' + fechaHora(estado.horaInicio) : '';
    $('inicio-msg').textContent = '';
  }
  CAMPOS_INICIO.forEach(([id, , set]) => $(id).addEventListener('input', () => { set(estado.inicio, $(id).value.trim()); guardar(); }));
  $('form-inicio').addEventListener('submit', (e) => {
    e.preventDefault();
    const faltan = [];
    CAMPOS_INICIO.forEach(([id, , set, req]) => {
      set(estado.inicio, $(id).value.trim());
      const vacio = req && !$(id).value.trim();
      $(id).classList.toggle('invalido', vacio);
      if (vacio) faltan.push(id);
    });
    if (faltan.length) { $('inicio-msg').textContent = 'Complete los campos marcados en rojo.'; guardar(); return; }
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

    card.appendChild(el('p', 'sugerido-txt')).id = 'sugerido-txt';

    // Tarjetas de nivel
    card.appendChild(el('h3', '', 'Descriptores: hagan clic en el nivel acordado'));
    const grid = el('div', 'niveles');
    grid.id = 'tarjetas';
    grid.setAttribute('role', 'group');
    s.descriptores.forEach((txt, i) => {
      const n = i + 1;
      const b = el('button', 'nivel');
      b.type = 'button'; b.dataset.n = n;
      const badges = el('div', 'badges');
      b.appendChild(badges);
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

    // Campos de registro
    const campos = el('div', 'campos');
    const lEj = el('label', 'full', 'Ejemplo que sustenta el nivel (una línea)');
    const iEj = el('input'); iEj.type = 'text'; iEj.id = 'f-ejemplo'; iEj.value = st.ejemplo; iEj.maxLength = 300;
    iEj.addEventListener('input', () => { st.ejemplo = iEj.value; guardar(); });
    lEj.appendChild(iEj); campos.appendChild(lEj);

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
    ['p1', 'p2'].forEach((p, j) => {
      const l = el('label', '', 'Nivel propuesto por el evaluador ' + (j + 1));
      const sel = el('select'); sel.id = 'f-' + p;
      sel.appendChild(el('option', '', '—')).value = '';
      NIV.forEach((nv) => { const o = el('option', '', 'N' + nv.n); o.value = nv.n; sel.appendChild(o); });
      sel.value = st[p] || '';
      sel.addEventListener('change', () => { st[p] = sel.value ? +sel.value : ''; guardar(); refrescarInferior(); });
      l.appendChild(sel); props.appendChild(l);
    });
    const bInf = el('button', 'btn', '');
    bInf.type = 'button'; bInf.id = 'btn-inferior';
    bInf.addEventListener('click', () => {
      const v = [st.p1, st.p2].filter(Boolean);
      if (v.length === 2) { st.acordado = Math.min(...v); guardar(); refrescarNivel(); llenarIrA(); }
    });
    props.appendChild(bInf);
    props.appendChild(el('p', 'hint', 'Si no hay acuerdo, se asigna el nivel inferior de los dos propuestos y se registra la discrepancia.'));
    dDisc.appendChild(props);
    campos.appendChild(dDisc);

    const lDu = el('label', 'full', 'Dudas o dificultades');
    const tDu = el('textarea'); tDu.rows = 2; tDu.id = 'f-dudas'; tDu.value = st.dudas;
    tDu.addEventListener('input', () => { st.dudas = tDu.value; guardar(); });
    lDu.appendChild(tDu); campos.appendChild(lDu);
    card.appendChild(campos);

    cont.appendChild(card);
    $('btn-ant').disabled = estado.paso === 0;
    $('btn-sig').textContent = estado.paso === TOTAL - 1 ? 'Ir a prioridades →' : 'Siguiente →';
    llenarIrA();
    refrescarNivel();
    refrescarInferior();
    guardar();
  }

  function refrescarInferior() {
    const st = subEstado(SUBS[estado.paso].s.codigo);
    const b = $('btn-inferior'); if (!b) return;
    const v = [st.p1, st.p2].filter(Boolean);
    b.disabled = v.length !== 2;
    b.textContent = v.length === 2 ? 'Asignar el nivel inferior (N' + Math.min(...v) + ')' : 'Asignar el nivel inferior';
  }

  function refrescarNivel() {
    const s = SUBS[estado.paso].s;
    const st = subEstado(s.codigo);
    const sug = sugerido(s);
    const sp = $('sugerido-txt');
    sp.textContent = '';
    sp.appendChild(document.createTextNode('Nivel sugerido por la matriz: '));
    sp.appendChild(el('b', '', nivelNombre(sug)));
    if (sug < NMAX) {
      const f = faltantes(s, sug + 1).length;
      sp.appendChild(document.createTextNode(' · para N' + (sug + 1) + ' faltan ' + f + ' componente' + (f === 1 ? '' : 's') + '.'));
    }
    document.querySelectorAll('#tarjetas .nivel').forEach((b) => {
      const n = +b.dataset.n;
      b.setAttribute('aria-pressed', st.acordado === n ? 'true' : 'false');
      const bd = b.querySelector('.badges');
      bd.innerHTML = '';
      if (n === sug) bd.appendChild(el('span', 'badge', 'Sugerido'));
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
  const MAX_PRIOR = 3;
  function renderPrior() {
    const lista = $('prior-lista');
    lista.innerHTML = '';
    estado.prioridades = estado.prioridades.filter((c) => SUBS.some((x) => x.s.codigo === c));
    D.atributos.forEach((a) => {
      lista.appendChild(el('div', 'prior-attr', a.codigo + '. ' + attrEtq(a)));
      a.subatributos.forEach((s) => {
        const l = el('label');
        const cb = el('input'); cb.type = 'checkbox'; cb.value = s.codigo;
        cb.checked = estado.prioridades.includes(s.codigo);
        cb.addEventListener('change', () => {
          if (cb.checked && estado.prioridades.length >= MAX_PRIOR) { cb.checked = false; return; }
          if (cb.checked) estado.prioridades.push(s.codigo);
          else estado.prioridades = estado.prioridades.filter((c) => c !== s.codigo);
          guardar(); refrescarPrior();
        });
        l.appendChild(cb);
        l.appendChild(el('span', '', subEtqLarga(s)));
        const ac = acordado(s.codigo);
        l.appendChild(el('span', 'niv', ac ? 'N' + ac : 'sin nivel'));
        lista.appendChild(l);
      });
    });
    const pend = SUBS.filter((x) => !acordado(x.s.codigo)).map((x) => x.s.codigo);
    $('prior-pend').textContent = pend.length ? 'Aún no tienen nivel acordado: ' + pend.join(', ') + '.' : '';
    refrescarPrior();
  }
  function refrescarPrior() {
    const n = estado.prioridades.length;
    $('prior-cnt').textContent = n + ' de ' + MAX_PRIOR + ' seleccionados' + (n >= MAX_PRIOR ? ' (límite alcanzado)' : '');
    document.querySelectorAll('#prior-lista input').forEach((cb) => {
      cb.disabled = !cb.checked && n >= MAX_PRIOR;
      cb.parentNode.classList.toggle('off', cb.disabled);
    });
  }

  /* ================= 4. Cierre ================= */
  const CAMPOS_CIERRE = [['c-p1', 'p1'], ['c-p2', 'p2'], ['c-p3', 'p3'], ['c-n-ind', 'nInd'], ['c-n-eval', 'nEval']];
  CAMPOS_CIERRE.forEach(([id, k]) => $(id).addEventListener('input', () => { estado.cierre[k] = $(id).value; guardar(); }));
  function duracionMin() {
    if (!estado.horaInicio || !estado.horaFin) return null;
    return Math.max(0, Math.round((new Date(estado.horaFin) - new Date(estado.horaInicio)) / 60000));
  }
  function renderCierre() {
    CAMPOS_CIERRE.forEach(([id, k]) => { $(id).value = estado.cierre[k] || ''; });
    $('tiempo-txt').textContent = estado.horaFin
      ? 'Inicio: ' + fechaHora(estado.horaInicio) + ' · Fin: ' + fechaHora(estado.horaFin) + ' · Tiempo total: ' + duracionTxt(duracionMin())
      : 'Inicio: ' + fechaHora(estado.horaInicio) + ' · Al pulsar "Finalizar" se registra la hora de fin.';
  }
  $('btn-finalizar').addEventListener('click', () => {
    if (estado.horaFin && !confirm('Ya se registró una hora de fin (' + fechaHora(estado.horaFin) + '). ¿Reemplazarla por la hora actual?')) return;
    estado.horaFin = new Date().toISOString();
    guardar();
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
    return new Chart(canvas, {
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
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => 'N' + ctx.raw } } }
      },
      plugins: [fondoBlanco]
    });
  }

  function renderResultados() {
    charts.forEach((c) => c.destroy());
    charts = [];
    const i = estado.inicio;
    const cab = $('res-cabecera');
    cab.innerHTML = '';
    cab.appendChild(el('h2', '', 'Resultados'));
    const meta = el('div', 'meta');
    const ev = (k) => [i.ev[k].cargo, i.ev[k].area, i.ev[k].anios ? i.ev[k].anios + ' años' : ''].filter(Boolean).join(' · ') + (i.ev[k].nombre ? ' (' + i.ev[k].nombre + ')' : '');
    [['Organización', i.org], ['Tipo / categoría', [i.tipo, i.cat].filter(Boolean).join(' · ')], ['Fecha', i.fecha],
     ['Evaluador 1', ev(0)], ['Evaluador 2', ev(1)], ['Facilitadora', i.facil],
     ['Tiempo total', duracionTxt(duracionMin())], ['Modelo', D.meta.version], ['Identificador', estado.id]
    ].forEach(([k, v]) => { const d = el('div'); d.appendChild(el('b', '', k)); d.appendChild(document.createTextNode(v || '—')); meta.appendChild(d); });
    cab.appendChild(meta);

    charts.push(radar($('chart-general'), SUBS.map((x) => x.s), { ancho: 22, fuente: 10 }));

    const cont = $('res-radares');
    cont.innerHTML = '';
    D.atributos.forEach((a) => {
      const card = el('div', 'card');
      const h = el('h3', '', a.nombre_en + ': ');
      h.appendChild(el('span', 'rango', rangoAtributo(a)));
      card.appendChild(h);
      card.appendChild(el('p', 'hint', a.nombre_es));
      const box = el('div', 'chart-box'); const cv = el('canvas'); box.appendChild(cv); card.appendChild(box);
      cont.appendChild(card);
      charts.push(radar(cv, a.subatributos));
    });

    // Más y menos maduros
    const ex = extremos(), dx = $('res-extremos');
    dx.innerHTML = '';
    if (!ex) dx.appendChild(el('p', 'hint', 'Aún no hay niveles acordados.'));
    else {
      [['Más maduros (N' + ex.ma + ')', ex.mas], ['Menos maduros (N' + ex.mi + ')', ex.menos]].forEach(([t, l]) => {
        dx.appendChild(el('h3', '', t));
        const ul = el('ul');
        l.forEach((c) => ul.appendChild(el('li', '', subEtqLarga(c.s))));
        dx.appendChild(ul);
      });
    }

    // Tabla de niveles
    const tn = $('tabla-niveles');
    tn.innerHTML = '';
    filaTabla(tn, ['Subatributo', 'Nivel acordado', 'Nivel sugerido', 'Ejemplo', 'Discrepancia'], true);
    SUBS.forEach((x) => {
      const st = subEstado(x.s.codigo), ac = st.acordado;
      filaTabla(tn, [subEtqLarga(x.s), ac ? 'N' + ac : '—', 'N' + sugerido(x.s), st.ejemplo || '—', discTxt(st)], false, [1, 2]);
    });

    renderRuta();
    renderVerificacion();
  }
  function discTxt(st) {
    if (st.disc === 'si') return 'Sí' + ([st.p1, st.p2].filter(Boolean).length ? ' (' + [st.p1, st.p2].map((v) => v ? 'N' + v : '?').join(' / ') + ')' : '');
    if (st.disc === 'no') return 'No';
    return '—';
  }
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
  function textoFaltan(it) {
    if (it.faltan.length) return it.faltan.map(compTxt);
    return [];
  }
  const VACIO_FALTAN = 'Ninguno: todos los componentes exigidos en el siguiente nivel están marcados';

  function renderRuta() {
    const { ruta, incons, max } = hojaDeRuta();
    const t = $('tabla-ruta');
    t.innerHTML = '';
    filaTabla(t, ['Prioridad', 'Subatributo', 'Nivel actual', 'Siguiente nivel', 'Qué exige (descriptor del siguiente nivel)', 'Componentes faltantes', 'Prioritario para la empresa'], true);
    ruta.forEach((it) => {
      filaTabla(t, [String(it.prioridad), subEtqLarga(it.s),
        'N' + it.n + (it.fuente === 'sugerido' ? ' (sugerido; falta acordar)' : ''),
        'N' + it.siguiente, it.exige, listaNodo(textoFaltan(it), VACIO_FALTAN), it.prior ? 'Sí' : 'No'], false, [0, 2, 3, 6]);
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
      { ok: !sin.length && charts.length > 0, t: '¿Se generó el perfil?', d: !sin.length ? 'Diagrama de araña de los ' + TOTAL + ' subatributos, rango por atributo y subatributos más y menos maduros.' : 'Perfil incompleto: faltan niveles acordados.' },
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
    extra.appendChild(el('span', 'hint', 'Prioridades marcadas: ' + estado.prioridades.length + ' de ' + MAX_PRIOR +
      ' · Tiempo total: ' + duracionTxt(duracionMin()) + ' · Inconsistencias: ' + hojaDeRuta().incons.length));
    ul.appendChild(extra);
  }

  /* ================= PDF para la empresa ================= */
  const pdfTxt = (s) => String(s == null ? '' : s).replace(/—/g, '-').replace(/[●]/g, '*').replace(/[○]/g, 'o').replace(/[‘’]/g, "'").replace(/[“”]/g, '"');

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
     ['Evaluadores', [0, 1].map((k) => [i.ev[k].cargo, i.ev[k].area].filter(Boolean).join(', ')).filter(Boolean).join('; ')],
     ['Facilitadora', i.facil], ['Modelo', D.meta.nombre + ' - ' + D.meta.version]
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
      'El nivel de cada subatributo fue acordado por consenso de los dos evaluadores de la organización, con la matriz de componentes como lista de verificación. El "nivel sugerido" es el que resulta de las prácticas marcadas en esa matriz.',
      'El resultado no se resume en un nivel global ni en promedios, porque los niveles son etapas acumulativas. Se presenta como un perfil: un diagrama de araña de los ' + TOTAL + ' subatributos (escala 0 a 5, donde 0 indica que no se asignó nivel) y un diagrama por atributo con su rango.',
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
      const h = 112;
      doc.addImage(imagenRadar(a.subatributos, 1000, 800, 20, 15), 'PNG', M + (AN - h * 1.25) / 2, y + 8, h * 1.25, h);
      y += 132; k++;
    });

    // Más y menos maduros + tabla de niveles
    doc.addPage();
    tit('Niveles por subatributo', 22);
    y = 28;
    const ex = extremos();
    if (ex) {
      y = parrafo('Más maduros (N' + ex.ma + '): ' + ex.mas.map((c) => c.s.codigo + ' ' + c.s.nombre_en).join('; ') + '.', y);
      y = parrafo('Menos maduros (N' + ex.mi + '): ' + ex.menos.map((c) => c.s.codigo + ' ' + c.s.nombre_en).join('; ') + '.', y);
    }
    doc.autoTable({
      startY: y + 2, margin: { left: M, right: M },
      head: [['Subatributo', 'Nivel acordado', 'Nivel sugerido', 'Ejemplo', 'Discrepancia']],
      body: SUBS.map((x) => {
        const st = subEstado(x.s.codigo);
        return [pdfTxt(subEtqLarga(x.s)), st.acordado ? 'N' + st.acordado : '-', 'N' + sugerido(x.s), pdfTxt(st.ejemplo || '-'), pdfTxt(discTxt(st))];
      }),
      styles: { fontSize: 8, cellPadding: 1.6, valign: 'top' },
      headStyles: { fillColor: [31, 78, 121] },
      columnStyles: { 0: { cellWidth: 55 }, 1: { cellWidth: 18, halign: 'center' }, 2: { cellWidth: 18, halign: 'center' }, 4: { cellWidth: 24 } }
    });

    // Hoja de ruta
    const { ruta, incons, max } = hojaDeRuta();
    doc.addPage('a4', 'landscape');
    const WL = 297, ANL = WL - 2 * M;
    tit('Hoja de ruta', 18);
    doc.setFontSize(9);
    doc.text(doc.splitTextToSize(pdfTxt('Siguiente nivel de cada subatributo, ordenado de menor a mayor nivel actual (empates en el orden del modelo). Sin plazos, costos ni responsables.'), ANL), M, 24);
    doc.autoTable({
      startY: 30, margin: { left: M, right: M },
      head: [['Prioridad', 'Subatributo', 'Nivel actual', 'Siguiente nivel', 'Qué exige (descriptor del siguiente nivel)', 'Componentes faltantes', 'Prioritario para la empresa']],
      body: ruta.map((it) => [String(it.prioridad), pdfTxt(subEtqLarga(it.s)),
        'N' + it.n + (it.fuente === 'sugerido' ? ' (sugerido)' : ''), 'N' + it.siguiente, pdfTxt(it.exige),
        pdfTxt(it.faltan.length ? it.faltan.map((r) => '- ' + compTxt(r)).join('\n') : VACIO_FALTAN), it.prior ? 'Sí' : 'No']),
      styles: { fontSize: 7.2, cellPadding: 1.5, valign: 'top' },
      headStyles: { fillColor: [31, 78, 121], fontSize: 7.5 },
      columnStyles: { 0: { cellWidth: 15, halign: 'center' }, 1: { cellWidth: 38 }, 2: { cellWidth: 16, halign: 'center' }, 3: { cellWidth: 16, halign: 'center' }, 4: { cellWidth: 82 }, 6: { cellWidth: 20, halign: 'center' } }
    });
    if (incons.length) {
      let yy = doc.lastAutoTable.finalY + 8;
      if (yy > 180) { doc.addPage('a4', 'landscape'); yy = 18; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
      doc.text(pdfTxt('Inconsistencias: componentes de niveles ya alcanzados que no están marcados'), M, yy);
      doc.setFont('helvetica', 'normal');
      doc.autoTable({
        startY: yy + 3, margin: { left: M, right: M },
        head: [['Subatributo', 'Nivel actual', 'Nivel del componente', 'Componente no marcado']],
        body: incons.map((x) => [pdfTxt(subEtqLarga(x.it.s)), 'N' + x.it.n, 'N' + x.n, pdfTxt(compTxt(x.r))]),
        styles: { fontSize: 7.5, cellPadding: 1.5 }, headStyles: { fillColor: [120, 120, 120] }
      });
    }
    if (max.length) {
      let yy = doc.lastAutoTable.finalY + 8;
      if (yy > 180) { doc.addPage('a4', 'landscape'); yy = 18; }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11);
      doc.text(pdfTxt('Nivel máximo alcanzado (N' + NMAX + ')'), M, yy);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
      doc.text(max.map((it) => pdfTxt('- ' + subEtqLarga(it.s))), M, yy + 6);
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
    hoja('Datos generales', [
      ['Campo', 'Valor'],
      ['Identificador de la evaluación', estado.id],
      ['Modelo', D.meta.nombre],
      ['Versión del modelo', estado.modelo.version],
      ['Fecha del modelo', estado.modelo.fecha],
      ['Organización', anon ? 'Organización X' : i.org],
      ['Tipo', i.tipo], ['Categoría', i.cat], ['Fecha de la evaluación', i.fecha],
      ['Evaluador 1: cargo', i.ev[0].cargo], ['Evaluador 1: área', i.ev[0].area], ['Evaluador 1: años de experiencia', i.ev[0].anios],
      ['Evaluador 1: nombre', anon ? '' : i.ev[0].nombre],
      ['Evaluador 2: cargo', i.ev[1].cargo], ['Evaluador 2: área', i.ev[1].area], ['Evaluador 2: años de experiencia', i.ev[1].anios],
      ['Evaluador 2: nombre', anon ? '' : i.ev[1].nombre],
      ['Facilitadora', i.facil],
      ['Hora de inicio', fechaHora(estado.horaInicio)], ['Hora de fin', fechaHora(estado.horaFin)],
      ['Tiempo total (min)', duracionMin() == null ? '' : duracionMin()],
      ['Subatributos prioritarios', estado.prioridades.join(', ')],
      ['Notas de la facilitadora: inducción', estado.cierre.nInd],
      ['Notas de la facilitadora: evaluación', estado.cierre.nEval],
      ['Anonimizado', anon ? 'Sí' : 'No'],
      [],
      ['Verificación H.E.3', 'Resultado'],
      ...ver.map((v) => [v.t, (v.ok ? 'Sí. ' : 'No. ') + v.d])
    ], [44, 90]);

    hoja('Niveles', [
      ['Código', 'Atributo', 'Subatributo (inglés)', 'Subatributo (español)', 'Nivel acordado', 'Nivel sugerido', 'Nota (acordado ≠ sugerido)', 'Ejemplo que sustenta el nivel', 'Discrepancia', 'Nivel propuesto evaluador 1', 'Nivel propuesto evaluador 2', 'Dudas o dificultades', 'Prioritario'],
      ...SUBS.map((x) => {
        const st = subEstado(x.s.codigo);
        return [x.s.codigo, x.a.nombre_en, x.s.nombre_en, x.s.nombre_es, st.acordado || '', sugerido(x.s), st.notaDif, st.ejemplo,
          st.disc === 'si' ? 'Sí' : st.disc === 'no' ? 'No' : '', st.disc === 'si' ? st.p1 : '', st.disc === 'si' ? st.p2 : '', st.dudas,
          estado.prioridades.includes(x.s.codigo) ? 'Sí' : 'No'];
      })
    ], [8, 24, 36, 36, 10, 10, 30, 40, 11, 12, 12, 40, 10]);

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
    SUBS.forEach((x) => { const d = subEstado(x.s.codigo).dudas; if (d && d.trim()) dif.push([d.trim(), x.s.codigo + ' ' + x.s.nombre_en, 'Nota de evaluación (registro por subatributo)', '']); });
    [['p1', 'Pregunta de cierre 1'], ['p2', 'Pregunta de cierre 2'], ['p3', 'Pregunta de cierre 3'], ['nInd', 'Nota de inducción'], ['nEval', 'Nota de evaluación']]
      .forEach(([k, o]) => { const v = estado.cierre[k]; if (v && v.trim()) dif.push([v.trim(), '', o, '']); });
    hoja('Dificultades', dif, [60, 30, 32, 40]);

    hoja('Respuestas de cierre', [
      ['Pregunta', 'Respuesta'],
      ['1. ¿Qué descriptores o subatributos les costó interpretar, y por qué?', estado.cierre.p1],
      ['2. ¿Qué dificultades tuvieron con la herramienta web?', estado.cierre.p2],
      ['3. ¿Qué cambiarían para que el modelo sea más útil para su empresa?', estado.cierre.p3]
    ], [60, 90]);

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
      if (!confirm('Se reemplazará la evaluación abierta por la del archivo (ID ' + s.id + '). ¿Continuar?')) return;
      estado = Object.assign(nuevoEstado(), s);
      guardar();
      mensaje('Evaluación importada.', true);
      pintarPie();
      mostrar(estado.vista || 'inicio');
    };
    r.readAsText(f);
  });
  $('btn-nueva').addEventListener('click', () => {
    if (!confirm('Se borrará la evaluación abierta en este navegador (exporte el JSON antes si desea conservarla). ¿Iniciar una nueva?')) return;
    estado = nuevoEstado();
    guardar();
    pintarPie();
    mostrar('inicio');
  });

  /* ================= Base de datos (Google Sheets) ================= */
  const urlBD = (CFG.urlBaseDatos || '').trim();
  $('btn-enviar').disabled = !urlBD;
  $('enviar-txt').textContent = urlBD ? '' : 'Base de datos no configurada (config.js).';
  $('btn-enviar').addEventListener('click', () => {
    if (!urlBD) return;
    const cuerpo = JSON.stringify({ evaluacion: estado, niveles: SUBS.map((x) => ({ codigo: x.s.codigo, acordado: acordado(x.s.codigo), sugerido: sugerido(x.s) })) });
    fetch(urlBD, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: cuerpo })
      .then(() => mensaje('Evaluación enviada a la base de datos.', true))
      .catch((e) => mensaje('No se pudo enviar: ' + e.message));
  });

  /* ================= Arranque ================= */
  function pintarPie() {
    $('app-version').textContent = D.meta.version + ' · ' + D.meta.fecha;
    $('pie').textContent = D.meta.nombre + ' · ' + D.meta.version + ' (' + D.meta.fecha + ') · Evaluación ' + estado.id;
  }
  cargar();
  pintarPie();
  mostrar(estado.vista || 'inicio');
  window.BIL_APP = { estado: () => estado, sugerido, hojaDeRuta };   // para pruebas
})();
