# Lorena Campillo Peluquería — Propuesta de homepage (v4 «Luz de espejo»)

Prototipo de homepage para **Lorena Campillo Peluquería**, peluquería boutique en el barrio de Simancas (San Blas-Canillejas, Madrid), galardonada con seis premios nacionales e internacionales.

**El problema que resuelve:** en su web actual, lo que decide una visita a la peluquería —dónde está, cuándo abre, cómo pedir cita— no aparece en la home de escritorio y en el móvil está al final, a unas cinco pantallas de scroll. No hay forma de pedir cita salvo llamar, sus fotos de trabajos están escondidas en páginas interiores y cuatro de sus cinco páginas se titulan «My Site 3».

**Dirección estética: «Luz de espejo».** Su salón es una pared de espejos de marco negro con luz LED detrás. La página se enciende como ellos: el hero pone su retrato **dentro de un espejo retroiluminado, entre su nombre** («Lorena · retrato · Campillo»), la reserva se apoya sobre la foto de sus espejos, el salón es una pared de espejos que se encienden al llegar y la trayectoria avanza con un hilo de oro. Su negro y su blanco; el oro de sus medallas para los premios. **Italiana** en los titulares y **Onest** en el texto.

## Fotos, tal cual
- **Hero:** la foto de su web inicial (Lorena con sus medallas), el mismo archivo (SHA-256 idéntico al de Wix), sin recortes ni filtros. El marco y la luz están fuera de la foto.
- **Trayectoria:** la foto de Lorena de pie con fondo azul, con el mismo encuadre con el que la muestra su página de Galardones.
- **Maquillaje:** su foto original (224 px), nítida, sobre un fondo difuminado de sí misma.

## Lo útil
- Estado **abierto / cerrado en vivo** con la hora de Madrid
- **Pide tu cita**: servicio, día (los próximos seis en que abren), mañana o tarde y nombre. El resguardo se rellena solo, con una hoja de calendario del día elegido, y deja el email ya escrito o la llamada a un toque. El sábado solo ofrece mañana; hoy, solo lo que queda
- **Vitrina de servicios** (escritorio): el servicio que pasa por el centro se enciende y su foto aparece en la vitrina. En móvil, carrusel con profundidad
- **Preguntas frecuentes como conversación**: se toca una pregunta y la respuesta llega en el chat
- **Nuestra Ubicación**: dirección, horario con el día de hoy marcado, mapa y «Cómo llegar»
- Llamadas a la acción en cada sección, botón flotante en escritorio y barra fija en móvil

## Movimiento
Solo `transform` y `opacity`.
- **Hero (una vez):** el LED del espejo parpadea y se enciende, aparece el retrato y las letras del nombre suben desde el espejo hacia fuera. Al hacer scroll, el nombre se abre y el sello de los seis premios gira
- **Titulares:** suben palabra a palabra al entrar
- **Botones:** la tinta crece desde donde entra el cursor y el texto se invierte a su paso; el texto rueda; el icono hace su gesto (el teléfono suena, el calendario se abre); los principales siguen al cursor como un imán
- **Servicios:** luz que barre la vitrina al cambiar; cada pictograma hace su gesto (la tijera corta, el secador sopla)
- **Salón:** los espejos se encienden uno a uno y las fotos se desplazan dentro del marco; la frase se ilumina palabra a palabra al leerla
- **Trayectoria:** el hilo de oro avanza con la lectura; cada medalla se enciende y el logo gira como una moneda
- **Preguntas:** las burbujas llegan con el indicador de «escribiendo»
- Con `prefers-reduced-motion` o `?ss`: cero animaciones, todo visible

## Comprobado, no asumido
- **El hero cabe entero, sin scroll**, en 14 pantallas: 320×568, 360×640, 375×667, 390×844, 414×896, 844×390 (móvil horizontal), 768×1024, 820×1180, 1024×768, 1280×720, 1366×768, 1440×900, 1920×1080 y 2560×1440. La foto conserva su proporción original en todas (sin recorte) y el nombre nunca la tapa
- Sin desbordamiento horizontal · cero errores de JavaScript · un solo `<h1>` · todas las imágenes con `alt` · dianas táctiles ≥ 44 px · foco visible
- Reserva, chat, vitrina, menú, botón flotante, barra fija y estado del horario probados con interacción real
- Sin JavaScript la página se lee entera (las preguntas aparecen todas, respondidas)

## Stack
HTML, CSS y JavaScript puro. Cero dependencias, cero build. Italiana (10 KB) + Onest autoalojadas.

## Ver en local
```bash
cd prototype && python -m http.server 8000
```
Parámetros: `?ss` (sin animaciones, para capturas) · `?ahora=2026-09-29T18:30` (fija la hora de Madrid para revisar estados y franjas).

## Publicar
```bash
git subtree push --prefix=prototype origin gh-pages
```

## Versiones
Las anteriores están etiquetadas en git: `v1-espejo`, `v2-editorial` y `v3-azulejo`.

---
Diseño y desarrollo: **Juan Jurado** · [jjuradogarciadelrio.com](https://jjuradogarciadelrio.com)
