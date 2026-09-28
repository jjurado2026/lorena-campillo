# Lorena Campillo Peluquería — Propuesta de homepage (v3 «Azulejo»)

Prototipo de homepage para **Lorena Campillo Peluquería**, peluquería boutique en el barrio de Simancas (San Blas-Canillejas, Madrid), galardonada con seis premios nacionales e internacionales.

**El problema que resuelve:** en su web actual, lo que decide una visita a la peluquería —dónde está, cuándo abre, cómo pedir cita— no aparece en la home de escritorio y en el móvil está al final, a unas cinco pantallas de scroll. No hay forma de pedir cita salvo llamar, sus fotos de trabajos están escondidas en páginas interiores y cuatro de sus cinco páginas se titulan «My Site 3».

**Dirección estética: «Azulejo».** Su salón es azulejo negro brillante con junta blanca. La home se construye como esa pared: un mosaico de piezas sobre una junta de porcelana, donde **cada azulejo responde a una pregunta** de quien busca peluquería en el móvil — ¿abrís ahora?, ¿dónde estáis?, ¿qué hacéis?, ¿cómo pido cita? Solo su blanco y negro; el latón de sus medallas, solo para los galardones. Bodoni Moda + Onest.

## Lo útil
- **Abierto / cerrado en vivo**, con la hora de Madrid y su horario («Cerrado · abre mañana a las 10:00»)
- **Pide tu cita en un minuto**: servicio, día (los próximos seis en que abren), mañana o tarde y nombre. Un **resguardo** se rellena mientras eliges y deja el email **ya escrito** o la llamada a un toque. El sábado solo ofrece mañana; hoy, solo lo que queda
- **Los seis servicios con sus fotos reales** y su texto, y un «Pedir cita para…» que deja el servicio marcado
- **Trayectoria**: los seis galardones con año e institución, y el 2012 en que abrió
- **Preguntas rápidas**, **horario con el día de hoy marcado**, **mapa que se carga al pulsar** y **barra fija** en móvil (Llamar · Pedir cita · Cómo llegar), que se aparta mientras escribes

## Fotos: no partimos de cero
La auditoría del 22-sep decía «ni una sola foto de trabajos». **Sí las hay**, enterradas en `/servicios` y `/sobre-nosotros`: un rizado, un balayage, un recogido con tocado ante su logo, unas mechas con papel, Lorena con tijeras y el puesto de caballero, hechas en su salón. Esta versión las pone en primera línea.

## Movimiento
Solo `transform` y `opacity`, nada en bucle.
- **Una vez:** el mosaico se coloca pieza a pieza (el único escalonado de la página) y una banda de luz cruza el azulejo negro de los premios: **el brillo del esmalte**, que vuelve al pasar el cursor por los azulejos negros y los botones
- **Fotos:** una capa se retira hacia arriba y la foto se asienta
- **Pictogramas:** cada uno hace su gesto al aparecer o al pasar por encima — la tijera corta, la brocha moja, el secador sopla, el carmín sube
- **Resguardo:** cada dato entra al elegirlo y, al completarse, se sella «Lista»
- Con `prefers-reduced-motion` o `?ss`: cero animaciones, todo visible

## Stack
HTML, CSS y JavaScript puro. Cero dependencias, cero build. Bodoni Moda + Onest autoalojadas (134 KB). Fotos del cliente en WebP con `srcset`.
**Carga inicial: ~308 KB** sin comprimir (su web actual pesa 390 KB solo el documento HTML).

## Ver en local
```bash
cd prototype && python -m http.server 8000
```
Parámetros: `?ss` (sin animaciones, para capturas) · `?ahora=2026-09-29T18:30` (fija la hora de Madrid para revisar estados y franjas).

## Publicar
```bash
git subtree push --prefix=prototype origin gh-pages
```

## Comprobado, no asumido
- Sin desbordamiento horizontal a 360, 390, 768, 1024, 1280, 1440 y 1920 px
- Cero errores de JavaScript · un solo `<h1>` · todas las imágenes con `alt` · dianas táctiles ≥ 44 px · foco visible en claro y oscuro
- Cita: aviso si falta servicio o día, franja desactivada si ya no da tiempo, sábado solo mañana, domingo cerrado, email redactado completo
- Menú móvil con Escape y bloqueo de scroll · barra fija que se aparta en la cita y al escribir
- `prefers-reduced-motion`: cero animaciones vivas y todo visible · **sin JavaScript la página se lee entera**
- Datos estructurados `HairSalon` (horario, galardones, servicios) y `FAQPage`

## Pendiente de la clienta
Ver [_interno/copy/cambios-copy.md](_interno/copy/cambios-copy.md) (local, no se publica): validar las frases nuevas, **cómo confirman las citas** (teléfono o WhatsApp), si cierran a mediodía, fechas de dos galardones leídas de sus diplomas, más fotos de trabajos, precios y acceso a Google Business.

## Versiones
`v1-espejo` y `v2-editorial` están etiquetadas en git.

---
Diseño y desarrollo: **Juan Jurado** · [jjuradogarciadelrio.com](https://jjuradogarciadelrio.com)
