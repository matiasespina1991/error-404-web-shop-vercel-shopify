# Decisión vigente: dashboard como proyecto separado

La aclaración del usuario sustituye la propuesta inicial de integrar el panel en esta app: **dos proyectos y dos despliegues independientes**. Este documento prevalece sobre las opciones históricas de los informes 04, 05 y 08.

```text
Error404 Web/
  web-vercel-nextjs/     Web pública y shop
  dashboard/            Panel independiente
```

| Sistema   | Responsabilidad                                               | Dirección                                 |
| --------- | ------------------------------------------------------------- | ----------------------------------------- |
| Esta web  | Mostrar contenido publicado y tienda                          | Dominio principal                         |
| Dashboard | Imágenes, About y futuros módulos como entrevistas            | `dashboard.tudominio.com`                 |
| Shopify   | Productos, precios, variantes, stock, carrito, pago y pedidos | Su administración e integración comercial |
| WordPress | Sitio que se sustituye                                        | Sin dependencia en la nueva solución      |

El término «editorial» de los análisis solo significaba contenido de la web; no representaba otro producto ni un requisito de arquitectura.

Actualización: [10 · Home, eventos y entrevistas](10-home-eventos-entrevistas.md) describe los nuevos módulos y sustituye la limitación inicial de entrevistas pendientes.

## Integración implementada

La tienda mantiene sus rutas originales y no contiene el dashboard, SDK Firebase Admin ni credenciales de administración. Añade `/about` y un lector de contenido publicado configurado con `DASHBOARD_URL`. El enlace About se añade al menú si aún no existe.

El proyecto hermano tiene su propio package, lockfile, login, layout, API y configuración. Se entra por `/` en su propio host. Su API pública devuelve solo About publicado y medios con referencia publicada; los borradores, biblioteca y escrituras requieren sesión.

Firebase se utiliza como backend del panel, siguiendo la referencia elegida, con control de acceso en servidor y reglas que deniegan acceso directo desde clientes. No se copian credenciales ni datos de Laura.

## Configuración pendiente

Faltan el dominio real, proyecto Firebase de Error404, variables y despliegues. No se creó infraestructura, cambió DNS ni publicó ninguna web. El panel muestra instrucciones de conexión y permanece cerrado sin configuración.

En desarrollo: tienda en 3001 y dashboard en 3002. Definir `DASHBOARD_URL=http://localhost:3002` en la tienda cuando se quiera conectar ambos. La edición completa requiere Firebase.

Para producción, cada proyecto se configura y despliega por separado. El subdominio se asocia al hosting del dashboard. La tienda usa `DASHBOARD_URL=https://dashboard.tudominio.com`; el dashboard usa su origen exacto y la URL de la web.

## Alcance de esta primera implementación

- Acceso Google y cuentas autorizadas de servidor.
- Biblioteca paginada de imágenes, carga, optimización, nombre, alt y eliminación protegida por referencias.
- About con borrador, preview, publicación, retirada y comprobación de revisión.
- About público en la tienda, leído desde el dashboard.
- Estructura preparada para sumar entrevistas como módulo posterior; todavía no implementado.

El dashboard no gestiona productos Shopify. Las imágenes de productos siguen perteneciendo a Shopify; esta biblioteca es para contenido de la web.

## Verificación realizada

Los dos proyectos compilan en producción y pasan TypeScript. El dashboard tiene ocho pruebas de validación/publicación que pasan. Se comprobaron 16 solicitudes HTTP locales: acceso/login, rutas protegidas, rechazo de escrituras sin sesión/origen válido, contrato público de About y respuesta de tienda/producto/About.

No se probaron Google Login, Storage ni escrituras reales de Firestore porque falta configurar Firebase. Tampoco hubo revisión visual en navegador: no había una conexión de navegador disponible. Se cerraron los servidores temporales usados para verificar HTTP.

La versión de pnpm queda fijada en cada proyecto para evitar que hereden la selección de otro package manager desde directorios superiores.

Los detalles de instalación, límites y contrato están en el README del proyecto `dashboard`. Los informes anteriores son análisis del estado previo, no una descripción de esta implementación.
