# Eventos y entrevistas locales migrados a Firebase

Se importaron al proyecto `error-404-9a984` los mismos ejemplos que existían en `lib/content/mock.ts`:

- 5 eventos: Error404 Night / 01, The Listening Room, After Hours / 02, Summer Sessions y Club Session / 03.
- 4 entrevistas: Inside the studio, The records that stay with us, A shared frequency y After the last track.
- 3 fotos: club, studio y crowd, procesadas como WebP con miniaturas.

Las entradas tienen borrador y copia publicada en sus colecciones correspondientes. Las imágenes se registran en `media_assets` y se guardan en Storage con referencias de borrador y publicación, por lo que pueden editarse desde el panel y no eliminarse mientras estén en uso. Se conservaron los textos, fechas, estados, slugs y descripciones de los ejemplos.

La web ya usa `DASHBOARD_URL=http://localhost:3002`; home, listados, archivo y fichas consultan el dashboard, que lee Firebase. Las imágenes también se sirven desde Storage mediante `/api/media`. El mock local sigue disponible para desarrollo sin dashboard configurado; no se usa en la configuración actual.

## Crear contenido

En `http://localhost:3002`, iniciar sesión con la cuenta autorizada. Entrar en Eventos o Entrevistas, escribir la URL y pulsar Crear evento o Crear entrevista. Completar los campos y elegir una imagen de Galería. Guardar borrador conserva el contenido en el panel; Publicar lo muestra en la web. El evento debe tener inicio, fin, sala, ciudad, país y line-up; la entrevista necesita artista y fecha, además del contenido e imagen principal requeridos para ambos tipos.

## Script y verificación

`../dashboard/scripts/import-local-content.cjs` permite simular o aplicar la importación con `--apply`. Valida con el contrato existente, conserva entradas ya creadas, usa IDs estables para medios y publica entradas y referencias mediante transacción. No incorpora credenciales al código. Una segunda simulación confirmó que no quedan entradas pendientes y que las nueve existentes se conservan.

Las APIs públicas devolvieron `source: firebase`: 4 eventos próximos, 1 pasado y 4 entrevistas. Se comprobaron las nueve fichas y sus imágenes públicas. Se verificaron HTTP 200 y referencias de imágenes de Firebase en home, Events, Archive, Interviews y una ficha de cada tipo, sin URLs locales `/demo/` en esas páginas.

TypeScript del dashboard pasó. La creación/publicación conserva los formularios, validación y sesión existentes; no se hizo una prueba interactiva de creación desde un navegador con sesión Google.
