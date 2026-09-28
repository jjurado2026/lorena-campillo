/* =====================================================================
   LORENA CAMPILLO — v3 «Azulejo»
   Sin JavaScript la página se lee entera: servicios, horario, contacto y
   preguntas están en el HTML. Esto añade lo útil: estado abierto/cerrado
   en vivo (hora de Madrid), días de cita calculados con su horario, el
   resguardo con el email ya escrito, menú, barra fija y el movimiento.
   Parámetros: ?ss → sin animaciones (capturas)
               ?ahora=2026-09-29T11:30 → fija la hora de Madrid (revisión)
   ===================================================================== */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const raiz = document.documentElement;
  const quieto = raiz.classList.contains('quieto');
  const params = new URLSearchParams(location.search);

  /* Capturas: todo cargado desde el principio */
  if (raiz.classList.contains('captura')) $$('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });

  /* ---------- El horario: una sola fuente ----------
     Minutos desde medianoche. 0 = domingo … 6 = sábado. */
  const HORARIO = { 0: null, 1: [600, 1230], 2: [600, 1230], 3: [600, 1230], 4: [600, 1230], 5: [600, 1230], 6: [540, 900] };
  const MEDIODIA = 840; // 14:00 separa mañana y tarde entre semana
  const DIAS    = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const DIAS_C  = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const MESES   = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const MESES_C = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const hhmm = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;

  /* Hora de Madrid, esté donde esté quien mira */
  function ahora() {
    const fija = params.get('ahora');
    if (fija && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(fija)) {
      const [f, h] = fija.split('T');
      const [y, m, d] = f.split('-').map(Number);
      const [hh, mi] = h.split(':').map(Number);
      return { y, m, d, min: hh * 60 + mi, dia: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
    }
    const p = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid', year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(x => { p[x.type] = x.value; });
    const y = +p.year, m = +p.month, d = +p.day;
    return { y, m, d, min: +p.hour * 60 + +p.minute, dia: new Date(Date.UTC(y, m - 1, d)).getUTCDay() };
  }

  function estado(t) {
    const hoy = HORARIO[t.dia];
    if (hoy && t.min >= hoy[0] && t.min < hoy[1]) {
      const pronto = hoy[1] - t.min <= 45;
      return {
        abierto: true,
        txt: pronto ? 'Cierra pronto' : 'Abierto ahora',
        sub: `cierra a las ${hhmm(hoy[1])}`,
        corto: `Abierto · hasta las ${hhmm(hoy[1])}`
      };
    }
    for (let i = 0; i < 8; i++) {
      const d = (t.dia + i) % 7, h = HORARIO[d];
      if (!h || (i === 0 && t.min >= h[0])) continue;
      const cuando = i === 0 ? 'hoy' : i === 1 ? 'mañana' : `el ${DIAS[d]}`;
      return {
        abierto: false,
        txt: 'Cerrado ahora',
        sub: `abre ${cuando} a las ${hhmm(h[0])}`,
        corto: `Cerrado · abre ${cuando} a las ${hhmm(h[0])}`
      };
    }
    return null;
  }

  function pintarEstado() {
    const t = ahora();
    const e = estado(t);
    if (!e) return;
    $$('[data-estado]').forEach(el => {
      el.classList.toggle('es-abierto', e.abierto);
      el.classList.toggle('es-cerrado', !e.abierto);
      el.innerHTML = el.dataset.estado === 'corto'
        ? `<span class="estado__punto" aria-hidden="true"></span><span class="estado__txt">${e.corto}</span>`
        : `<span class="estado__punto" aria-hidden="true"></span><span class="estado__txt">${e.txt}</span><span class="estado__sub">${e.sub}</span>`;
      el.hidden = false;
    });
    $$('.horario tr[data-dias]').forEach(tr => {
      tr.classList.toggle('es-hoy', tr.dataset.dias.split(' ').includes(String(t.dia)));
    });
  }
  pintarEstado();
  setInterval(pintarEstado, 60000);

  /* ---------- Cabecera, menú y barra fija ---------- */
  const cab = $('#cab');
  const alScroll = () => cab.classList.toggle('con-borde', scrollY > 8);
  addEventListener('scroll', alScroll, { passive: true });
  alScroll();

  const botonMenu = $('.cab__menu');
  const menu = $('#menu');
  const menuAbierto = () => botonMenu.getAttribute('aria-expanded') === 'true';
  function abrirMenu() {
    menu.hidden = false;
    botonMenu.setAttribute('aria-expanded', 'true');
    raiz.classList.add('menu-abierto');
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('abierto')));
  }
  function cerrarMenu() {
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
    raiz.classList.remove('menu-abierto');
    setTimeout(() => { if (!menuAbierto()) menu.hidden = true; }, quieto ? 0 : 170);
  }
  botonMenu.addEventListener('click', () => (menuAbierto() ? cerrarMenu() : abrirMenu()));
  menu.addEventListener('click', e => { if (e.target.closest('a')) cerrarMenu(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuAbierto()) { cerrarMenu(); botonMenu.focus(); }
  });
  matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches && menuAbierto()) cerrarMenu(); });

  /* Barra fija: aparece al dejar atrás el hero; se aparta en la sección de
     cita (ya estás ahí) y mientras se escribe (el teclado ocupa la pantalla) */
  const fija = $('[data-fija]');
  const hero = $('#inicio');
  const seccionCita = $('#cita');
  if (fija && hero && 'IntersectionObserver' in window) {
    let trasHero = false, enCita = false, escribiendo = false;
    const pintarFija = () => fija.classList.toggle('visible', trasHero && !enCita && !escribiendo);
    new IntersectionObserver(([e]) => { trasHero = !e.isIntersecting && e.boundingClientRect.top < 0; pintarFija(); })
      .observe(hero);
    if (seccionCita) {
      new IntersectionObserver(([e]) => { enCita = e.isIntersecting; pintarFija(); }, { threshold: 0.15 })
        .observe(seccionCita);
    }
    document.addEventListener('focusin', e => { if (e.target.matches('input[type="text"], input[type="tel"]')) { escribiendo = true; pintarFija(); } });
    document.addEventListener('focusout', e => { if (e.target.matches('input[type="text"], input[type="tel"]')) { escribiendo = false; pintarFija(); } });
  }

  /* ---------- Revelados (una vez) ---------- */
  const revelables = $$('[data-revela]');
  if (!quieto && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revelables.forEach(el => io.observe(el));
  } else {
    revelables.forEach(el => el.classList.add('visible'));
  }
  addEventListener('beforeprint', () => revelables.forEach(el => el.classList.add('visible')));

  /* ---------- Servicios: gesto del pictograma y carril en móvil ---------- */
  const gesto = el => { el.classList.remove('gesto'); void el.offsetWidth; el.classList.add('gesto'); };
  const servs = $$('.serv');
  servs.forEach(s => {
    s.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') gesto(s); });
    s.addEventListener('focusin', () => gesto(s));
  });
  if (!quieto && 'IntersectionObserver' in window) {
    const ioG = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        gesto(e.target);
        ioG.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    servs.forEach(s => ioG.observe(s));
  }

  const carril = $('[data-carril]');
  const posCarril = $('[data-carril-pos]');
  if (carril && posCarril) {
    let pendiente = false;
    carril.addEventListener('scroll', () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        const paso = servs[1] ? servs[1].offsetLeft - servs[0].offsetLeft : 1;
        const i = Math.round(carril.scrollLeft / paso);
        posCarril.textContent = String(Math.min(servs.length, Math.max(1, i + 1)));
      });
    }, { passive: true });
  }

  /* ---------- Pide tu cita ---------- */
  const form = $('#form-cita');
  const resguardo = $('[data-resguardo]');
  const cajaDias = $('[data-dias]');
  const cajaFranjas = $('[data-franjas]');
  const botonEmail = $('[data-email]');
  const nota = $('.resguardo__nota');
  const notaBase = nota ? nota.textContent : '';

  /* Los próximos seis días en que abren (sin domingos; hoy solo si da tiempo) */
  function construirDias() {
    if (!cajaDias) return;
    const t = ahora();
    const fichas = [];
    for (let i = 0; fichas.length < 6 && i < 14; i++) {
      const f = new Date(Date.UTC(t.y, t.m - 1, t.d + i));
      const d = f.getUTCDay(), h = HORARIO[d];
      if (!h) continue;
      if (i === 0 && t.min > h[1] - 60) continue;
      const cab = i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : DIAS_C[d];
      const valor = `${i === 0 ? 'Hoy, ' : i === 1 ? 'Mañana, ' : ''}${DIAS[d]} ${f.getUTCDate()} de ${MESES[f.getUTCMonth()]}`;
      fichas.push(
        `<label class="ficha"><input type="radio" name="dia" value="${valor}" data-d="${d}" data-hoy="${i === 0 ? 1 : 0}">` +
        `<span><b>${cab}</b><small>${f.getUTCDate()} ${MESES_C[f.getUTCMonth()]}</small></span></label>`
      );
    }
    cajaDias.innerHTML = fichas.join('');
  }

  /* Mañana / tarde según el día: el sábado solo hay mañana; hoy, lo que quede */
  function ajustarFranjas() {
    if (!cajaFranjas) return;
    const elegido = form.querySelector('input[name="dia"]:checked');
    const d = elegido ? +elegido.dataset.d : 1;
    const esHoy = elegido && elegido.dataset.hoy === '1';
    const t = ahora();
    const h = HORARIO[d] || HORARIO[1];
    const franjas = d === 6
      ? [{ v: 'Por la mañana', n: 'Mañana', ini: h[0], fin: h[1] }]
      : [
          { v: 'Por la mañana', n: 'Mañana', ini: h[0], fin: MEDIODIA },
          { v: 'Por la tarde',  n: 'Tarde',  ini: MEDIODIA, fin: h[1] }
        ];
    const antes = (form.querySelector('input[name="franja"]:checked') || {}).value;
    cajaFranjas.innerHTML = franjas.map(f => {
      const pasada = esHoy && t.min > f.fin - 60;
      const empezada = esHoy && t.min > f.ini;
      const rango = pasada ? 'ya no da tiempo' : empezada ? `hasta las ${hhmm(f.fin)}` : `${hhmm(f.ini)}–${hhmm(f.fin)}`;
      return `<label class="ficha"><input type="radio" name="franja" value="${f.v}"${pasada ? ' disabled' : ''}${!pasada && antes === f.v ? ' checked' : ''}>` +
             `<span>${f.n}<small>${rango}</small></span></label>`;
    }).join('');
  }

  function leer() {
    const fd = new FormData(form);
    return {
      servicio: fd.getAll('servicio'),
      dia: fd.get('dia') || '',
      franja: fd.get('franja') || '',
      nombre: String(fd.get('nombre') || '').trim(),
      telefono: String(fd.get('telefono') || '').trim()
    };
  }

  function linea(clave, texto, vacio) {
    const dd = resguardo.querySelector(`[data-r="${clave}"]`);
    if (!dd || dd.textContent === texto) return;
    dd.textContent = texto;
    dd.classList.toggle('vacio', vacio);
    if (!vacio && !quieto) { dd.classList.remove('cambia'); void dd.offsetWidth; dd.classList.add('cambia'); }
  }

  function pintarResguardo() {
    const v = leer();
    const franja = form.querySelector('input[name="franja"]:checked');
    const rango = franja ? franja.parentElement.querySelector('small').textContent : '';
    linea('servicio', v.servicio.length ? v.servicio.join(', ') : 'Elige uno o varios', !v.servicio.length);
    linea('dia', v.dia || '—', !v.dia);
    linea('franja', v.franja ? `${v.franja} (${rango})` : '—', !v.franja);
    linea('nombre', v.nombre || '—', !v.nombre);

    const lista = v.servicio.length > 0 && v.dia && v.franja;
    resguardo.classList.toggle('lista', Boolean(lista));
    if (lista && nota.classList.contains('aviso')) { nota.classList.remove('aviso'); nota.textContent = notaBase; }

    const cuerpo = [
      'Hola, me gustaría pedir cita.',
      '',
      `Servicio: ${v.servicio.join(', ') || 'por decidir'}`,
      `Día: ${v.dia || 'a convenir'}`,
      `Franja: ${v.franja ? `${v.franja} (${rango})` : 'a convenir'}`,
      `Nombre: ${v.nombre || '—'}`,
      `Teléfono: ${v.telefono || '—'}`,
      '',
      'Gracias.'
    ].join('\n');
    const asunto = `Petición de cita${v.nombre ? ` · ${v.nombre}` : ''}`;
    botonEmail.href = `mailto:lorenacampillopeluqueria@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  }

  if (form && resguardo) {
    construirDias();
    ajustarFranjas();
    pintarResguardo();

    form.addEventListener('change', e => {
      if (e.target.name === 'dia') ajustarFranjas();
      pintarResguardo();
    });
    form.addEventListener('input', e => { if (e.target.matches('input[type="text"], input[type="tel"]')) pintarResguardo(); });
    form.addEventListener('submit', e => e.preventDefault());

    /* Sin servicio y día, el email no sale vacío: se avisa y se lleva al hueco */
    botonEmail.addEventListener('click', e => {
      const v = leer();
      if (v.servicio.length && v.dia) return;
      e.preventDefault();
      nota.textContent = !v.servicio.length ? 'Elige al menos un servicio y el día.' : 'Elige el día que te viene bien.';
      nota.classList.add('aviso');
      const hueco = form.querySelector(!v.servicio.length ? 'input[name="servicio"]' : 'input[name="dia"]');
      if (hueco) { hueco.closest('fieldset').scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'center' }); hueco.focus({ preventScroll: true }); }
    });

    /* «Pedir cita para…» desde cada servicio: deja el servicio marcado */
    $$('[data-elige]').forEach(a => a.addEventListener('click', () => {
      const casilla = form.querySelector(`input[name="servicio"][value="${a.dataset.elige}"]`);
      if (casilla && !casilla.checked) { casilla.checked = true; pintarResguardo(); }
    }));
  }

  /* ---------- Mapa: solo al pulsar ---------- */
  const botonMapa = $('[data-cargar-mapa]');
  if (botonMapa) {
    botonMapa.addEventListener('click', () => {
      const caja = $('[data-mapa]');
      const f = document.createElement('iframe');
      f.src = 'https://www.google.com/maps?q=Lorena+Campillo+Peluquer%C3%ADa,+Calle+de+San+Romualdo+51,+28037+Madrid&z=16&output=embed';
      f.title = 'Mapa: Lorena Campillo Peluquería, C/ San Romualdo 51-53, Madrid';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.allowFullscreen = true;
      caja.appendChild(f);
      caja.classList.add('con-mapa');
      f.focus();
    });
  }
})();
