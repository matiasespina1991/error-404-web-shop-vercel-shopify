# Dashboard: reutilización del template de Laura

Se reemplazó la interfaz propia del panel por componentes y estilos copiados del template de `laura-butallo-web/apps/admin-dashboard`, según la corrección del usuario.

## Reutilización

- Componentes shadcn/Radix originales: sidebar, sheet, tooltip, dropdown, avatar, breadcrumbs, botones, inputs, labels, textarea, tarjetas, badges, tablas, select, separadores y skeleton.
- Tokens claros/oscuros, radios y estilos base del template.
- Familia Inter servida localmente.
- Estructura de sidebar plegable con rail, cabecera, breadcrumbs, selector de tema y menú de usuario. Estado persistido en cookie y menú móvil con Sheet.
- Estructura de login con imagen a la izquierda y acceso Google a la derecha. La imagen ilustrativa se adaptó a Error404; no se reutilizó contenido artístico de Laura.

## Adaptaciones de Error404

La navegación usa About, Eventos, Entrevistas y Galería; añade enlaces externos al sitio y al administrador Shopify. Las tablas muestran los borradores/publicaciones reales. Los formularios existentes usan las primitivas del template y conservan sus operaciones y validaciones.

No se copiaron credenciales, cuentas, colecciones ni datos de Laura. Se mantienen las rutas independientes del panel, las sesiones de servidor, la lista de administradores autorizados, revisión de origen, límites y validación de escrituras. No se añade un bypass de acceso para preview. La licencia del template se conserva en `../dashboard/LICENSE.template`.

Se conserva un respaldo del código previo en `/private/tmp/error404-dashboard-before-shadcn`, sin dependencias, caché ni archivos de entorno.

## Verificación

La compilación de producción, TypeScript y las 14 pruebas de validación/publicación pasan. Por HTTP se comprobó el login, la redirección a login de About/Eventos/Entrevistas/Galería sin sesión y la lectura pública de About/Eventos/Entrevistas desde Firebase.

No hubo navegador conectado para comprobar visualmente el panel dentro de una sesión Google ni las interacciones móviles. No se modificaron datos publicados en Firebase para probar la interfaz.
