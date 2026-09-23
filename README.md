# Lorena Campillo Peluquería — Propuesta de homepage

Prototipo de homepage para **Lorena Campillo Peluquería**, peluquería boutique en el barrio de Simancas (San Blas-Canillejas, Madrid), galardonada con seis premios nacionales e internacionales.

**El problema que resuelve:** su web actual está hecha con el editor de escritorio de Wix **sin versión móvil**. En un teléfono, el logo, el menú, las fotos y todos los párrafos se salen de la pantalla. Además, cuatro de sus cinco páginas se titulan «My Site 3» — el nombre de fábrica de la plantilla.

**Dirección estética:** *editorial de moda*. La arquitectura de su salón **es** la dirección de arte: blanco y negro porque su local es blanco y negro, y el latón `#A8865A` tomado del adorno que ya usan en su propio pie de página, reservado solo para los seis galardones.

## Las decisiones que sostienen el diseño

**1. Foto y tipografía no se superponen.** Se midió la luminancia real de las cuatro fotos: ninguna tiene una región donde el texto blanco alcance AA sin un velo de 0,90 que borraría la imagen. Así que las fotos van laminadas y limpias, y el texto sobre negro o blanco sólidos. El hero es la excepción, con un velo de paradas duras medido contra los píxeles reales.

**2. Dos palabras, una columna.** `LORENA` y `CAMPILLO` tienen anchuras distintas (2,689em y 3,556em, medidas con fontTools sobre el binario). Dividiendo el ancho de columna entre cada anchura, ambas miden exactamente lo mismo a cualquier viewport, sin media queries ni `letter-spacing` forzado.

**3. Los seis servicios, a dos cuerpos.** Sus nombres tienen un rango de anchura de 2× — justificarlos todos daría tamaños de 65 a 132px, que es ruido. Hay un corte natural en 3,5em que los parte en tres cortos y tres largos: dos cuerpos, no seis. Dos palabras besan el margen y cuatro quedan cortas, lo que produce una rag editorial real.

**4. El titular no me lo inventé: está en su pared.** «Magic flows from our hands» está rotulado en el salón y se ve en sus propias fotos.

**5. Movimiento «El trazo».** En un salón nada aparece de la nada: algo pasa por encima. Nada hace fade + translateY (el tic de la IA) — todo se revela por barrido con `clip-path`. El logo manuscrito no aparece: una mano lo escribe.

## Bloques
Hero · Ubicación · Los seis servicios · La lámina · Los seis galardones · El salón · La cita · Pedir cita · Pie

Los servicios y los galardones **no están en su home actual**. Se han añadido con sus textos reales, tomados de sus páginas `/servicios` y `/galardones`.

## Stack
HTML, CSS y JavaScript puro. Cero dependencias, cero build. Big Shoulders + Source Serif 4 autoalojadas. Imágenes del cliente en WebP con `srcset`.

**Carga inicial: 326 KB** (su web actual pesa 390 KB solo el documento HTML, sin imágenes ni scripts).

## Ver en local
```bash
cd prototype && python -m http.server 8000
```
Parámetro útil: `?ss` (congela el estado final, para capturas).

## Publicar
```bash
git subtree push --prefix=prototype origin gh-pages
```

## Comprobado, no asumido
- Sin desbordamiento horizontal a 360, 390, 768, 1024, 1440 y 1920 px
- Contraste AA en todo el texto. El contorno de `CAMPILLO` se midió sobre los píxeles del render: **16,7:1** (el auditor de CSS da un falso positivo porque el relleno es `transparent`)
- Un solo `<h1>` · dianas táctiles ≥ 44px · foco visible
- `prefers-reduced-motion`: **cero elementos ocultos, cero animaciones vivas**, estado final completo
- **Sin JavaScript la página se ve entera** (el contenido solo se oculta si el script está vivo para volver a mostrarlo)
- Datos estructurados `HairSalon` con dirección, teléfono, horario y los seis servicios

## Pendiente de la clienta
1. **Seis fotos de trabajos, una por servicio** — el bloque de servicios está diseñado para recibirlas sin rehacerse. Es la carencia más cara que tiene la web.
2. Tarifa de precios, aunque sea «desde»
3. La foto del salón en resolución original
4. Fechas de los galardones 05 y 06 (no constan en su web)
5. ¿Tiene WhatsApp de negocio? Decide si la home convierte en domingo

---
Diseño y desarrollo: **Juan Jurado** · [jjuradogarciadelrio.com](https://jjuradogarciadelrio.com)
