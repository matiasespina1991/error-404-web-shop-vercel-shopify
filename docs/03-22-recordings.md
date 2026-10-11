# 22 Recordings

Origen: `22 Recordings/web`, con especial atención a `app/` y a los componentes que sus rutas utilizan.

## Relación con este proyecto

Los dos proyectos tienen la misma versión declarada de Next (`15.6.0-canary.60`), React 19, Tailwind 4, Headless UI, Heroicons y la misma organización inicial: `app/search`, `app/product/[handle]`, carrito, componentes de grilla y `lib/shopify` con queries, fragments y mutations.

Esto confirma una **base técnica compartida**. No prueba si uno se creó copiando el otro, ni en qué momento; no se investigó el historial completo de Git. La implementación actual de 22 Recordings ya se separa considerablemente en presentación, branding y datos.

Fuentes: [paquete](<../../../22 Recordings/web/package.json>), [layout](<../../../22 Recordings/web/app/layout.tsx>), [Shopify](<../../../22 Recordings/web/lib/shopify/index.ts>).

## Mapa de rutas

El inventario local contiene **45 archivos `page.tsx`** en `app/`. No son 45 funciones de negocio distintas:

| Grupo                             | Función                                                                  |
| --------------------------------- | ------------------------------------------------------------------------ |
| `/`                               | Catálogo principal, con selección de presentación desktop/móvil.         |
| `/about`                          | Sección editorial del sello.                                             |
| `/contact`                        | Redirige a la versión de contacto del diseño indicado, o a `/1/contact`. |
| `/product/[handle]`               | Producto con shell que conserva el diseño seleccionado.                  |
| `/search`, `/search/[collection]` | Rutas de catálogo heredadas que siguen existiendo.                       |
| `/[page]`                         | Páginas de contenido de Shopify.                                         |
| `/1` … `/8` y sus subrutas        | Comparación de diseños: catálogo, About y contacto.                      |
| `/d1` … `/d5`                     | Alias que redirigen a variantes.                                         |
| `/checkout`                       | Ruta existente que debe evaluarse junto al flujo de checkout Shopify.    |

La separación entre rutas de producto y variantes es útil durante diseño, pero aumenta las combinaciones de navegación. Para Error404 conviene reutilizar componentes y quedarse con URLs públicas definitivas.

Fuentes: [home](<../../../22 Recordings/web/app/page.tsx>), [contacto canónico](<../../../22 Recordings/web/app/contact/page.tsx>), [variante 4](<../../../22 Recordings/web/app/4/page.tsx>), [alias d4](<../../../22 Recordings/web/app/d4/page.tsx>).

## La sección nueva más relevante: About

`app/about/page.tsx` delega en `components/about/page.tsx`. La sección incorpora:

- Texto editorial sobre el sello y su identidad.
- Fotografía, composición de dos columnas y adaptación responsive.
- Cabecera con gran logotipo y navegación Shop/About/Contact.
- Elementos gráficos decorativos separados del contenido, con `aria-hidden`.
- CSS Module propio y recursos tipográficos locales.
- Imagen configurable mediante variables de entorno.

**Acierto de UX:** la tienda gana contexto e identidad. Un visitante puede entender quién publica los discos antes de comprar. El encabezado y las ilustraciones aportan personalidad sin meter las decisiones comerciales dentro del texto.

**Límite editorial:** la mayor parte del texto está escrita directamente en JSX. Cambiarla requiere tocar código; no es todavía una sección administrable. La fotografía por defecto es un placeholder, según la documentación del proyecto. Ni esa foto ni la biografía de 22 Recordings deben trasladarse como contenido de Error404.

**Límite de separación visual:** la documentación dice que el masthead está acotado a About, pero `PreviewHeader` también reutiliza `AboutHeader` en la home y varias rutas de catálogo/contacto, con `artwork={false}`. El componente de About ya funciona parcialmente como cabecera compartida. Antes de copiarlo conviene aclarar qué parte es shell general y qué parte es composición editorial.

Fuentes: [ruta About](<../../../22 Recordings/web/app/about/page.tsx>), [contenido](<../../../22 Recordings/web/components/about/page.tsx>), [cabecera editorial](<../../../22 Recordings/web/components/about/header.tsx>), [selector de cabecera](<../../../22 Recordings/web/components/design-preview/header.tsx>), [notas de About](<../../../22 Recordings/web/docs/ABOUT.md>).

## Catálogo y navegación

La home carga productos y colecciones en el servidor y pasa los datos a `CatalogueView`. No monta dos catálogos ni vuelve a consultar al cambiar de ancho de pantalla. El diseño de producción está centralizado: **desktop 4, móvil 8, breakpoint 640 px**.

El provider usa una pista inicial del user agent y después `matchMedia` mediante `useSyncExternalStore`. El mismo criterio se comparte entre catálogo, cabecera y loading. Es mejor que decisiones de viewport dispersas, pero sigue teniendo coste: una pista inicial incorrecta puede dejar una región vacía hasta hidratar. El propio proyecto lo documenta.

La navegación conserva `q`, `collection` y `sort` en las URLs de categoría. La búsqueda muestra contexto y un enlace para limpiar resultados. Los enlaces de sección indican `aria-current`; el catálogo incluye un salto directo al contenido. Son detalles útiles para una tienda que empieza a tener páginas institucionales.

Hay dos límites importantes en datos y búsquedas:

1. Las consultas de productos y productos de colección piden `first: 100`; no hay recorrido de cursores en esas consultas. No confundir una lista de 100 con un catálogo paginado completo.
2. Cuando hay colección y búsqueda simultáneas, el loader filtra el texto sobre los productos recuperados de la colección. Puede diferir de la búsqueda global de Shopify y no encontrar productos fuera del lote cargado.

Fuentes: [loader](<../../../22 Recordings/web/components/design-preview/page.tsx>), [vista](<../../../22 Recordings/web/components/design-preview/catalogue-view.tsx>), [diseño elegido](<../../../22 Recordings/web/components/storefront/design.ts>), [provider](<../../../22 Recordings/web/components/storefront/design-provider.tsx>), [query de productos](<../../../22 Recordings/web/lib/shopify/queries/product.ts>).

## Datos comerciales y contenido musical

En esta copia, los productos, precios, stock, variantes e imágenes se obtienen de Shopify. Sin configuración suficiente se devuelven estados vacíos/no disponibles; no hay `mock-data.ts` de catálogo equivalente al de Error404.

La capa de fetch distingue token Storefront público/privado, comprueba HTTP y procesa `userErrors` de las mutaciones. Esto representa una mejora frente a limitarse a capturar errores GraphQL de nivel superior. No se verificaron credenciales ni una conexión real durante este análisis.

El tracklist y los detalles del lanzamiento se obtienen de un metafield JSON `custom.release_details`. Un parser valida filas de detalles y tipos de tracks antes de mostrarlos. Así el contenido musical deja de depender de un mapa de handles en el código.

**Para Error404:** este es un buen contrato de transición, pero el editor debería rellenar campos y filas, no escribir JSON manualmente. El parser de 22 no incluye los créditos que sí están modelados en este proyecto; una adaptación necesita preservar distribución, mastering, artwork y producción, además de duración y remix.

El contacto obtiene `shop.contactInformation` y presenta un estado de contenido no disponible si no hay texto. El About, en cambio, sigue siendo código local. Por tanto, todavía hay varias vías de edición: Shopify, JSX y variables de entorno.

Fuentes: [fragment de producto](<../../../22 Recordings/web/lib/shopify/fragments/product.ts>), [parser](<../../../22 Recordings/web/lib/shopify/release-details.ts>), [ficha](<../../../22 Recordings/web/components/product/product-description.tsx>), [contacto](<../../../22 Recordings/web/components/design-preview/route-pages.tsx>), [fetch](<../../../22 Recordings/web/lib/shopify/index.ts>).

## Galería y percepción de carga

La galería añade una vista ampliada con Dialog de Headless UI, navegación por teclado, flechas, zoom y gestos de puntero para desplazamiento/pinch. Al cambiar miniaturas intenta mantener la imagen anterior visible mientras carga la nueva. Hay skeletons por ruta, catálogo, galería, detalle e imagen.

El archivo `components/product/layout.ts` comparte las proporciones entre contenido y placeholder. Esto evita que el skeleton y el producto resuelto inventen dos geometrías diferentes. El header queda fuera de los límites de carga de contenido; el carrito resuelve de forma independiente.

También existe una transición más compleja: `ContentReveal` clona skeletons retirados, los convierte en overlays inertes y los desvanece con Web Animations. Es una solución específica, con MutationObserver y ResizeObserver. Conviene reutilizar primero los placeholders y el layout compartido; importar todo ese mecanismo solo si una prueba visual demuestra que hace falta.

La galería/lightbox tiene animación y lógica de carga extensa. No se ha demostrado ausencia de errores, foco perfecto ni rendimiento en dispositivos móviles. Hay tratamiento de movimiento reducido en varias partes, pero debe comprobarse por flujo, no darse por garantizado para toda animación.

Fuentes: [galería](<../../../22 Recordings/web/components/product/gallery.tsx>), [lightbox](<../../../22 Recordings/web/components/product/lightbox.tsx>), [layout compartido](<../../../22 Recordings/web/components/product/layout.ts>), [imagen con loading](<../../../22 Recordings/web/components/loading/product-image.tsx>), [transición](<../../../22 Recordings/web/components/loading/content-reveal.tsx>), [notas de loading](<../../../22 Recordings/web/docs/LOADING.md>).

## Aspectos a cerrar antes de reutilizar

| Aspecto                | Observación                                                                              | Acción recomendada                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Variantes públicas     | Muchas rutas y `?design=` forman parte de la navegación.                                 | Extraer una presentación definitiva.                                                                               |
| Contacto               | `/contact` termina en una ruta numerada.                                                 | Resolver una ruta canónica sin selector de diseño.                                                                 |
| Preview y SEO          | Varias rutas numeradas declaran noindex; robots general no las excluye.                  | Revisar todas las previews y definir canonical/redirect según destino final. No afirmar que todas están indexadas. |
| Sitemap                | Incluye catálogo y páginas de Shopify; no agrega explícitamente el About local.          | Inventariar también páginas locales y evitar depender solo del CMS.                                                |
| Foco visible           | CSS general de preview elimina outline; hay tratamientos específicos y estilos globales. | Comprobar cada control con teclado antes de portar estilos.                                                        |
| Branding               | Nombre/logos centralizados; algunos textos y gráficos siguen siendo específicos.         | Separar configuración, contenido y arte.                                                                           |
| Estilos                | CSS de preview supera las 2.000 líneas y conserva muchas ramas de variantes.             | Portar reglas seleccionadas y tokens; no la hoja completa.                                                         |
| Productos relacionados | Hay fallback a productos reales si no hay recomendaciones.                               | Mantener enlace y contexto de retorno al catálogo.                                                                 |

Fuentes: [robots](<../../../22 Recordings/web/app/robots.ts>), [sitemap](<../../../22 Recordings/web/app/sitemap.ts>), [CSS preview](<../../../22 Recordings/web/components/design-preview/preview.module.css>), [marca](<../../../22 Recordings/web/lib/brand.ts>), [detalle de producto](<../../../22 Recordings/web/app/product/[handle]/page.tsx>).

## Qué extraería para Error404

1. About como módulo propio con contenido administrable, manteniendo la estética de Error404.
2. Branding centralizado y navegación pública que incluya tienda y sello.
3. Contrato validado de detalles musicales, extendido con créditos y previews reales.
4. Layout compartido con skeletons, estado vacío y errores entendibles.
5. Galería ampliada, adaptada y comprobada, si se quiere inspeccionar portada/label/flyer.
6. Fetch comercial más defensivo y catálogo sin simulaciones en producción.

No extraería las ocho variantes, las URLs numeradas ni la biografía y los recursos gráficos propios de otra marca.
