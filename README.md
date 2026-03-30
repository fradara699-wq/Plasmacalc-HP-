
# 🚀 Guía de Despliegue: PlasmaCalc a Netlify vía GitHub

Esta aplicación está diseñada para ser desplegada automáticamente en Netlify conectando tu repositorio de GitHub.

## 1. Conexión con GitHub
1. Sube este código a un repositorio en tu cuenta de GitHub.
2. En el panel de Netlify, selecciona **"Add new site"** > **"Import an existing project"**.
3. Conecta tu cuenta de GitHub y selecciona el repositorio de `PlasmaCalc`.

## 2. Configuración de Build (Automática)
Netlify detectará automáticamente la configuración gracias al archivo `netlify.toml` incluido:
- **Build command:** `CI=false npm run build`
- **Publish directory:** `dist`

## 3. Configuración de la API KEY (CRÍTICO)
Para que el Asistente de IA funcione:
1. En Netlify, ve a **Site configuration** > **Environment variables**.
2. Haz clic en **Add a variable**.
3. Nombre: `GEMINI_API_KEY`
4. Valor: (Pega aquí tu llave de API de Google AI Studio).
5. Guarda los cambios.

## 4. Instalación como PWA
La aplicación está configurada como una Progressive Web App (PWA). Una vez desplegada con HTTPS:
- En **Android/Chrome**: Aparecerá un aviso para "Instalar aplicación".
- En **iOS/Safari**: Pulsa el botón "Compartir" y selecciona "Agregar a la pantalla de inicio".
