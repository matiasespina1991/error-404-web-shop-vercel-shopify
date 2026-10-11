# WordPress actual de Error404

Origen: `Error404 Web/web-wordpress`.

## Qué hay en la copia

La raíz contiene los temas `soundkraft` y `soundkraft-child`. El padre declara versión **1.0.11**; el hijo declara `Template: soundkraft` y una versión basada en **1.0.8**. También hay plantillas WooCommerce, integraciones de plugins, CSS y JavaScript del tema.

No encontré un dump SQL, una exportación WXR de contenido ni una biblioteca `uploads` dentro de esta copia. Los JSON encontrados corresponden a configuración de selectores de idiomas. Hay un archivo `wp-config.php` dentro del hijo; no se leyó su contenido ni se considera una exportación de datos.

**Límite importante:** esto permite estudiar capacidades y personalizaciones, pero no afirmar qué páginas, plugins, menús, ajustes o productos están activos en producción. El contenido compuesto con Elementor puede residir en la base de datos y no en los PHP del tema.

Fuentes: [tema padre](../../web-wordpress/soundkraft/style.css), [tema hijo](../../web-wordpress/soundkraft-child/style.css), [configuración de plugins](../../web-wordpress/soundkraft/config/plugins.php).

## Estructura y modelo de contenido

```text
soundkraft/
  config/                 Opciones, metaboxes, integraciones de plugins
  inc/                    Framework, frontend, hooks, customizer, administración
  templates/
    discography/          Archivos y detalle de lanzamientos
    artists/              Directorio y perfiles
    events/               Listado y detalle de eventos
    portfolio/            Obras/proyectos
    components/           Fragmentos de presentación
  woocommerce/            Sobrescrituras de tienda
  assets/                 CSS, JS, iconos y fuentes

soundkraft-child/         Copia amplia del tema + personalizaciones
  functions.php
  style.css
  templates/, inc/, woocommerce/, assets/, ...
```

El modelo musical es más amplio que el del proyecto nuevo:

| Entidad/capacidad | Evidencia en el tema                                                               | Lo que aporta                                      |
| ----------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------- |
| Release           | Plantillas de discografía, metaboxes, taxonomías `band`, `label`, `release_genre`. | Disco como contenido editorial, incluso sin venta. |
| Artist            | Plantillas y campos de ubicación, web, correo y redes.                             | Perfiles y navegación por artistas.                |
| Event             | Metadatos de fecha, recinto, localidad, entradas y estado.                         | Agenda e historial de eventos.                     |
| Product           | WooCommerce y vínculo `_post_wc_product_id` desde release.                         | Producto comercial asociado a un lanzamiento.      |
| Playlist/audio    | Playlist Manager y campos de MP3/playlist de producto.                             | Escucha vinculada al contenido.                    |
| Páginas/bloques   | WordPress, Elementor y bloques antes/después de cabecera/footer.                   | Edición institucional y composición de páginas.    |

Fuentes: [metaboxes](../../web-wordpress/soundkraft-child/config/metaboxes.php), [lanzamientos](../../web-wordpress/soundkraft-child/inc/theme-functions/post-types/release.php), [artistas](../../web-wordpress/soundkraft-child/inc/theme-functions/post-types/artist.php), [playlists](../../web-wordpress/soundkraft-child/inc/theme-functions/playlist.php).

## Personalizaciones concretas de Error404

En `soundkraft-child/functions.php` y `style.css` aparecen modificaciones explícitas, más útiles para entender intención que las cientos de plantillas genéricas:

| Personalización                                    | Observación UX                                                                             | Implicación al migrar                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Burger de tres líneas de longitudes distintas      | Líneas alineadas a la derecha que se expanden al hover/foco.                               | Conservar la intención visual si interesa, implementándola como estado del componente.           |
| Barra móvil oscura translúcida                     | Fondo negro al 84 % con blur y fondos internos transparentes.                              | Referencia concreta de identidad del header móvil.                                               |
| Bloqueo del preload AJAX de login WooCommerce      | Intercepta `fetch`, XHR y jQuery para una acción específica; también desregistra scripts.  | Indica una integración conflictiva; no trasladar ese parche global.                              |
| Flyer de evento                                    | Shortcode para escritorio y reglas que ocultan la miniatura estándar por encima de 500 px. | Diseñar un único bloque responsive de flyer.                                                     |
| Reemplazo de imagen de evento por versión completa | Cambia `src` y quita `srcset`/`sizes` tras cargar.                                         | Mantener claridad del flyer con imágenes responsive, evitando descargar el original por defecto. |
| `releases_carousel`                                | Consulta releases publicados, portadas y enlaces; Swiper con flechas y puntos.             | Hay intención de destacar discografía, no solo una cuadrícula comercial.                         |
| Ajustes de footer                                  | Quita márgenes/viñetas y fuerza iconos blancos.                                            | Tener un footer definido en componentes reduce esos overrides.                                   |

Fuentes: [funciones del hijo](../../web-wordpress/soundkraft-child/functions.php), [estilos del hijo](../../web-wordpress/soundkraft-child/style.css).

## UX del carrusel y de los contenidos musicales

El carrusel custom usa slides de ancho automático, centrado, bucle, separación de 24 px y autoplay cada 3 segundos. `disableOnInteraction` y `pauseOnMouseEnter` están desactivados; además se reinicia autoplay al salir del puntero.

Eso expresa una portada promocional en movimiento, pero puede competir con la lectura y la selección de un disco. Para la nueva tienda tiene más sentido conservar el desplazamiento voluntario ya elegido: tarjeta siguiente visible, flechas y fade. Si se recupera autoplay para otra sección, necesita pausa explícita y respeto por movimiento reducido. El CSS del hijo desactiva movimiento del burger, no demuestra que el carrusel tenga ese tratamiento.

La ficha de release combina contenido, botones externos, portada, título, metadatos y extracto. Puede enlazar Spotify, Bandcamp, Apple, YouTube u otros destinos y asociarse a un producto. Esa separación es importante: **agotado no debería significar que un disco desaparece del archivo del sello**.

Las plantillas de evento delegan en funciones del plugin y hooks. Tener el PHP no asegura poder renderizarlo sin esos plugins ni recuperar sus datos. Lo mismo aplica a la discografía y sus taxonomías.

Fuentes: [carrusel](../../web-wordpress/soundkraft-child/functions.php), [detalle de release](../../web-wordpress/soundkraft-child/templates/components/release/content-single.php), [detalle de evento](../../web-wordpress/soundkraft-child/templates/components/event/content-single.php).

## Dependencias y mantenibilidad

El tema incluye integraciones de Elementor, Wolf Core, Discography, Events, Artists, Playlist Manager, WooCommerce y otras herramientas. La lista de plugins recomendados no confirma instalación o activación. También quedan rutas de integración con WPBakery.

El tema hijo es una copia extensa, no una capa pequeña de overrides. Comparación local, excluyendo `.DS_Store`: **358 archivos idénticos, 249 diferentes y 3 exclusivos del hijo** respecto del padre por la misma ruta. Esa cifra incluye recursos binarios y diferencias superficiales. No equivale a 249 personalizaciones propias: por ejemplo, el componente de release cambia únicamente su cabecera de versión 1.0.11 a 1.0.8, y una plantilla de precio difiere en espacios.

Consecuencia: antes de portar una plantilla hay que separar lógica del fabricante, diferencias de versión y cambios específicos de Error404. Los `inc/` del hijo tampoco deben asumirse ejecutados solo por existir: depende de cómo se incluyan los archivos y de la resolución de templates/hooks.

## Datos a recuperar antes de sustituir WordPress

| Origen                    | Destino posible                         | Información que debe conservarse                                                                                                     |
| ------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Releases y taxonomías     | Archivo musical + relación con producto | IDs antiguos, slugs, artista, sello, referencia, fecha, formato, estilos, texto y estado.                                            |
| Tracklist                 | Filas estructuradas                     | Orden, cara/posición, título, duración, créditos y audio si existe.                                                                  |
| Enlaces de escucha/compra | Enlaces del lanzamiento                 | Proveedor, URL y tipo de acción.                                                                                                     |
| Eventos                   | Módulo Eventos                          | Fecha/hora, zona horaria, recinto, localidad, flyer, entradas, cancelación y sold out.                                               |
| Artistas                  | Perfiles                                | Biografía, imágenes, redes, contactos y asociaciones.                                                                                |
| WooCommerce               | Proveedor comercial elegido             | SKU, variantes, inventario y correspondencia con el catálogo nuevo. Pedidos e identidad de clientes requieren una estrategia aparte. |
| Páginas y Elementor       | About/Contacto/bloques editoriales      | Texto real, jerarquía, imágenes, enlaces; revisar manualmente shortcodes y layouts.                                                  |
| Adjuntos                  | Biblioteca de medios                    | Archivo, URL antigua, dimensiones, alt, crédito y derechos/uso aplicables.                                                           |
| Permalinks y SEO          | Rutas nuevas y mapa de redirects        | URL antigua, destino equivalente, títulos y metadescripciones existentes.                                                            |

Los nombres de metadatos útiles están en `config/metaboxes.php`: `_wolf_release_catalog_number`, `_wolf_release_tracklist`, `_wolf_release_date`, enlaces `_wolf_release_*`, `_wolf_event_start_date`, `_wolf_event_ticket`, `_wolf_event_venue` y `_artist_*`. Los valores y el formato serializado de cada campo deben inspeccionarse en una exportación real; no inventarlos a partir de las etiquetas del formulario.

## Qué conservar y qué no trasladar

Conservar: dominio musical, archivo histórico, navegación por artista/sello, flyers, enlaces de escucha, estados de evento y capacidad de editar contenido.

Reimplementar en componentes: header, ficha musical, agenda, galería de flyer y carrusel manual.

Evitar trasladar: framework del tema, parches globales de red, composición dependiente de shortcodes, doble sistema de carrousels y overrides masivos. La propuesta es preservar contenido y tareas, no imitar la estructura interna de WordPress.
