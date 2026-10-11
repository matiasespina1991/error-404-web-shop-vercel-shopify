# Análisis de referencias para Error404

Fecha de revisión: **11 de octubre de 2026**.

El proyecto actual sirve como base de tienda. El dashboard de Laura aporta patrones de gestión editorial; WordPress muestra el dominio musical que puede perderse en la migración; 22 Recordings demuestra cómo extender esta misma familia de plantilla con identidad, páginas de marca y una integración comercial más desarrollada.

La recomendación es combinar esas aportaciones de forma selectiva. Copiar cualquiera de los tres proyectos completo trasladaría también sus dependencias, datos de demostración o decisiones de otra marca.

## Documentos

| Documento                                                     | Contenido                                                                                            |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [01 · Dashboard de Laura](01-dashboard-laura.md)              | Estructura administrativa, UX editorial, medios, autenticación, módulos reales y de demostración.    |
| [02 · WordPress de Error404](02-wordpress-error404.md)        | Temas, funciones musicales, personalizaciones, límites del material disponible y mapa de migración.  |
| [03 · 22 Recordings](03-22-recordings.md)                     | Base compartida, sección About, variantes, navegación, Shopify, galería y estados de carga.          |
| [04 · Proyecto actual](04-error404-actual.md)                 | Análisis de Error404: arquitectura, UX por pantalla, carrito, música, responsive, SEO y prioridades. |
| [05 · Comparación y propuesta](05-comparacion-y-propuesta.md) | Arquitectura sugerida, navegación pública y administrativa, propiedad de datos y prioridades.        |
| [06 · Migración y validación](06-migracion-y-validacion.md)   | Fases, dependencias, comprobaciones y decisiones pendientes.                                         |
| [07 · Fuentes y alcance](07-fuentes-y-alcance.md)             | Rutas de origen, inventario, metodología y límites de las conclusiones.                              |

## Lo principal

Para la comparación directa entre las dos tiendas y el orden concreto de cambios, ver [08 · Error404 vs. 22: plan de evolución](08-error404-vs-22-plan-de-evolucion.md). Incluye paridad funcional, estructura propuesta, migración de fichas y mejoras de escalabilidad.

1. **El dashboard de Laura sí tiene funcionalidad editorial conectada a Firebase**, aunque su README aún describe parte de ella como pendiente. Obras, exhibiciones, galería, About y contacto tienen implementación propia. El listado y formulario de productos siguen siendo demostraciones.
2. **La carpeta WordPress no es una copia completa de la web publicada.** Contiene Soundkraft y Soundkraft Child. No encontré un volcado de contenido, una exportación de páginas ni la biblioteca de archivos subidos. Los menús reales, el contenido de Elementor y el catálogo publicado no pueden reconstruirse únicamente con esos temas.
3. **22 Recordings comparte claramente la base técnica de esta tienda**, pero no puedo afirmar su genealogía exacta sin investigar el historial. Su aportación más directa es la sección About y la separación entre datos comerciales, marca y presentación.
4. **La nueva administración necesita una decisión sobre quién administra los productos.** La tienda actual ya consume Shopify. Un panel editorial puede gestionar eventos, artistas, páginas y medios; precios, variantes, stock y pedidos deberían conservar una fuente única.
5. **El backend de Laura requiere cambios antes de reutilizarse.** Hay una comprobación de acceso en el cliente, pero las reglas locales de datos no reproducen esos permisos y existe una regla de escritura anónima en `assets`. El detalle está documentado; no se verificó que esas reglas sean las desplegadas.

## Cómo leer las conclusiones

- **Observado:** implementación presente en los archivos revisados.
- **Consecuencia probable:** efecto deducido del código; requiere una prueba de uso para confirmarlo visualmente.
- **Propuesta:** cambio recomendado para Error404; todavía no implementado ni aprobado como decisión definitiva.
- **Pendiente:** dato o comportamiento que la copia local no permite establecer.

Esta revisión es de código y documentación local. No incluye una auditoría visual en navegador, pruebas de pago, acceso a los administradores publicados ni evaluación de métricas reales. No se han abierto archivos `.env`, leído el contenido de `wp-config.php`, publicado cambios o modificado los tres proyectos de referencia.
