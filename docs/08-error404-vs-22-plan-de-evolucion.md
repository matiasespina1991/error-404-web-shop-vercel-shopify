# Error404 frente a 22 Recordings: paridad y escalabilidad

Revisión: **11 de octubre de 2026**. Comparación del código local de ambos proyectos, complementada con los informes [22 Recordings](03-22-recordings.md) y [Error404](04-error404-actual.md). Este documento propone cambios; no los implementa ni modifica las referencias. No se consultaron credenciales ni se probaron los sitios en navegador.

## Diagnóstico

Los dos comparten Next, React, Tailwind y la organización inicial de la tienda. **Error404 no necesita rehacerse para alcanzar a 22.** Necesita consolidar datos, completar recorridos y separar responsabilidades.

22 está más desarrollada en identidad editorial, páginas de marca, carga y galería. Error404 tiene adaptaciones musicales propias, créditos estructurados y un patrón móvil de relacionados ya trabajado. La diferencia no se resuelve copiando el diseño de 22: se resuelve incorporando capacidades conservando la identidad de Error404.

22 tampoco es una arquitectura terminada para un catálogo grande o un panel editorial. Conserva numerosas variantes públicas, CSS de exploración y límites de consulta. Ninguna de las dos bases demuestra por sí sola capacidad bajo tráfico elevado; eso requiere medición.

## Comparación directa

| Área                  | Error404 hoy                                                    | 22 hoy                                                               | Qué haría en Error404                                                              |
| --------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Marca                 | Nombre entre env y textos locales; logo en componentes          | Configuración `brand` centralizada, con textos aún propios en JSX    | Unificar valores públicos de marca y metadata; separar contenido editable.         |
| About                 | Puede mostrar página genérica Shopify; no hay sección propia    | Composición específica, fotos y narrativa en JSX                     | About propio, con contenido editorial y componentes de Error404.                   |
| Contact               | Sin ruta propia                                                 | Contenido Shopify; ruta canónica redirige a variante numerada        | `/contact` definitiva y campos claros: consultas, distribución, redes.             |
| Navegación            | Tienda/colecciones como centro                                  | Shop/About/Contact y shell según diseño                              | Integrar tienda y sello, con enlaces activos y navegación accesible.               |
| Tracklist             | Mapa local por handle                                           | Metafield `custom.release_details` con parser                        | Datos validados y administrables, preservando créditos y fechas parciales.         |
| Clasificación         | Fallback de tags a Accesories                                   | Usa release, tags y `productType`                                    | Categoría explícita, con estado sin clasificar en vez de asignación incorrecta.    |
| Audio                 | Player de apariencia funcional sin audio                        | Ficha revisada sin reproductor de audio                              | Preview real con fuente, carga y errores. Esto supera a ambas bases actuales.      |
| Galería               | Imagen + miniaturas, hasta cinco imágenes en la ruta            | Lightbox, zoom, teclado, gestos y transición de carga                | Portar capacidades seleccionadas y comprobar foco/gestos.                          |
| Loading               | Skeleton de búsqueda y fallbacks parciales                      | Loading por rutas, imágenes y layout compartido                      | Compartir geometría entre skeleton y contenido; errores/vacíos específicos.        |
| Catálogo              | Búsqueda/colección separadas, distinto número de columnas móvil | Loader central y estado `q/collection/sort`                          | Unificar contrato de catálogo y filtros sin perder URLs existentes.                |
| Fetch                 | Errores GraphQL superiores; token público                       | Comprueba HTTP, configuración, tokens público/privado y `userErrors` | Transportar esas mejoras y conservar errores útiles por campo/acción.              |
| Demo                  | Fallback implícito si falta endpoint                            | Vacío/no disponible sin configuración suficiente                     | Demo explícita; producción con error controlado ante mala configuración.           |
| Paginación            | Primeros 100 en listas                                          | Mismo límite; búsqueda de colección filtra un lote                   | Paginación por cursor y búsqueda que no dependa de filtrar resultados incompletos. |
| Precio elegido        | `maxVariantPrice`, sin actualización por selección              | Mismo patrón en la ficha revisada                                    | Precio de variante y CTA posterior a selección cuando sea necesaria.               |
| Edición propia        | Sin panel                                                       | Sin panel propio observado                                           | Dashboard editorial real y autorización efectiva.                                  |
| Complejidad de diseño | Menos rutas y menos variantes                                   | Ocho diseños, aliases y CSS extenso                                  | Una presentación pública y responsive principalmente con CSS.                      |

Fuentes directas: [ficha Error404](../components/product/product-description.tsx), [ficha 22](<../../../22 Recordings/web/components/product/product-description.tsx>), [fetch Error404](../lib/shopify/index.ts), [fetch 22](<../../../22 Recordings/web/lib/shopify/index.ts>), [loader 22](<../../../22 Recordings/web/components/design-preview/page.tsx>), [marca 22](<../../../22 Recordings/web/lib/brand.ts>).

## Qué traer de 22 y cómo

### 1. Configuración de marca

Tomaría la idea de `lib/brand.ts`, con nombre, logos y metadatos públicos en un único lugar. `SITE_NAME` seguiría siendo útil; no debe convertirse en una colección de variables de entorno para cada párrafo de About.

La configuración pública debe ser explícita y nunca incluir tokens. El contenido editable pertenece a la capa editorial; los secretos y el origen comercial a configuración de servidor. Esto evita que cambiar una marca requiera buscar cadenas por todo el repositorio.

### 2. Páginas de marca y navegación

Añadiría About y Contact definitivos. Reutilizaría estructura y patrones responsive de 22, con textos, fotos y componentes propios de Error404. Su About en JSX es una referencia visual, no el destino final de edición.

Conservaría `/search`, `/search/[collection]` y `/product/[handle]` para proteger enlaces existentes. Releases/Artists/Events se sumarían según el contenido de WordPress. Un release editorial podría enlazar a un producto, pero no dependería de estar disponible para comprar.

### 3. Loading y galería

Extraería layout compartido y skeletons antes que animaciones complejas. La carga debe reservar las dimensiones reales, permitir seguir usando navegación y carrito y ofrecer recuperación ante fallo.

De la galería tomaría lightbox, teclado, zoom y mantenimiento de imagen previa mientras carga la siguiente. Se adaptarían al ancho y radio ya trabajados en Error404. Verificaría móvil, Escape, retorno de foco, imágenes ausentes y movimiento reducido.

`ContentReveal` de 22, con clonación de skeletons y observers, quedaría fuera de la primera migración: requiere justificar su coste con una prueba visual. Tampoco copiaría el selector desktop/móvil por user agent; para un diseño definitivo usaría CSS responsive y JS solo donde cambie la interacción.

### 4. Contrato musical validado

El parser del metafield es una mejora sobre el objeto por handle. Lo ampliaría con créditos, IDs estables, versión de esquema y referencias de previews. Validaría al guardar y al leer datos externos; un JSON inválido debe generar un diagnóstico editorial sin romper la compra.

No copiaría el parser tal cual: 22 no modela los créditos completos que Error404 ya tiene. Un cambio de handle tampoco debería desconectar la ficha musical.

Fuentes: [layout compartido](<../../../22 Recordings/web/components/product/layout.ts>), [lightbox](<../../../22 Recordings/web/components/product/lightbox.tsx>), [parser](<../../../22 Recordings/web/lib/shopify/release-details.ts>), [datos de Error404](../lib/shopify/release-details.ts).

## Estructura que recomiendo

Mantendría **una aplicación modular**, con layouts público y administrativo separados. Eso permite compartir tipos y validación sin sumar despliegues y coordinación innecesarios al inicio.

El siguiente árbol es un destino orientativo, no una instrucción de mover todo de golpe:

```text
app/
  layout.tsx                    # estilos y providers realmente globales
  (storefront)/
    layout.tsx                  # navbar, carrito, footer
    page.tsx
    search/...
    product/[handle]/...
    about/...
    contact/...
    releases/[slug]/...          # archivo editorial
    artists/[slug]/...
    events/...
    [page]/...
  (admin)/
    layout.tsx                  # sesión y shell propio
    dashboard/
      releases/...
      artists/...
      events/...
      pages/...
      media/...
      settings/...
  api/
    revalidate/...
features/
  catalogue/                    # queries de aplicación y presentación
  product/                      # galería, selección y ficha
  cart/                         # UI, acciones y estado
  releases/                     # tracks, créditos, previews y formularios
  artists/
  events/
  pages/
  media/
components/
  ui/                           # controles compartidos y accesibles
  layout/                       # shells y navegación
domain/
  commerce.ts                   # tipos internos de venta
  editorial.ts                  # tipos internos de contenido
  validation/                   # contratos versionados
lib/
  shopify/                      # transporte y mapeo del proveedor comercial
  editorial/                    # adaptación al backend editorial elegido
  auth/                         # sesión y autorización de servidor
  config/                       # marca pública y configuración de servidor
  cache/                        # tags y política de publicación
fixtures/                       # datos demo y pruebas; activación explícita
docs/
```

Las rutas componen páginas; los módulos contienen comportamiento; los adaptadores conocen los proveedores. Un componente de tracklist no debería importar directamente Firestore o consultar Shopify.

El root actual monta Navbar y CartProvider: hay que mover ese shell al layout público antes de agregar el panel. Los grupos de rutas no cambian las URLs. Al mover archivos, comprobar metadata, loading, errores y no duplicar footer/main.

No crearía microservicios, monorepo ni un paquete compartido con 22 inicialmente. Extraería paquetes solo si hay mantenimiento conjunto real y contratos estables. Dos marcas parecidas no requieren una plataforma de temas con ocho variantes.

## Datos: la decisión que más afecta a la escalabilidad

### Comercio como fuente única

Mantendría Shopify para precios, moneda, variantes, inventario, carrito, checkout y pedidos. El panel puede abrir esas tareas en Shopify; si más adelante las integra, sus escrituras pasan por un backend autorizado, nunca por credenciales administrativas expuestas al navegador.

### Editorial como fuente única

Para el alcance ya planteado —panel y sustitución de WordPress— recomiendo una entidad Release independiente, junto a Artist, Event, Page y Media. Los detalles musicales serían responsabilidad editorial; cada release tendría vínculos opcionales con productos mediante sus IDs, no exclusivamente handles.

El proveedor editorial está pendiente. Firebase es una opción por la referencia disponible, pero no debe elegirse solo por reutilizar su sidebar. Cualquiera debe cubrir permisos efectivos, borradores, consultas paginadas, medios y publicación.

### ¿Metafields como 22 o backend editorial?

| Alternativa                       | Cuándo tiene sentido                                             | Coste futuro                                                                                |
| --------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Detalles en metafields Shopify    | Se busca paridad rápida y casi todos los releases son productos. | Para archivo sin venta, relaciones y panel más rico habrá que ampliar el modelo o migrarlo. |
| Detalles en entidades editoriales | Se ejecuta el alcance de sello + WordPress + dashboard.          | Mayor preparación inicial; permite archivo y publicación separados del comercio.            |

Recomiendo la segunda para el objetivo completo. **No haría obligatoriamente dos migraciones**, primero a metafields y luego a otro backend. El contrato de 22 sirve de referencia e importación aunque Shopify no sea el destino final de los detalles.

Si se decide empezar por metafields, dejaría esa decisión explícita y mantendría el mismo contrato interno. El frontend consumiría `Release` desde un adaptador; así un cambio de almacenamiento no obliga a cambiar la galería, los tracks y cada ruta.

No permitiría que los mismos créditos se editen simultáneamente en Shopify, en el panel y en TypeScript. Una eventual copia al proveedor sería una proyección de solo lectura para otros consumidores, con dueño y sincronización definidos.

## Migraciones que haría

### Fase 1 · Estabilizar la base comercial

- Configuración validada de servidor y modo demo explícito; producción no cae silenciosamente en mocks.
- Fetch con HTTP, errores GraphQL y `userErrors`, conservando motivos útiles para UI y registros.
- Precio de variante, instrucciones de selección y errores visibles de carrito.
- Contrato de checkout que diferencie demo, carrito expirado y fallo real.
- Verificación de compatibilidad antes de cambiar versión de Next o endpoint comercial; actualizar por separado de la migración editorial.

**Cierre:** comprar una variante disponible funciona y los errores se recuperan sin mostrar éxito falso. El checkout de producción no deriva a demo.

### Fase 2 · Separar estructura conservando URLs

Mover shell al grupo público, crear límites de módulos y centralizar marca/tema. Separar transporte, consultas, transformación y revalidación sin cambiar inicialmente sus respuestas.

**Cierre:** home, categoría, producto y carrito conservan comportamiento y URLs; el panel puede tener layout propio. No migrar una carpeta solo por estética si aún no hay una responsabilidad clara.

### Fase 3 · Migrar las cuatro fichas musicales

1. Definir contrato versionado con tracks, créditos, identificadores, fechas parciales y previews opcionales.
2. Mapear cada handle actual a un ID editorial y, cuando exista, al ID de producto real. No asumir que IDs mock son IDs de Shopify.
3. Exportar las cuatro entradas locales como datos de importación y validar que no se pierde ningún campo.
4. Hacer un ensayo idempotente: IDs de origen, informe por registro y comparación de contenido.
5. Cambiar lectura al nuevo adaptador. Un fallback temporal, si hace falta, distingue ausencia de dato de dato inválido y tiene fecha de retirada.
6. Retirar el mapa de producción al verificar las cuatro fichas; mantener fixtures solo para desarrollo/pruebas.

Si el destino es un backend editorial, esta fase incluye su persistencia y acceso autorizado para importar. No se habilitan escrituras públicas mientras se construye el panel de la fase 6.

**Cierre:** editar título o handle comercial no elimina tracks; las cuatro fichas preservan créditos y precisión de fechas. La decisión de mostrar créditos se toma expresamente, porque hoy el render está comentado.

### Fase 4 · Alcanzar las mejoras públicas de 22

About y Contact definitivos, navegación completa, lightbox, skeletons con layout compartido y controles de filtros accesibles. Unificar el estado del catálogo sin traer URLs de variantes.

**Cierre:** la navegación es coherente, las imágenes lentas tienen feedback y cada sección tiene vacío/error/carga. El estilo sigue siendo de Error404.

### Fase 5 · Escalar catálogo y publicación

Paginación por cursor con `pageInfo`, filtros coherentes y consultas ligeras para tarjetas. El listado no necesita descargar la misma cantidad de imágenes y variantes que la ficha completa.

Crear queries separadas de listado y detalle. El sitemap recorre sus lotes fuera del recorrido interactivo; el usuario recibe páginas acotadas. No resolver la paginación descargando todo el catálogo para filtrarlo en el navegador.

Definir tags por entidad y listas afectadas, publicación que invalida detalle + listados + sitemap cuando corresponda, y un mecanismo verificable de reintento si falla la revalidación. El carrito permanece privado y separado de caché pública.

**Cierre:** un producto fuera de los primeros 100 es encontrable y navegable; publicar actualiza los destinos necesarios sin vaciar indiscriminadamente toda la caché.

### Fase 6 · Panel, medios y WordPress

Incorporar el panel editorial con permisos en backend y flujo guardar borrador → previsualizar → publicar. El primer recorrido completo sería un release; después páginas, artistas y eventos según inventario.

Biblioteca paginada, cargas con concurrencia limitada, estado de procesamiento y referencias de uso. Audio necesita pipeline y playback propios: el módulo de medios de Laura solo modela imágenes/vídeo. Evitar que borrar una portada rompa fichas relacionadas.

Importar WordPress después de conseguir contenido y uploads reales, conservando IDs antiguos y relaciones. Crear mapa de redirects para URLs anteriores y comprobar SEO. No sustituir la web basándose únicamente en los temas disponibles.

**Cierre:** un editor publica un release con medios y lo ve en la web; visitantes no leen borradores ni escriben datos; importar dos veces no duplica registros.

## Mejoras de escalabilidad que aportan valor real

| Dimensión         | Cambio                                                             | Beneficio verificable                                                  |
| ----------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Más catálogo      | Cursores, índices según consultas y queries pequeñas               | Tiempo y payload acotados por página; más de 100 registros accesibles. |
| Más contenido     | IDs estables, relaciones y esquema versionado                      | Cambios de slug o de proveedor sin reescribir fichas.                  |
| Más tráfico       | Caché pública, imágenes dimensionadas y revalidación dirigida      | Menos consultas repetidas; contenido actualizado al publicar.          |
| Más editores      | Roles efectivos, borradores y control de revisiones                | Evitar sobrescritura silenciosa y publicación accidental.              |
| Más medios        | Biblioteca paginada, derivados, colas/reintentos cuando haga falta | Evitar cargar todo o lanzar subidas ilimitadas.                        |
| Más cambios de UI | Tokens y componentes compartidos                                   | Corregir precio, placa o foco una vez, con variantes explícitas.       |
| Más proveedores   | Adaptadores con tipos internos                                     | Cambiar almacenamiento sin contaminar componentes.                     |
| Más fallos        | Logs estructurados, estados visibles y comprobaciones de servicio  | Saber qué operación falló y cómo recuperarla.                          |

Las colas, buscador externo o separación de aplicaciones se incorporan ante necesidades medidas. No son requisitos iniciales solo por decir «escalabilidad».

Para ediciones simultáneas, añadiría revisión/versionado o comprobación de `updatedAt`, con aviso de conflicto; guardar sin control puede pisar cambios aunque el catálogo tenga pocos registros.

## Validación que justifica cada fase

Pruebas dirigidas al comportamiento: contrato/parser e importación idempotente; permisos permitidos/denegados; variante/precio/carrito; filtros/paginación; borrador/publicación/revalidación. Una prueba de recorrido en móvil y desktop debe cubrir las acciones principales.

Mediría tamaño de consulta de listado frente a detalle, estabilidad de layout, tiempos de catálogo y tasa de errores del carrito antes/después. Lighthouse o pruebas sintéticas sirven de referencia, pero tráfico y errores reales son necesarios para afirmar mejoras de producción.

No convertiría todas las decisiones visuales reversibles en tests. Sí probaría contratos y recorridos cuya rotura pierde datos, impide comprar o publica contenido indebido.

## Orden recomendado para este proyecto

Primero base comercial y separación de layouts/módulos. Después contrato editorial y migración de las cuatro fichas. A continuación mejoras públicas de 22 y paginación. Finalmente panel completo e importación de WordPress, una vez disponible su contenido.

La estructura permite preparar el panel mientras se trabaja en la web; la dependencia importante es acordar los datos antes de construir muchos formularios. El objetivo es una tienda fiable y un sello administrable, con menos variantes técnicas que 22 y un dominio musical más completo.
