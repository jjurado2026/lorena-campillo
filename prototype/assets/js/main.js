/* ==========================================================================
   Lorena Campillo Peluquería — main.js
   Sin dependencias. Parámetros de revisión: ?ss (sin animaciones).
   ========================================================================== */
(function () {
  'use strict';

  var params = new URLSearchParams(location.search);
  var sinMovimiento =
    params.has('ss') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú en móvil ---------- */
  var boton = document.getElementById('menu-boton');
  var nav = document.getElementById('nav');

  if (boton && nav) {
    var etiqueta = boton.querySelector('.solo-lectores');

    var cerrar = function () {
      nav.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
      if (etiqueta) etiqueta.textContent = 'Abrir menú';
    };

    boton.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      boton.setAttribute('aria-expanded', String(abierto));
      if (etiqueta) etiqueta.textContent = abierto ? 'Cerrar menú' : 'Abrir menú';
    });

    // Al elegir una sección, el menú se aparta
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) cerrar();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('abierto')) {
        cerrar();
        boton.focus();
      }
    });

    // Al pasar a escritorio el menú vuelve a su sitio
    window.matchMedia('(min-width: 700px)').addEventListener('change', function (e) {
      if (e.matches) cerrar();
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  var piezas = document.querySelectorAll('.aparece');

  if (sinMovimiento || !('IntersectionObserver' in window)) {
    piezas.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    piezas.forEach(function (el) { observador.observe(el); });
  }

  /* ---------- Barra fija en móvil: aparece al salir del hero ---------- */
  var barra = document.getElementById('barra-movil');
  var hero = document.querySelector('.hero');

  if (barra && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entradas) {
      barra.classList.toggle('visible', !entradas[0].isIntersecting);
    }, { threshold: 0 }).observe(hero);
  }

  /* ---------- Para capturas: congela el estado final ---------- */
  if (params.has('ss')) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('.hero__titulo .linea > span, .hero__filete, .hero__parrafo, .hero__acciones, .hero__figura')
      .forEach(function (el) {
        el.style.animation = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
  }
})();
