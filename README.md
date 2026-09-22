# Lorena Campillo Peluquería — Propuesta de remaquetación de la homepage

Prototipo de homepage para **Lorena Campillo Peluquería**, peluquería boutique en el barrio de Simancas (San Blas-Canillejas, Madrid), galardonada con seis premios nacionales e internacionales.

**Qué es:** la misma home que tienen hoy — sus bloques, en su orden, con sus textos y sus imágenes — remaquetada con sus colores de marca (negro y blanco).
**Qué no es:** no añade secciones ni contenido nuevo. Las mejoras de fondo se recogen aparte, en la propuesta.

**El problema que resuelve:** su web actual está hecha con el editor de escritorio de Wix **sin versión móvil**. En un teléfono, el logo, el menú, las fotos y todos los párrafos se salen de la pantalla. Más de la mitad de las visitas de una peluquería de barrio llegan desde el móvil.

**Dirección estética:** *"Espejo"* — el filete doble que enmarca su logotipo se convierte en el separador de toda la página, y el negro y el blanco de su marca en bloques alternos, como los espejos enfrentados de su salón.

## Stack
HTML, CSS y JavaScript puro. Cero dependencias, cero build. Fuentes variables autoalojadas (Fraunces + Instrument Sans) e imágenes del cliente en WebP con `srcset`.

**Carga inicial: 178 KB** (su web actual pesa 390 KB solo el documento HTML, sin contar imágenes ni scripts).

## Estructura
```
prototype/          Prototipo navegable (se publica en gh-pages con git subtree)
  index.html
  assets/css/       global.css · home.css
  assets/js/        main.js
  assets/fonts/     fraunces · instrument-sans (woff2, latino)
  assets/img/       retrato, salón, logos de premios y logotipo del cliente
```

## Ver en local
```bash
cd prototype && python -m http.server 8000
```
Parámetro útil para revisar: `?ss` (sin animaciones, para capturas).

## Publicar
```bash
git subtree push --prefix=prototype origin gh-pages
```

## Comprobado
- Sin desbordamiento horizontal a 360, 390, 768, 1024, 1440 y 1920 px
- Contraste AA en todo el texto · un solo `<h1>` · dianas táctiles ≥ 24 px
- `prefers-reduced-motion` respetado · foco visible en todo elemento pulsable
- Datos estructurados `HairSalon` con dirección, teléfono y horario

---
Diseño y desarrollo: **Juan Jurado** · [jjuradogarciadelrio.com](https://jjuradogarciadelrio.com)
