# Lista de seguridad previa al lanzamiento

No publicar la aplicación como red social funcional hasta completar todos los puntos.

## Identidad y roles
- [ ] Activar confirmación de correo.
- [ ] Definir flujo de recuperación de cuenta.
- [ ] Crear administrador manualmente desde un entorno confiable.
- [ ] Activar MFA para administración.
- [ ] No confiar en `user_metadata` para asignar roles.
- [ ] Proteger `user_roles` con políticas y funciones de servidor.

## RLS
- [ ] Definir SELECT/INSERT/UPDATE/DELETE para cada tabla.
- [ ] Comprobar propiedad de cada fila con `auth.uid()`.
- [ ] Comprobar membresía antes de leer conversaciones y mensajes.
- [ ] Comprobar bloqueos en follows, DMs, comentarios y notificaciones.
- [ ] Impedir que usuarios modifiquen points, xp, level, is_verified y role.
- [ ] Probar con dos cuentas normales, una moderadora y una administradora.

## Storage
- [ ] Crear buckets privados/públicos según el tipo de archivo.
- [ ] Aplicar políticas por propietario y miembros de conversación.
- [ ] Validar MIME real, extensión, tamaño y duración.
- [ ] No permitir archivos ejecutables.
- [ ] Generar URLs firmadas para contenido privado.
- [ ] Definir cuotas y límites anti-abuso.

## Operaciones económicas y progreso
- [ ] Puntos y canjes mediante transacciones/RPC seguras.
- [ ] Evitar saldos negativos y canjes duplicados.
- [ ] XP calculado en servidor con límite de 100 XP por día.
- [ ] Idempotencia para logros y recompensas de misiones.
- [ ] Votos únicos por usuario y encuesta.
- [ ] Registro de auditoría para acciones administrativas.

## Protección de usuarios
- [ ] Reglas comunitarias claras y apropiadas para menores.
- [ ] Denunciar, bloquear y silenciar.
- [ ] Solicitudes de mensajes y controles de contacto.
- [ ] No mostrar correo, ubicación precisa ni datos sensibles.
- [ ] Moderación automática inicial y revisión humana.
- [ ] Proceso de apelación para sanciones.
- [ ] Herramientas para exportar y eliminar cuentas.

## Lanzamiento
- [ ] Configurar variables de entorno de Vercel.
- [ ] Verificar que no haya secretos en GitHub.
- [ ] Revisar permisos de buckets y tablas.
- [ ] Probar móvil y escritorio.
- [ ] Probar errores de red, carga y límites de archivos.
- [ ] Activar registro público solamente después de completar seguridad.
