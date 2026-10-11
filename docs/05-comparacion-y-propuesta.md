# Comparación y propuesta para Error404

Todo lo que se describe como arquitectura, entidad o pantalla futura en este documento es una **propuesta**, no una implementación existente. La elección del proveedor editorial y del despliegue sigue abierta.

## Qué aporta cada proyecto

| Aspecto               | Dashboard de Laura                                    | WordPress de Error404                                    | 22 Recordings                               | Error404 actual                        |
| --------------------- | ----------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------- | -------------------------------------- |
| Papel principal       | Administración editorial                              | Web musical con comercio y plugins                       | Tienda con identidad y variantes de diseño  | Tienda musical                         |
| Shell                 | Sidebar, header, área de trabajo                      | Tema y hooks de WordPress                                | Header y páginas según variante             | Navbar y carrito globales              |
| Contenido propio      | Obras, exhibiciones, medios, About, contacto          | Definiciones de releases, eventos y artistas             | About estático; contacto comercial          | Detalles de cuatro releases en código  |
| Comercio              | Pantallas de productos demo                           | Integración con WooCommerce                              | Shopify                                     | Shopify con fallback local             |
| Medios                | Subida, procesamiento y biblioteca                    | Depende de uploads y plugins ausentes                    | Imágenes remotas, skeletons, lightbox       | Galería y miniaturas                   |
| Música                | Sin modelo de audio observado                         | Tracklist, enlaces externos, audio y playlists previstos | Tracklist desde metafield                   | Tracklist local y player visual        |
| Gestión de acceso     | Firebase Auth y control de cliente; reglas a corregir | Depende de instalación ausente                           | Sin panel propio observado                  | Sin panel propio                       |
| Principal aprendizaje | Formularios y organización editorial                  | Dominio y continuidad del sitio anterior                 | Extender la plantilla sin perder coherencia | Preservar compra y diseño ya trabajado |

La unidad a reutilizar es el patrón o el componente adaptado. El dashboard no aporta gestión comercial real; los temas no aportan una exportación de contenido; las ocho variantes de 22 no constituyen ocho secciones que Error404 necesite.

## Separar sello, catálogo y venta

Un **release** debería poder existir aunque no se venda actualmente. Un **producto** representa lo comprable: precio, moneda, variantes, stock y checkout. Vincular ambos permite archivar música agotada, anunciar un lanzamiento y vender distintos formatos sin duplicar su ficha editorial.

| Dato                                                 | Fuente propuesta                                      | Motivo                                                                   |
| ---------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------ |
| Precio, impuestos aplicables, variantes y stock      | Proveedor comercial, actualmente Shopify              | Mantener coherencia entre tarjeta, carrito y checkout.                   |
| Pedidos, pagos y clientes                            | Proveedor comercial                                   | El panel de referencia no implementa estas funciones.                    |
| Título comercial, imagen y descripción del producto  | Shopify, salvo acuerdo explícito de sincronización    | Evitar dos formularios que sobrescriban el mismo campo.                  |
| Tracklist, créditos, catálogo, sello y fecha musical | Metafields de Shopify o backend editorial; elegir uno | Son datos estructurados, no texto que deba recortarse de la descripción. |
| Releases sin producto, artistas, eventos y páginas   | Backend editorial                                     | No dependen de una operación de compra.                                  |
| Orden de secciones, destacados y navegación          | Configuración editorial                               | Permite cambiar la home sin editar JSX.                                  |
| Archivos y previews                                  | Biblioteca de medios con referencias                  | Facilita reutilización y control de archivos en uso.                     |

Hay dos caminos razonables para los detalles musicales:

1. **Metafields de Shopify**, siguiendo 22: menor número de sistemas si casi todo el catálogo es vendible. El panel propio necesitaría un backend autorizado para escribirlos y validar el esquema.
2. **Entidades editoriales independientes**, vinculadas por ID de producto: mejor para archivo musical, artistas y eventos. Requiere resolver caché, publicación y composición con Shopify.

No conviene mantener permanentemente el objeto local `RELEASE_DETAILS` como tercera fuente. Puede servir como entrada inicial de una migración controlada.

## Modelo editorial mínimo

| Entidad propuesta | Campos y relaciones principales                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Release           | ID estable, slug, artista(s), título, sello, catálogo, formato, país, género/estilos, fecha con precisión, portada, galería, tracks, créditos, enlaces y producto(s) opcionales. |
| Track             | Posición como A1/B2, título, duración opcional, créditos y referencia de preview opcional.                                                                                       |
| Artista           | Nombre, slug, biografía, imágenes, enlaces y releases relacionados.                                                                                                              |
| Evento            | Título, inicio/fin, zona horaria, venue, ciudad, cartel, artistas, enlace de tickets y estado.                                                                                   |
| Página            | Slug, título, bloques de contenido y metadata; inicialmente About y Contact.                                                                                                     |
| Medio             | Tipo, archivo original, derivados, dimensiones/duración, texto alternativo, estado de proceso y referencias de uso.                                                              |
| Sección de inicio | Tipo, título, orden, selección manual o colección, visibilidad.                                                                                                                  |

Los IDs deben sobrevivir a cambios de título y slug. Guardar también `legacyId`/`legacyUrl` cuando se importe WordPress ayuda a reconciliar contenido y generar redirects.

Una fecha conocida solo como «2026» o «diciembre de 2025» debe conservar esa precisión; no inventar un día. Una duración ausente debe seguir ausente. Géneros, estilos y créditos pueden ser listas; los créditos necesitan rol y persona/organización, no únicamente una cadena difícil de editar.

Los campos `status`, `publishedAt`, `updatedAt` y autor de modificación son una propuesta transversal. Un borrador no debería modificar instantáneamente el contenido público. Si se reutilizan listeners de Laura, deberían alimentar el editor; la publicación pública debe consumir una versión publicada o una consulta restringida equivalente.

## Cómo integrar el panel

### Opción A: misma aplicación, layouts separados

Adecuada si se busca compartir tipos, componentes y despliegue inicialmente. Los grupos de rutas permiten conservar las URLs públicas y montar un shell diferente para `/dashboard`.

```text
app/
  layout.tsx                 # providers realmente globales
  (storefront)/
    layout.tsx               # navbar, carrito, footer
    page.tsx
    product/[handle]/page.tsx
    search/...
    releases/...
    artists/...
    events/...
  (admin)/
    layout.tsx               # sesión y shell administrativo
    dashboard/...
    login/...
lib/
  commerce/                  # adaptación al proveedor comercial
  editorial/                 # consultas, validación y publicación
  auth/                      # comprobación de permisos de servidor
```

El árbol es orientativo. No implica mover los archivos ahora. El layout raíz actual necesita simplificarse para que el dashboard no herede Navbar y carrito. Ocultar un enlace con un grupo de rutas no protege datos: cada operación debe comprobar permisos en el servidor o en reglas equivalentes del backend.

### Opción B: aplicación administrativa independiente

Adecuada si interesa aislar dependencias, accesos y despliegues, como en la referencia de Laura. Añade trabajo de configuración, dominios, contratos compartidos y publicación/revalidación entre aplicaciones.

Para este repositorio, comenzaría evaluando **A** por su estructura actual de una sola app. Elegiría **B** si el panel necesita otro ciclo de despliegue, varios sitios o una separación operativa clara. No copiaría el monorepo completo de Laura para obtener únicamente una sidebar.

En ambos casos, Firebase es una opción disponible en la referencia, no un requisito deducido de su apariencia. La decisión debe incluir coste operativo, permisos, medios, consultas y facilidad de edición.

## Navegación y tareas del panel

La sidebar inicial puede agrupar **Catálogo** (releases y artistas), **Web** (inicio, páginas y eventos) y **Biblioteca** (medios). Configuración y usuarios quedan en un área secundaria. No hace falta abrir con gráficos de ventas sin una fuente real.

| Tarea                | Flujo recomendado                                                          | Feedback necesario                                                                |
| -------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Crear release        | Datos → portada → tracks/créditos → vincular producto → preview → publicar | Campos obligatorios claros, errores junto al campo y confirmación de publicación. |
| Ordenar home         | Seleccionar sección → ordenar elementos → revisar → guardar                | Alternativa al drag, estado pendiente y rollback si falla.                        |
| Subir medios         | Seleccionar archivos → progreso → procesamiento → disponibilidad           | Error por archivo, reintento y distinción entre subido y listo.                   |
| Editar página        | Formulario → preview → guardar borrador/publicar                           | Cambios sin guardar, fecha de guardado y salida protegida.                        |
| Archivar medio       | Mostrar dónde se usa → quitar vínculos o cancelar → archivar               | No romper portadas ni previews existentes.                                        |
| Administrar comercio | Abrir proveedor o pantalla conectada a su API                              | Evitar controles que simulen guardar productos.                                   |

De Laura reutilizaría el patrón de formulario con estado dirty, mensajes de guardado, biblioteca y selección de medios, sidebar móvil y organización por filas. Antes de portarlos, simplificaría módulos y resolvería sus reglas de acceso, borradores, referencias y recuperación ante errores.

## UX pública propuesta

La tienda y el sello pueden convivir sin obligar a que cada página termine en un botón de compra. Una navegación candidata es **Shop / Releases / Artists / Events / About**, con contacto y enlaces externos en footer. El número final depende del contenido disponible; no abrir secciones vacías.

El detalle comercial debe preservar la jerarquía actual: imagen, identificación, precio, compra, descripción, tracks, escucha y detalles. La información editorial extensa puede vivir en el release enlazado, evitando repetir bloques inconsistentes.

Para escucha real, el control debe mostrar carga, reproducción/pausa, progreso y fallo; ofrecer una acción disponible solo cuando hay archivo o enlace válido. Se necesita decidir si se escucha un preview por track o un reproductor del release. Los botones visuales actuales no deben presentarse como una integración de audio terminada.

La referencia About de 22 sirve para composición e identidad. El contenido debe ser propio de Error404 y editable si se incorpora al panel. La galería con lightbox y los skeletons son mejoras opcionales, sujetas a prueba móvil; no es necesario importar todo el sistema de variantes para obtenerlas.

## Prioridad recomendada

1. Confirmar contenido real de WordPress, integración comercial y alcance del panel.
2. Definir propiedad de campos, entidades e IDs.
3. Construir acceso y publicación, con un único flujo completo de release.
4. Incorporar medios y previews reales.
5. Añadir páginas de marca, artistas y eventos según inventario.
6. Migrar URLs y contenido, verificar compra y probar uso móvil.

Las fases y criterios de finalización se detallan en [migración y validación](06-migracion-y-validacion.md).
