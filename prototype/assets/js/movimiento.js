/* ==========================================================================
   Lorena Campillo Peluquería — movimiento.js
   Motor del sistema "El trazo".
   En un salón nada aparece de la nada: algo pasa por encima. Por eso nada
   hace fade+translateY — todo se revela por barrido.
   ?ss congela el estado final para capturas.
   ========================================================================== */
(function () {
  'use strict';

  var params = new URLSearchParams(location.search);
  var quieto =
    params.has('ss') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var raiz = document.documentElement;
  // Sólo se oculta contenido si este script está vivo para volver a mostrarlo.
  // Sin JS o si esto falla antes de tiempo, la página se ve entera.
  if (!quieto) raiz.classList.add('js');

  /* ---------- Estado final completo, nunca una página rota -------------- */
  function asentar() {
    raiz.classList.remove('js');
    document.querySelectorAll('.corte, .an-nombre, .an-sube, .firma--escribe, .lamina__marco')
      .forEach(function (el) {
        el.classList.add('visto');
        el.style.animation = 'none';
        el.style.clipPath = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    var h = document.querySelector('.hero');
    if (h) h.classList.add('listo');
  }

  if (quieto) {
    asentar();
    return;
  }

  /* ---------- 1. Secuencia de carga del hero ---------------------------
     La firma se escribe → el nombre se descubre → el dato → la frase → el
     CTA. Cada pieza entra cuando la anterior tiene cuerpo, no cuando
     termina: se lee como una sola acción continua.                       */
  var hero = document.querySelector('.hero');
  if (hero) {
    // Al primer frame pintado, no en load: no esperamos a las fotos.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add('listo'); });
    });
  }

  /* ---------- 2. Revelado por barrido, una sola vez --------------------- */
  if ('IntersectionObserver' in window) {
    var ojo = new IntersectionObserver(function (filas) {
      filas.forEach(function (fila) {
        if (!fila.isIntersecting) return;
        fila.target.classList.add('visto');
        ojo.unobserve(fila.target);       // no se repite al volver a pasar
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: .15 });

    document.querySelectorAll('.corte, .lamina__marco')
      .forEach(function (el) { ojo.observe(el); });
  } else {
    asentar();
  }
})();
