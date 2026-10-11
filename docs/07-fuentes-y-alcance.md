# Fuentes, método y alcance

Revisión realizada sobre los archivos locales disponibles el **11 de octubre de 2026**. Los proyectos pueden contener trabajo sin publicar; su estado local no demuestra el comportamiento de una web desplegada.

## Directorios analizados

| Proyecto                    | Ruta                                                                               | Alcance                                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Dashboard de referencia     | `/Users/matiasespina/Documents/Projekte/laura-butallo-web/apps/admin-dashboard`    | Rutas, shell, sesión, formularios, módulos, medios y dependencias.                              |
| Backend del dashboard       | `/Users/matiasespina/Documents/Projekte/laura-butallo-web/functions` y reglas raíz | Lectura de dependencias necesarias para explicar autorización y procesamiento.                  |
| Consumidor público de Laura | `/Users/matiasespina/Documents/Projekte/laura-butallo-web/apps/web`                | Lectura puntual del contrato de consulta de mediasets/medios; no auditoría completa de esa web. |
| WordPress anterior          | `/Users/matiasespina/Documents/Projekte/Error404 Web/web-wordpress`                | Temas padre/hijo, integraciones, metaboxes, plantillas y personalizaciones.                     |
| Otra tienda                 | `/Users/matiasespina/Documents/Projekte/22 Recordings/web`                         | `app/` y componentes, estilos, loaders y datos necesarios para entender sus páginas.            |
| Proyecto destino            | `/Users/matiasespina/Documents/Projekte/Error404 Web/web-vercel-nextjs`            | Estado de tienda, rutas, componentes musicales, datos, carrito y layouts.                       |

Los enlaces relativos a proyectos hermanos funcionan con esta estructura local. Si se mueve la carpeta `docs` a otro repositorio o se publica sola, esos enlaces dejarán de resolver. Las rutas indicadas permiten localizar las fuentes igualmente.

## Método

1. Inventario de rutas y archivos relevantes con `rg` y lectura de manifiestos y documentación.
2. Seguimiento de cada ruta hacia sus componentes, consultas y acciones; distinción entre módulos conectados y pantallas demo.
3. Revisión de flujos editoriales: crear, ordenar, guardar, subir, seleccionar y eliminar medios.
4. Lectura de reglas y funciones de Laura para contrastar el acceso de interfaz con el de datos.
5. Comparación por ruta de archivos padre/hijo de Soundkraft, excluyendo `.DS_Store`, y lectura de diferencias representativas.
6. Comparación de las capas públicas y comerciales de 22 y Error404.
7. Síntesis de hallazgos y propuesta de adaptación, separando lo observado de lo pendiente.

Se aplicó la skill local [ui-ux-pro-max](../.agents/skills/ui-ux-pro-max/SKILL.md) como guía de revisión de navegación, formularios, feedback, responsive e interacción. Sus criterios orientan la evaluación; no constituyen una prueba de usabilidad ni una puntuación medida de los proyectos.

## Inventario cuantitativo

| Medida                                          | Resultado                                         | Interpretación                                                                      |
| ----------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `page.tsx` bajo `app/` de Error404              | 6                                                 | Superficie de tienda y páginas genéricas.                                           |
| `page.tsx` bajo `app/` de 22                    | 45                                                | Incluye variantes numeradas y alias, no 45 módulos de negocio.                      |
| `page.tsx` bajo `src/app/` del dashboard        | 24                                                | Incluye slots paralelos del overview; no 24 módulos editoriales.                    |
| Comparación Soundkraft padre/hijo               | 358 iguales, 249 distintos, 3 exclusivos del hijo | Comparación de contenido por misma ruta; incluye diferencias de versión y binarios. |
| Fichas locales de `RELEASE_DETAILS` en Error404 | 4                                                 | Complemento editorial de productos, todavía almacenado en código.                   |

Las versiones citadas son las declaradas en los manifiestos, no las resueltas por una instalación ni una evaluación de actualización recomendada.

## Índice de evidencia principal

### Dashboard

- Shell y navegación: [layout](../../../laura-butallo-web/apps/admin-dashboard/src/app/dashboard/layout.tsx), [sidebar](../../../laura-butallo-web/apps/admin-dashboard/src/components/layout/app-sidebar.tsx), [configuración](../../../laura-butallo-web/apps/admin-dashboard/src/config/nav-config.ts).
- Acceso: [sesión](../../../laura-butallo-web/apps/admin-dashboard/src/contexts/auth-session.tsx), [AuthGate](../../../laura-butallo-web/apps/admin-dashboard/src/components/layout/auth-gate.tsx), [proxy](../../../laura-butallo-web/apps/admin-dashboard/src/proxy.ts).
- Edición: [About](../../../laura-butallo-web/apps/admin-dashboard/src/features/about/components/about-form.tsx), [exhibiciones](../../../laura-butallo-web/apps/admin-dashboard/src/features/exhibitions/components/exhibition-form.tsx), [contacto](../../../laura-butallo-web/apps/admin-dashboard/src/features/contact/components/contact-form.tsx), [organizador](../../../laura-butallo-web/apps/admin-dashboard/src/features/works-organizer/components/category-organizer.tsx).
- Medios: [carga](../../../laura-butallo-web/apps/admin-dashboard/src/lib/media-upload.ts), [galería](../../../laura-butallo-web/apps/admin-dashboard/src/features/gallery/components/media-gallery.tsx), [acciones de galería](../../../laura-butallo-web/apps/admin-dashboard/src/features/gallery/components/media-page.tsx), [funciones](../../../laura-butallo-web/functions/src/index.ts).
- Autorización de datos: [Firestore](../../../laura-butallo-web/firestore.rules), [Storage](../../../laura-butallo-web/storage.rules), [migración callable](../../../laura-butallo-web/functions/src/migration/migrateArtworksToAssets.ts).
- Límite de reutilización comercial: [formulario demo](../../../laura-butallo-web/apps/admin-dashboard/src/features/products/components/product-form.tsx).

### WordPress

- Personalizaciones: [functions.php del hijo](../../web-wordpress/soundkraft-child/functions.php), [style.css del hijo](../../web-wordpress/soundkraft-child/style.css).
- Dependencias: [plugins recomendados](../../web-wordpress/soundkraft/config/plugins.php).
- Datos musicales y eventos: [metaboxes](../../web-wordpress/soundkraft-child/config/metaboxes.php), [release](../../web-wordpress/soundkraft-child/inc/theme-functions/post-types/release.php), [artist](../../web-wordpress/soundkraft-child/inc/theme-functions/post-types/artist.php), [playlist](../../web-wordpress/soundkraft-child/inc/theme-functions/playlist.php).
- Presentación: [release single](../../web-wordpress/soundkraft-child/templates/components/release/content-single.php), [event single](../../web-wordpress/soundkraft-child/templates/components/event/content-single.php).

### 22 Recordings

- Páginas de marca: [About](<../../../22 Recordings/web/components/about/page.tsx>), [header](<../../../22 Recordings/web/components/about/header.tsx>), [contacto/variantes](<../../../22 Recordings/web/components/design-preview/route-pages.tsx>).
- Catálogo: [loader](<../../../22 Recordings/web/components/design-preview/page.tsx>), [vista](<../../../22 Recordings/web/components/design-preview/catalogue-view.tsx>), [diseño responsive](<../../../22 Recordings/web/components/storefront/design-provider.tsx>).
- Producto y datos: [Shopify](<../../../22 Recordings/web/lib/shopify/index.ts>), [parser musical](<../../../22 Recordings/web/lib/shopify/release-details.ts>), [galería](<../../../22 Recordings/web/components/product/gallery.tsx>), [lightbox](<../../../22 Recordings/web/components/product/lightbox.tsx>).
- Loading: [layout compartido](<../../../22 Recordings/web/components/product/layout.ts>), [ContentReveal](<../../../22 Recordings/web/components/loading/content-reveal.tsx>).
- Documentación contrastada con código: [About](<../../../22 Recordings/web/docs/ABOUT.md>), [Loading](<../../../22 Recordings/web/docs/LOADING.md>).

### Error404 actual

- Estructura: [layout](../app/layout.tsx), [home](../app/page.tsx), [categoría](../app/search/[collection]/page.tsx), [producto](../app/product/[handle]/page.tsx).
- Datos: [Shopify](../lib/shopify/index.ts), [mocks](../lib/shopify/mock-data.ts), [detalles musicales](../lib/shopify/release-details.ts).
- UX de producto: [descripción](../components/product/product-description.tsx), [player](../components/product/record-player.tsx), [galería](../components/product/gallery.tsx), [relacionados](../components/product/related-mobile-carousel.tsx).
- Compra: [acciones](../components/cart/actions.ts), [checkout local](../app/checkout/page.tsx).

## Lo que no se comprobó

No se iniciaron servidores de desarrollo ni builds de los proyectos de referencia; tampoco se instalaron sus dependencias. No se ejecutaron scripts de migración, deploy o escritura. No se realizaron cambios en los tres proyectos analizados ni en el código de la tienda destino.

No se inspeccionaron `.env`, credenciales ni contenido de `wp-config.php`. Por eso no se establece si cada aplicación está conectada actualmente a un servicio, qué cuenta utiliza ni qué reglas están desplegadas.

No hubo revisión visual en navegador, entrevistas, métricas, pruebas de teclado/lector de pantalla, pagos, uploads o reproducción. Los riesgos de layout, rendimiento y foco se deducen de implementación y necesitan validación funcional.

El material WordPress no incluye una copia completa de la instalación. No puede confirmarse el contenido publicado, la activación de plugins, los menús, los pedidos ni la configuración editorial real a partir del tema.

No se consultó el historial completo de Git para determinar el origen exacto de las plantillas. La similitud técnica entre 22 y Error404 está documentada; la genealogía queda abierta.

## Entregable y verificación

Los entregables de análisis se limitan a Markdown en `docs/`, incluyendo el [plan específico Error404 vs. 22](08-error404-vs-22-plan-de-evolucion.md). La revisión comprende formato Markdown, resolución de enlaces locales y ausencia de errores de whitespace. Las pruebas de aplicación y migración descritas en [06](06-migracion-y-validacion.md) son trabajo futuro.
