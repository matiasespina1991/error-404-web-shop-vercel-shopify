# Releases: web y dashboard

Implementación: 15 de octubre de 2026. Releases es contenido administrado en Firebase, separado de los productos y el carrito Shopify.

## Rutas

- Web: `/releases`, `/releases/[slug]`; carousel Releases antes de Shop en el home; link en navegación desktop/móvil.
- Dashboard: `/releases`, `/releases/[slug]`, `/releases/[slug]/preview`.
- Creación directa: `/releases/new` abre el formulario sin pedir URL. El primer guardado usa `POST /api/content/releases`; el servidor genera el slug desde el título y agrega un ID si ya existe. La comprobación y creación son transaccionales, sin sobrescribir el registro original. Después de guardar, la URL queda estable. El mismo flujo se aplica a eventos y entrevistas.
- API: los endpoints genéricos `/api/content/[kind]` y `/api/content/[kind]/[slug]` admiten `kind=releases`.
- Firestore: `content_releases` para borrador/publicación y `published_releases` para el feed público. Las colecciones se crean al guardar/publicar el primer release; no hay un seed automático.

## Modelo

Comparte título, resumen, contenido enriquecido, portada, galería, alt y SEO con eventos/entrevistas. Añade `genres: string[]`, `purchaseUrl`, `format` y `tracks`.

Formatos: `vinyl`, `cassette`, `cd`, `digital`, `other`. Vinyl y cassette usan posiciones alfanuméricas editables (`A1`, `A2`, `B1`); el resto usa numeración consecutiva automática desde 1. Se conserva el orden de la lista, con botones para subir/bajar y quitar tracks. Cambiar de formato numera según el formato elegido. No hay fecha de salida en esta versión: el último pedido reemplazó la lista inicial de campos. El feed ordena por fecha de publicación del documento.

Cada track tiene `{position, title, audio}`. El dropdown de preescucha guarda:

```ts
type TrackAudio =
  | { type: "none" }
  | { type: "external"; url: string }
  | { type: "gallery"; mediaId: null };
```

**Link Externo** necesita una URL HTTPS directa a audio compatible con el navegador, por ejemplo MP3. No admite páginas de Spotify/YouTube/SoundCloud como si fueran archivos. El navegador descarga/reproduce el audio del proveedor: debe permitir acceso y servir un formato válido; URLs firmadas que caducan dejarán de reproducirse. No se descargan archivos externos en el servidor para validarlos.

**Audio desde Galería** es una plantilla explícita, sin selector ni upload funcional. Guarda `mediaId: null` y se publica sin reproductor. La API rechaza IDs simulados: la futura biblioteca debe implementar subida, tipos, permisos y referencias antes de permitir un ID real. La galería actual continúa siendo exclusivamente de imágenes.

El frontend usa controles nativos de audio con `preload="none"`, sin autoplay. Permite pausa, seek y volumen según navegador. Al reproducir un track se pausan los demás del mismo tracklist; un fallo de audio muestra un aviso. Los tracks sin audio conservan posición y título.

## Publicación y seguridad

Se mantienen sesiones, Origin, revisión concurrente, borradores, preview privado, publicación/retirada y referencias transaccionales de imágenes. Para publicar se requieren los campos comunes y al menos un track con título. Géneros y descripciones de imágenes son opcionales; si falta la descripción, se usa el título del contenido como alternativa. Máximo 20 géneros, 60 tracks, posiciones únicas. Los enlaces activos y URLs con credenciales se rechazan. El link de compra es opcional; no crea un producto Shopify.

`lib/content/releases.ts` y `entries.ts` están replicados en ambas apps: actualizar y probar juntos. La futura referencia a audio de galería también deberá participar en las transacciones de referencias y en la protección del endpoint de medios.

## Despliegue y validación

Hay que desplegar ambos repositorios. El dashboard publicado anterior no conoce `releases`; la web tolera un 404 del nuevo feed como lista vacía durante el despliegue. Los errores de red/500 no se ocultan. Una instalación sin releases muestra “New releases coming soon.”; no se inventan discos ni se publican mocks como releases.

Pruebas agregadas en `dashboard/tests/releases.test.ts`: publicación incompleta, géneros y descripciones opcionales, formatos y orden, URLs inseguras, placeholder de galería, aislamiento draft/publicado, conflictos de revisión, referencias y búsqueda por tracks/géneros. La suite completa pasó con 29 tests y ambos builds de producción terminaron correctamente. Se comprobaron lecturas públicas y rechazos 401/403 de los endpoints sin modificar datos Firebase; home y listado respondieron correctamente. Un detalle inexistente muestra not-found y noindex; con streaming Next puede devolver HTTP 200 aunque el estado visual sea not-found.

No hubo navegador conectado para comprobar la apariencia, interactuar con un usuario autenticado o escuchar un archivo concreto. La reproducción efectiva depende del audio externo que se configure.
