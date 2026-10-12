# Formularios y texto enriquecido de Laura en Error404

Se reemplazaron los formularios básicos de About, Eventos y Entrevistas del dashboard independiente por la estructura de formularios del dashboard de Laura. La referencia es `laura-butallo-web/apps/admin-dashboard/src/features/about/components/about-form.tsx` y `features/exhibitions/components/exhibition-form.tsx`; Laura no tiene formularios específicos de eventos y entrevistas, por lo que se adaptaron los campos del dominio de Error404.

## Componentes reutilizados

- `FormQuill`: editor Quill 2 original con títulos H1–H6, negrita, cursiva, subrayado, listas, enlaces, imágenes y limpieza de formato; misma toolbar, altura y estilos claros/oscuros. Se carga solo en el navegador, porque Quill requiere DOM.
- `Form`, `FormInput`, `FormTextarea`, `FormSelect` y tipos comunes originales.
- `MediaPickerDialog`: mismo diálogo, tarjetas, selección y paginación; lectura adaptada a la API protegida de Error404.
- Tarjetas de medios y adjuntos reordenables del formulario de exhibiciones, junto al uploader copiado previamente.
- `PageContainer`, estructura Card/Header/Content y distribución de contenido e imágenes 3:1 del original.

Se comprobó por AST que las expresiones de clases de Quill, FormInput, FormTextarea y MediaPickerDialog coinciden con el código de Laura. Esto demuestra que se reutilizaron sus estilos; no equivale a una validación visual en navegador.

## Adaptaciones

About mantiene título, introducción, contenido, imagen, descripción de imagen y SEO. Eventos mantiene fechas, zona horaria, sala, dirección, artistas, entradas y contacto. Entrevistas mantiene artista, entrevistador, categoría y fecha. Los campos de fecha permiten elegir día y hora, convirtiendo a UTC según la zona indicada; se rechazan horas inexistentes durante cambios de horario.

Los listados usan la cabecera y PageContainer del template, con botón Agregar y diálogo para elegir la URL y abrir el editor. Se mantiene el contrato de URL estable existente.

Los formularios permiten elegir o subir imágenes directamente. La galería de cada entrada se reordena por arrastre y teclado. Las imágenes insertadas dentro del texto usan el mismo selector de la biblioteca. Se conservan las acciones de borrador, publicación, retirada y vista previa de Error404, con aviso de cambios sin guardar y Deshacer.

## Guardado y compatibilidad

El campo opcional `bodyFormat: "html"` distingue texto enriquecido del texto plano anterior. El contenido existente sigue leyéndose como texto; al abrirlo en el editor se transforma a párrafos escapados y solo se guarda en HTML cuando el usuario guarda o publica. No se ejecutó una migración ni se reescribieron contenidos de Firebase.

La API sanitiza el HTML conservando los formatos de Quill y elimina scripts, eventos, iframes y fuentes de imagen ajenas a `/api/media/<id>`. El texto HTML admite hasta 120.000 caracteres de marcado, con cuerpo de solicitud limitado a 600 KB; el contrato antiguo de texto plano conserva su límite de 30.000 caracteres.

Las imágenes insertadas en el cuerpo participan en las referencias transaccionales de borrador y publicación, al igual que portada y galería: se comprueba que existan y estén disponibles, no se pueden borrar mientras estén en uso y solo son públicas cuando están publicadas. La web transforma sus URLs relativas al origen del dashboard al renderizar. Las vistas previas privadas y las páginas públicas muestran los mismos formatos.

El importador de contenido local se adaptó para resolver los nuevos módulos compartidos al transpilar a su carpeta temporal.

## Verificación

- 22 pruebas correctas, incluidas conservación de formatos, filtrado de HTML, compatibilidad del texto anterior, referencias de imágenes insertadas y fechas con horario de verano/invierno.
- TypeScript correcto en ambos proyectos y compilaciones de producción correctas en `.next-verification`, sin reemplazar la carpeta del servidor de desarrollo.
- No se probaron las interacciones autenticadas visualmente: no había un navegador conectado. No se agregaron excepciones de autenticación para probarlas.
- Comprobación HTTP de la versión compilada: listados y páginas de Eventos y Entrevistas y About responden 200; las secciones protegidas del dashboard redirigen al login sin sesión. La API pública sigue sirviendo el registro existente desde Firebase.
- El importador, en simulación, conserva los nueve registros existentes y no tiene entradas pendientes.
