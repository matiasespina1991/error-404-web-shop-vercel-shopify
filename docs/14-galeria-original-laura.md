# Galería original de Laura trasladada a Error404

La sección anterior solo reutilizaba primitivas shadcn. Se reemplazó por los componentes completos de `laura-butallo-web/apps/admin-dashboard/src/features/gallery/components/`, copiados al proyecto independiente `../dashboard`.

## Componentes reutilizados

- `media-gallery.tsx`: grilla responsive de 2/4/5 columnas, tarjetas 4:3, carga dentro de la grilla, selección, edición del título, información de subida y lightbox con navegación por flechas y teclado.
- `media-page.tsx`: cabecera, indicador de selección, descarga, confirmación de eliminación y acciones flotantes al salir la barra de pantalla.
- `file-uploader.tsx`: arrastre y selección de archivos, previsualizaciones y progreso de subida.
- `PageContainer`, Heading, Dialog, AlertDialog, ScrollArea, Progress, Sonner y hooks del uploader originales.
- Loader original de la vista ampliada.

Se comprobó mediante el AST de TypeScript que las expresiones de clases de los cuatro componentes principales coinciden con el original: 95 en MediaGallery, 28 en MediaPage, 43 en FileUploader y 13 en PageContainer. Esto verifica la copia de estilos en el código; no sustituye una comparación visual en navegador.

Se añadió `features` a las fuentes de Tailwind y se quitó el padding duplicado del shell en `/media`, para que la sección use el espaciado de su PageContainer original.

## Conexión a Error404

`lib/media-upload.ts`, `lib/gallery-media.ts` y `hooks/use-storage-asset-src.ts` adaptan los componentes originales al esquema `media_assets` y a `/api/media`. No se copiaron configuración, datos o credenciales de Laura ni escrituras directas de cliente a Firestore.

Las imágenes siguen pasando por la API protegida, la validación de origen, el procesamiento WebP y el control de referencias. Las imágenes usadas en contenido no se pueden borrar. La descarga obtiene el archivo WebP real desde la misma API. El nombre original se conserva separado del título editable, incluyendo al renombrar documentos anteriores.

La galería recorre las páginas de la API, se actualiza después de subir/renombrar/eliminar, al recuperar foco y cada 30 segundos. Conserva las imágenes cargadas si una actualización falla.

## Diferencias funcionales respecto de Laura

- La carga permite JPG, PNG y WebP de hasta 3 MB, hasta 10 por lote, acorde al backend existente de Error404. El pipeline de videos/transcodificación de Laura no está conectado; no se anuncia soporte de videos.
- La eliminación usa el control de referencias y borrado de Storage de Error404; no el borrado lógico de la colección `media` de Laura.
- Las actualizaciones usan la API de sesión de Error404, en vez del listener directo de Firestore de Laura.

## Verificación

Compilación de producción correcta en `.next-verification`, separada del servidor de desarrollo, y TypeScript sin errores. Pasan las 16 pruebas, incluidas dos del adaptador de galería. HTTP: login 200, galería sin sesión redirige al login y API de medios sin sesión devuelve 401.

No había navegador conectado para probar las interacciones dentro de la sesión Google ni verificar visualmente la equivalencia. No se alteraron imágenes o contenido publicado para hacer pruebas.
