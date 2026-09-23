/* ==========================================================================
   Lorena Campillo Peluquería — home.js
   Lo que el movimiento no cubre: estado de apertura real, cabecera y barra.
   Sin dependencias.
   ========================================================================== */
(function () {
  'use strict';

  var params = new URLSearchParams(location.search);

  /* ---------- 1. ¿Está abierto ahora? ----------------------------------
     Su horario real: L-V 10:00-20:30 · Sáb 9:00-15:00 · Dom cerrado.
     Es un dato que cambia, no decoración: por eso se calcula.            */
  var HORARIO = {
    1: [600, 1230], 2: [600, 1230], 3: [600, 1230], 4: [600, 1230], 5: [600, 1230],
    6: [540, 900],
    0: null
  };
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  function hhmm(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return h + ':' + (m < 10 ? '0' + m : m);
  }

  function proximaApertura(dia) {
    for (var i = 1; i <= 7; i++) {
      var d = (dia + i) % 7;
      if (HORARIO[d]) {
        return (i === 1 ? 'mañana' : 'el ' + DIAS[d]) + ' a las ' + hhmm(HORARIO[d][0]);
      }
    }
    return '';
  }

  var caja = document.getElementById('estado');
  if (caja) {
    var txt = caja.querySelector('[data-estado-txt]');
    var ahora = new Date();
    var dia = ahora.getDay();
    var min = ahora.getHours() * 60 + ahora.getMinutes();
    var tramo = HORARIO[dia];

    if (tramo && min >= tramo[0] && min < tramo[1]) {
      txt.textContent = 'Abierto ahora · hasta las ' + hhmm(tramo[1]);
      caja.removeAttribute('data-cerrado');
    } else if (tramo && min < tramo[0]) {
      txt.textContent = 'Cerrado · abre hoy a las ' + hhmm(tramo[0]);
      caja.setAttribute('data-cerrado', '');
    } else {
      txt.textContent = 'Cerrado · abre ' + proximaApertura(dia);
      caja.setAttribute('data-cerrado', '');
    }
  }

  /* ---------- 2. Cabecera: se aparta al bajar, vuelve al subir ---------- */
  var cab = document.getElementById('cab');
  if (cab && !params.has('ss')) {
    var ultimo = window.scrollY;
    var pendiente = false;

    var revisar = function () {
      var y = window.scrollY;
      var dy = y - ultimo;
      // Umbral de 6px: el temblor del scroll táctil no la dispara.
      if (Math.abs(dy) > 6) {
        cab.classList.toggle('cab--fuera', dy > 0 && y > 240);
        ultimo = y;
      }
      pendiente = false;
    };

    window.addEventListener('scroll', function () {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(revisar);   // nunca más de una vez por frame
    }, { passive: true });
  }

  /* ---------- 3. Barra móvil: fuera cuando llega "Pedir cita" ----------- */
  var barra = document.getElementById('barra');
  var hero = document.getElementById('hero');
  var visitar = document.getElementById('visitar');

  if (barra && hero && 'IntersectionObserver' in window && !params.has('ss')) {
    var fueraDelHero = false;
    var enVisitar = false;

    var pintar = function () {
      barra.classList.toggle('barra--ver', fueraDelHero && !enVisitar);
    };

    new IntersectionObserver(function (f) {
      fueraDelHero = !f[0].isIntersecting;
      pintar();
    }, { threshold: 0 }).observe(hero);

    if (visitar) {
      // No tapar sus propias acciones cuando ya están en pantalla.
      new IntersectionObserver(function (f) {
        enVisitar = f[0].isIntersecting;
        pintar();
      }, { threshold: .18 }).observe(visitar);
    }
  }
})();
