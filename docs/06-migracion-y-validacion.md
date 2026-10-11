# Migración y validación

Este documento propone un orden de ejecución. No se ha realizado ninguna migración, creado infraestructura, cambiado permisos ni conectado una cuenta durante el análisis.

## 1. Recuperar el inventario real

Los temas de WordPress permiten identificar capacidades, pero no el contenido publicado. Antes de sustituir la web hacen falta exportaciones autorizadas de contenido y medios, y un inventario de las URLs públicas.

| Material                                                 | Qué permite resolver                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Exportación WordPress con tipos, taxonomías y metadatos  | Páginas, releases, artistas, eventos y sus relaciones.                           |
| Biblioteca de uploads y relación de adjuntos             | Portadas, carteles, galerías, audio y referencias internas.                      |
| Configuración/exportación de Elementor y plugins activos | Composición real de páginas, shortcodes y dependencias.                          |
| Exportación comercial pertinente                         | Productos, variantes, stock y estado de migración WooCommerce → proveedor nuevo. |
| Menús y listado de URLs actuales                         | Navegación, destinos de enlaces y redirects.                                     |
| Acceso de lectura a los entornos necesarios              | Confirmar qué se usa realmente, sin inferirlo del tema.                          |

No es necesario trasladar tablas o código de plugins indiscriminadamente. Es necesario identificar el significado de los datos y conservar lo que siga siendo parte de Error404. Los datos personales y el historial de pedidos requieren un alcance específico, separado del inventario editorial.

**Criterio de cierre:** cada tipo de contenido tiene cantidad conocida, ejemplo representativo, origen y destino previstos. Las funciones que se retiran quedan identificadas explícitamente.

## 2. Resolver propiedad de datos y contratos

| Origen observado                            | Destino candidato                              | Precaución                                                   |
| ------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| WordPress `release` y metadatos Wolf        | Release editorial o producto con metafields    | Mantener releases sin stock y enlaces externos.              |
| Taxonomías band/label/release_genre         | Relaciones de artista/sello y listas de género | Conciliar duplicados; no convertir todo a texto plano.       |
| Tracklist y audio/playlist del tema         | Tracks y medios de audio o enlaces             | El plugin real puede serializar datos de otra forma.         |
| `event` y metadatos de fechas/venue/tickets | Evento editorial                               | Conservar cancelado, agotado, gratuito y zona horaria.       |
| `artist` y enlaces sociales                 | Artista editorial                              | Revisar imágenes, biografía y relaciones.                    |
| Contenido de Elementor/shortcodes           | Bloques propios de páginas                     | Los shortcodes no se renderizan solos en Next.               |
| WooCommerce                                 | Shopify si se confirma como destino            | Reconciliar productos/variantes; no asumir pedidos migrados. |
| `RELEASE_DETAILS` del repositorio actual    | Datos estructurados del destino elegido        | Usar IDs estables; conservar fechas parciales y créditos.    |
| About/contacto hardcodeados                 | Páginas/configuración editorial                | No copiar contenido de Laura o de 22.                        |

El contrato debe especificar campos requeridos, valores opcionales, formato de tracklist, medios válidos y reglas de publicación. Si se elige el JSON de 22 como base, hay que ampliarlo o adaptarlo para los créditos que Error404 ya tiene.

**Criterio de cierre:** una ficha real de cada tipo puede representarse sin perder información relevante. Está claro qué pantalla/proveedor modifica cada campo.

## 3. Preparar acceso, borradores y medios

Antes de permitir escrituras, configurar permisos efectivos del backend. El filtro de navegación y AuthGate de Laura no sustituyen esa capa.

- Usuarios sin sesión: solo contenido publicado y archivos destinados al público.
- Editor: edición de los módulos permitidos; publicación según política elegida.
- Administrador: configuración y usuarios, si se necesita ese rol.
- Acciones sensibles: comprobar permisos también en funciones y endpoints.

Las reglas deben probarse con casos permitidos y denegados, especialmente las escrituras anónimas y el acceso a borradores. No reutilizar la función de migración de Laura sin autorización e idempotencia.

Para medios, definir límites de tipo/tamaño, estado de procesamiento, alt y referencias de uso. Un archivo que aún se procesa no puede convertirse silenciosamente en una portada rota. El borrado debe considerar releases, páginas y eventos, no solo un vínculo de mediaset.

**Criterio de cierre:** un editor puede trabajar con borradores y publicar, un visitante no puede leerlos ni modificarlos, y un error de subida tiene recuperación clara.

## 4. Implementar un recorrido completo

El primer recorrido sugerido es crear o editar **un release real**: portada → metadata → tracks → preview → vínculo comercial → publicación → ficha pública. Esto verifica arquitectura, permisos, medios y caché antes de multiplicar formularios.

Después, añadir organización de inicio, páginas de marca y los tipos editoriales que el inventario confirme. El dashboard inicial puede abrir directamente en Releases; no necesita KPIs decorativos.

**Criterio de cierre:** guardar no equivale solo a mostrar un toast. El cambio persiste, una nueva sesión lo recupera y el contenido publicado aparece en la web tras la revalidación prevista.

## 5. Ensayar la importación

La importación debe poder repetirse sin duplicar contenido. Una tabla de correspondencias entre ID antiguo y nuevo permite actualizar una ficha ya importada, generar redirects y registrar fallos por elemento.

```text
exportación → validación → normalización → ensayo → informe de diferencias
                                                   ↓
                                     revisión → importación definitiva
```

Conservar el original del export y los IDs de origen. Registrar qué registros se importaron, omitieron o requieren intervención. Comparar cantidades, relaciones, textos, fechas y archivos; un total coincidente por sí solo no confirma una migración correcta.

Para páginas con Elementor, revisar enlaces internos y contenido renderizado: trasladar HTML puede conservar estilos o shortcodes obsoletos. Para comercio, comparar precio/moneda, variantes, disponibilidad e imágenes con la fuente elegida.

**Criterio de cierre:** el ensayo tiene un informe revisable; repetirlo no crea duplicados y las excepciones están resueltas o documentadas.

## 6. Validar por tarea y dispositivo

Estas pruebas quedan propuestas para la implementación. No se ejecutaron durante esta revisión estática.

| Área           | Casos de comprobación                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Compra         | Producto disponible/agotado, variante, añadir/quitar, cantidades, fallo de red, precio consistente y checkout real en el modo de prueba del proveedor. |
| Audio          | Carga, play/pause, cambio de track, fin, archivo ausente, error y comportamiento móvil.                                                                |
| Catálogo       | Búsqueda, colección, orden, vacío, límite superior a 100 productos y URL compartida.                                                                   |
| Administración | Sesión vencida, permiso insuficiente, errores por campo, guardar/publicar, navegación con cambios pendientes y reapertura.                             |
| Medios         | Archivo inválido, subida parcial, proceso fallido, reintento, reemplazo y borrado de un archivo en uso.                                                |
| Responsive     | Teléfono estrecho, tablet, desktop, teclado virtual, drawer y ausencia de overflow accidental.                                                         |
| Accesibilidad  | Teclado, foco visible, nombres de botones, modal, contraste, zoom y movimiento reducido.                                                               |
| Contenido      | Títulos largos, tres líneas de tarjeta, fechas parciales, caracteres acentuados, tracks sin duración y créditos extensos.                              |
| Carga          | Imagen lenta, error de consulta, skeleton, estabilidad del layout y caché después de publicar.                                                         |
| SEO            | Títulos, canonical, sitemap, redirects, imágenes, links internos, noindex del panel y de demos.                                                        |

Los estados de error merecen tanto diseño como la pantalla completa: vacío inicial, contenido no publicado, proveedor caído y archivo aún en proceso deben distinguirse.

**Criterio de cierre:** los recorridos principales funcionan en móvil y desktop, y los defectos pendientes tienen un impacto conocido. Las pantallas demo no se confunden con catálogo o checkout de producción.

## 7. Preparar sustitución y recuperación

Antes del cambio de dominio: respaldo del sitio anterior, lista de redirects, verificación de configuración de producción y una forma de volver al despliegue anterior. Confirmar que callbacks, URLs de carrito, enlaces de tickets y medios usan los dominios correctos.

Una vez migrado, mantener la correspondencia de URLs antiguas y comprobar destinos representativos. El alcance y la ejecución del lanzamiento necesitan una instrucción posterior; este análisis no autoriza ni realiza ese cambio.

## Decisiones abiertas

1. ¿El panel gestiona también productos comerciales o enlaza a Shopify para esa tarea?
2. ¿Los releases viven como entidad editorial o como metafields/productos?
3. ¿Qué contenido de WordPress sigue activo y debe preservarse?
4. ¿Panel dentro de esta app o aplicación independiente?
5. ¿Qué proveedor editorial y almacenamiento se utilizará?
6. ¿Cuántos editores habrá y quién publica?
7. ¿Los previews son archivos propios por track, un mix por release o embeds externos?
8. ¿Se necesitan idiomas, programación de publicación o aprobación previa?

No hace falta resolverlas para leer estos documentos. Sí afectan al alcance y conviene cerrarlas antes de empezar la implementación.
