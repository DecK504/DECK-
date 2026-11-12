# DECK Ⓥ — Proyecto inicial

Comunidad social para Car Parking Multiplayer. Interfaz oscura con azul eléctrico.

## Estado de esta entrega

Este ZIP contiene:
- Interfaz responsive inicial.
- Navegación por módulos principales.
- Pantallas iniciales para comunidad, Garage, chat, misiones, logros, Market, eventos, puntos, búsqueda, seguridad, perfil y estadísticas.
- Modales de demostración.
- Configuración preparada para Supabase.
- Esquema SQL inicial.

**Importante:** todavía no es una red social lista para producción. Las publicaciones, chats, votos, puntos, XP, audio y archivos reales necesitan conectar y probar las políticas RLS, funciones de servidor y buckets de Supabase. No abras el registro público hasta terminar esos controles.

## Abrir en Visual Studio Code

1. Extrae el ZIP.
2. Abre la carpeta `DECK_V1` en Visual Studio Code.
3. Instala la extensión **Live Server**.
4. Abre `index.html` con Live Server.

La interfaz se puede revisar sin credenciales. Verás datos de ejemplo claramente identificados.

## Conectar Supabase

1. Crea un proyecto nuevo en Supabase.
2. Abre **SQL Editor**.
3. Revisa `supabase/001_schema.sql` y ejecútalo en el proyecto nuevo.
4. En Supabase abre **Project Settings → API**.
5. Copia Project URL y la clave pública `anon` / `publishable`.
6. Pega ambas en `js/config.js`:
   - `supabaseUrl`
   - `supabaseAnonKey`

Nunca coloques la clave `service_role` en `config.js`, HTML, JavaScript del navegador ni en GitHub.

## Decisiones incorporadas

- Registro previsto para mayores de 13 años, con controles de seguridad adecuados.
- Tema oscuro y azul eléctrico.
- Feed: Para ti, Siguiendo y Recientes.
- Misiones: reinicio diario a medianoche de Honduras (`America/Tegucigalpa`).
- Historias: archivo manual y privado; historias públicas vencen a las 24 horas.
- Market: usuarios sugieren; administración revisa y publica los artículos aprobados.
- Encuestas: duración inicial de 7 días.
- Notas de voz: máximo 60 segundos.
- Búsqueda: solamente perfiles y contenido público.
- Mensajes: solicitudes, bloqueo y controles de privacidad.
- Puntos separados de XP.
- Sin pagos reales en la primera versión.

## Estructura

```text
DECK_V1/
  index.html
  css/style.css
  js/config.js
  js/app.js
  images/
  supabase/001_schema.sql
  docs/SECURITY_CHECKLIST.md
```

## Antes de publicar

Consulta `docs/SECURITY_CHECKLIST.md`. Se deben terminar:
- Políticas RLS de todas las tablas.
- Políticas de Storage.
- Funciones seguras para puntos, XP, misiones y canjes.
- Creación manual del administrador y MFA.
- Moderación, límites anti-spam y revisión de reportes.
- Pruebas con cuentas distintas.
- Configuración de dominio y variables de entorno.
