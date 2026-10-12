# Firebase de Error404

Proyecto: `error-404-9a984`. Bucket: `error-404-9a984.firebasestorage.app`.

La configuración web recibida se guardó en `../dashboard/.env.local`, ignorado por Git. El panel ya tenía instalados `firebase` y `firebase-admin`; se completaron los campos del SDK cliente y se seleccionó este proyecto para Firebase CLI mediante `../dashboard/.firebaserc`.

El sitio público continúa separado del dashboard. Firebase gestiona acceso, contenido e imágenes del panel. Shopify gestiona la tienda. No se instaló Firebase en la tienda y no se activó Analytics por incluir un measurementId.

## Pendiente para conectar realmente

1. Activar Authentication con Google y autorizar `localhost` y el dominio definitivo del dashboard en Authentication.
2. Crear Firestore y activar Storage en la consola del proyecto.
3. Completar `DASHBOARD_ADMIN_EMAILS` con el correo de Google autorizado.
4. Completar `FIREBASE_CLIENT_EMAIL` y `FIREBASE_PRIVATE_KEY` en el archivo local del panel usando una cuenta de servicio del mismo proyecto. La configuración pública recibida no contiene estas credenciales. No pegar la clave privada en el chat ni subirla a Git.
5. Aplicar `firestore.rules` y `storage.rules` del dashboard al proyecto correcto. Las operaciones se realizan en servidor; las reglas deniegan el acceso directo de clientes.
6. Arrancar el dashboard con `pnpm dev` en su carpeta (puerto 3002). Cuando esté listo, configurar `DASHBOARD_URL=http://localhost:3002` en la web pública. Ajustar `NEXT_PUBLIC_SITE_URL` en el dashboard al puerto usado por la web.
7. Comprobar login, carga de imágenes, borrador, publicación y lectura desde la web.

No se han creado recursos remotos, aplicado reglas ni publicado aplicaciones. No se considera conectada la integración hasta completar las credenciales y verificarla contra Firebase.

## Hosting

El sitio `errror404` indicado en las instrucciones es un sitio de Firebase Hosting; no es el ID del proyecto. Su receta `public: "public"` publica archivos estáticos y no constituye un despliegue completo de estas apps Next.js, que usan servidor, APIs y sesiones.

Firebase recomienda App Hosting para Next.js: https://firebase.google.com/docs/hosting/frameworks/nextjs. El despliegue debe mantener web y dashboard como aplicaciones independientes. Firebase como backend también puede utilizarse con las apps desplegadas en Vercel; configurar Firebase no exige cambiar el hosting.

SDK Admin y credenciales: https://firebase.google.com/docs/admin/setup.

## Conexión verificada

Se configuró `matiasespina1991@gmail.com` como administrador y se importaron las credenciales de la cuenta de servicio a `../dashboard/.env.local`. El JSON original se excluyó de Git y se restringió a permisos de lectura/escritura del propietario.

Las comprobaciones de solo lectura confirmaron Authentication, Google Login activado y Firestore accesibles. Storage se activó después y se verificó que el bucket configurado existe y es accesible con la cuenta de servicio. Authentication, Google Login, Firestore y Storage respondieron correctamente; `localhost` está autorizado para el login. No se probaron cargas de imágenes ni publicación desde una sesión real.

La web local usa ahora `DASHBOARD_URL=http://localhost:3002`. El dashboard apunta a la web en `http://localhost:3000`. Reiniciar la web para tomar el cambio. Al conectar Firebase se muestran los datos publicados del proyecto, no los mocks.

El SDK instalado necesita soporte `require(esm)`: se declaró Node >=22.12.0 en el dashboard y `.nvmrc` selecciona 24. Se usó el Node 24 ya instalado en `/opt/homebrew/bin/node` para arrancar el panel de prueba; no se instalaron runtimes ni se modificó el sistema.
