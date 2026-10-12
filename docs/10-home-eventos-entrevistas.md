# Home, eventos y entrevistas

Implementación: 11 de octubre de 2026. Mantiene dos proyectos y dos despliegues. Shopify continúa como fuente de discos, precios y stock. Firebase pertenece al dashboard; la web pública consume su API publicada sin credenciales de administración.

## Páginas

| Ruta pública         | Función                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `/`                  | Nuevo home: presentación, próximo evento, carrusel de novedades de discos, carrusel de entrevistas y próximos eventos. |
| `/shop`              | Catálogo con filtros de colección y orden; muestra All por defecto.                                                    |
| `/events`            | Próximos eventos y archivo con fecha, cartel, artistas, ciudad, sala y estado de entradas.                             |
| `/events/[slug]`     | Ficha de evento, entradas, información práctica, descripción y galería.                                                |
| `/interviews`        | Listado de conversaciones.                                                                                             |
| `/interviews/[slug]` | Entrevista con artista, autor, fecha, imagen, texto y galería.                                                         |

Los carruseles admiten desplazamiento táctil, teclado y botones anterior/siguiente. No giran automáticamente; los botones respetan movimiento reducido y se desactivan en los extremos. La siguiente tarjeta queda parcialmente visible. Hay un fade derecho y espacio final para no tapar el último elemento. El número de tarjetas visibles cambia con el ancho de pantalla.

Los discos se obtienen de la colección Shopify `releases`, ordenada por creación descendente. Si se quiere una selección de primicias curada en lugar de novedades automáticas, el siguiente paso sería una colección específica administrada desde Shopify. El dashboard no edita productos.

## Referencia WordPress

Se revisaron estos archivos locales de Soundkraft Child:

- `templates/components/event/display/content-list.php`.
- `templates/components/event/content-single.php`.
- `inc/frontend/hooks/event.php`.
- `inc/theme-functions/post-types/event.php`.

La estructura observada es listado cronológico → ficha individual. La ficha dispone de cartel, artistas, fecha inicial/final, ubicación, entradas, mapa, datos prácticos y descripción. Wolf Events contempla disponible, gratis, agotado y cancelado. La nueva implementación conserva ese modelo y esos estados. Usa un enlace a indicaciones en lugar de un iframe arbitrario.

La carpeta WordPress contiene temas, no la base de datos ni los carteles originales. Se ha reproducido la estructura del tema, no migrado eventos reales ni reconstruido una página publicada de Elementor. No se añadieron páginas de taxonomía de artista ni integraciones Bandsintown.

## Modelo del evento

- Identidad: `kind`, `slug` estable, título, resumen, texto y descripción SEO.
- Imágenes: portada y hasta doce imágenes de galería, cada una con ID de biblioteca y texto alternativo.
- Fecha: inicio y fin ISO con zona explícita; se normalizan a UTC. `timeZone` IANA determina su presentación, por ejemplo `Europe/Madrid`.
- Lugar: sala, dirección, ciudad, provincia/región, código postal y país.
- Programación: tipo de evento y line-up ordenado.
- Entradas: disponible/gratis/agotado/cancelado, enlace HTTPS y texto de precio.
- Contacto: web, Facebook y email opcionales.

Un evento no pasa al archivo hasta que termina; los eventos que siguen en curso permanecen en próximos. La paginación ordena próximos por fecha de finalización ascendente y archivo por finalización descendente, permitiendo una consulta de un solo campo sin índices compuestos adicionales. Las entrevistas se ordenan por su fecha descendente.

En el panel las fechas se introducen como ISO, con ejemplo visible de offset. Todavía no hay selector visual de fechas. El texto se almacena como párrafos simples, no como HTML libre ni un editor visual con bloques.

## Dashboard separado

En el proyecto hermano `../dashboard` hay módulos reales de eventos y entrevistas:

- Listado paginado y creación por URL estable.
- Edición del contenido y selección de imágenes desde la biblioteca existente.
- Guardar borrador, vista previa privada del borrador guardado, publicar y retirar publicación.
- Aviso al salir con cambios sin guardar.
- Revisión para evitar sobrescribir cambios de otra sesión.
- Validación en servidor de fechas, zona, imágenes, textos, enlaces y campos obligatorios.

La preview del panel muestra los datos del borrador; no reproduce exactamente el layout público. Las imágenes se suben en el módulo Imágenes y luego se seleccionan en el editor.

Firestore contiene `content_events` y `content_interviews` con borrador, snapshot publicado, revisión y autor/fecha. `published_events` y `published_interviews` son proyecciones públicas separadas. Su actualización y las referencias de imágenes se escriben en una misma transacción. Publicar habilita los medios utilizados; retirar elimina la referencia pública conservando las del borrador. Las imágenes utilizadas por About u otros contenidos mantienen sus referencias y no se pueden eliminar desde la biblioteca.

La biblioteca y los módulos siguen protegidos por sesión Google y allowlist de servidor. Las reglas existentes deniegan acceso directo desde clientes. No se introdujo acceso público a Firestore ni se incorporó el panel dentro de esta web.

## API y contrato

| Endpoint del dashboard                                     | Acceso                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| `GET /api/content/events?timeline=upcoming\|past&cursor=…` | Solo snapshots publicados, páginas de 24 y cursor.           |
| `GET /api/content/interviews?cursor=…`                     | Solo snapshots publicados, páginas de 24 y cursor.           |
| `GET /api/content/[kind]/[slug]`                           | Snapshot publicado o `null`.                                 |
| `GET /api/content/[kind]?scope=admin&cursor=…`             | Sesión requerida; documentos administrativos paginados.      |
| `PUT /api/content/[kind]/[slug]`                           | Sesión y origen requeridos; contenido, revisión e intención. |

`kind` admite únicamente `events` e `interviews`. Respuestas públicas con `schemaVersion: 1` y origen `firebase` o `mock`. `lib/content/entries.ts` es el contrato validado y está replicado en cada proyecto independiente; hay que actualizar ambas copias al evolucionarlo. No hay imports entre proyectos ni un workspace compartido.

La web usa `DASHBOARD_URL` y lecturas `no-store`. No copia credenciales Firebase. Un fallo del servicio muestra el estado de error y reintento, sin sustituir contenido real por ejemplos. Los listados públicos devuelven actualmente el documento completo, incluido texto; una futura versión del contrato puede ofrecer resúmenes para reducir transferencia cuando haya muchos artículos largos.

La paginación sigue los [cursores de Firestore](https://firebase.google.com/docs/firestore/query-data/query-cursors). No se realizaron consultas o escrituras reales a Firebase durante esta implementación.

## Datos y fotos de ejemplo

Sin `DASHBOARD_URL`, o cuando el dashboard informa que Firebase no está configurado, la web usa `lib/content/mock.ts`: cinco eventos y cuatro entrevistas ficticias. No se insertan documentos de prueba en Firebase. Al conectar Firebase se muestra únicamente contenido publicado, incluso si el listado real está vacío.

Fotos de stock descargadas localmente a `public/demo`, sin dependencia de red para servirlas:

- `club.jpg`: [fotografía de concierto](https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3).
- `studio.jpg`: [fotografía de micrófono](https://images.unsplash.com/photo-1516280440614-37939bbacd81).
- `crowd.jpg`: [fotografía de público](https://images.unsplash.com/photo-1506157786151-b8491531f063).

Son imágenes ilustrativas, no carteles ni retratos de artistas de Error404. Los ejemplos lo indican en pantalla; no llevan enlaces ficticios de compra. Las páginas con contenido de ejemplo se marcan `noindex`. Los ejemplos del archivo tienen fechas fijas, de modo que los próximos pasarán al archivo con el tiempo.

## Cómo verlo

En esta carpeta:

```sh
pnpm dev --port 3001
```

Abrir `http://localhost:3001`, `/events` o `/interviews`. Los ejemplos funcionan sin arrancar el dashboard cuando no hay `DASHBOARD_URL`. Si esa variable está definida, el dashboard debe estar funcionando o hay que quitarla de la configuración local para ver los ejemplos independientes.

Para conectar el panel:

```sh
cd "../dashboard"
pnpm dev
```

Configurar su Firebase siguiendo su README y usar `DASHBOARD_URL=http://localhost:3002` en la web. El acceso sigue requiriendo la configuración real y una cuenta autorizada; no hay bypass de login para la preview.

## Validación y pendientes

Ambos proyectos compilan y pasan TypeScript. Catorce pruebas del dashboard cubren validación de contenido, fechas, URLs, publicación, conflictos y referencias. Se probaron 32 solicitudes HTTP en servidores temporales: páginas públicas, archivo, fichas, estados de entradas, tienda, redirección a login y APIs protegidas.

Las fichas inexistentes muestran la página de no encontrado y `noindex`. Con el streaming/PPR de Next, el HTML ya iniciado puede llevar HTTP 200 aunque la ficha renderizada sea de no encontrado; no se comprobó un 404 HTTP antes de streaming.

No había navegador conectado: falta verificación visual e interacción táctil real. Faltan también pruebas de login, carga de imágenes y edición/publicación con Firebase configurado. No se cambiaron credenciales, DNS ni hosting y no se publicó la web.

## Actualización del shop

El header muestra Home, Shop, Events, Interviews y About. Releases, Merch y Accessories son filtros dentro de `/shop`, con sus rutas `/shop/[collection]`; no enlaces separados del header. El catálogo All reutiliza la misma grilla y los mismos controles que el listado por colección. Las rutas `/search` se conservan para búsquedas y enlaces anteriores.

Se mantiene el proveedor existente de `lib/shopify`: mock local si no hay dominio configurado, Shopify cuando esté configurado. No se añadió ni se requiere una variable `useMockShop` en esta implementación.

## Home simplificado y newsletter

Se retiró el bloque inicial de presentación y evento destacado. El home comienza directamente con novedades de discos, seguido de entrevistas, eventos y un bloque de newsletter antes del footer. Los carruseles de discos y entrevistas usan tarjetas compactas: hasta cinco completas desde 1024 px, cuatro desde 768 px, tres desde 640 px y dos con una parte de la siguiente en móvil. Eventos conserva su lista de filas, precedida por la imagen del próximo evento no cancelado (máximo 340 px de ancho y 420 px de alto, sin recorte). Usa la portada del evento, que por ahora es una foto de ejemplo; al cargar un flyer desde el dashboard aparecerá en ese lugar. Se redujeron los espacios entre secciones y sus cabeceras.

El newsletter tiene disposición vertical centrada: título y texto, campo de email y botón Subscribe, apilados en todos los anchos. Por ahora es una interfaz preparada: no hay proveedor de suscripción conectado, no se guardan emails ni se envían mensajes. La pantalla indica que la suscripción todavía no está disponible y nunca muestra una confirmación falsa. El proveedor se elegirá al conectar el servicio real.

## Tipografía de títulos

Microgramma W04 Medium Extended se carga localmente mediante `next/font/local`, desde `fonts/microgramma-medium-extended.otf` (copia del archivo proporcionado en `input`). El componente `BrandHeading` aplica directamente la familia generada por `next/font`, además de la variable `--font-microgramma` y las clases `section-title` / `content-title`. Se usa peso 500, sin negrita sintética, con swap.

Los títulos de sección del home usan 20–26 px y el título del newsletter 24–30 px; los títulos de About, Events, Interviews y sus fichas usan 24–32 px, según el ancho. Estos títulos siempre tienen `letter-spacing: 0.03em`. El bloque de novedades del home se llama Releases. Los textos y las tarjetas de productos conservan su tipografía de lectura.
