# Mambbu - Portal Inmobiliario de Cuba

Portal inmobiliario moderno construido con Astro SSR, React Islands y TailwindCSS. Optimizado para usuarios con dispositivos medios/bajos en Cuba.

## 🚀 Características

- **Astro SSR**: Renderizado en servidor para máxima velocidad
- **React Islands**: Interactividad solo donde se necesita (hidratación parcial)
- **TailwindCSS**: Estilos optimizados y minificados
- **Docker**: Contenedorización completa para desarrollo y producción
- **Devcontainer**: Entorno de desarrollo reproducible con VS Code
- **Optimizado para Cuba**: Diseño ligero pensado para conexiones lentas

## 🏗️ Stack Tecnológico

- **Frontend**: Astro 4.x + React 18
- **Estilos**: TailwindCSS 3.x
- **Runtime**: Node.js 20
- **Containerización**: Docker + Docker Compose
- **Dev Environment**: VS Code Devcontainer

## 📦 Instalación

### Desarrollo Local (sin Docker)

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de producción
npm run preview
```

### Desarrollo con Docker

```bash
# Construir y levantar contenedores
docker-compose -f docker-compose.dev.yml up

# Acceder a http://localhost:4321
```

### Desarrollo con VS Code Devcontainer

1. Instalar la extensión "Dev Containers" en VS Code
2. Abrir el proyecto en VS Code
3. Presionar `Ctrl+Shift+P` (o `Cmd+Shift+P` en Mac)
4. Seleccionar "Dev Containers: Reopen in Container"
5. El entorno se configurará automáticamente

## 🐳 Producción con Docker

```bash
# Construir imagen de producción
docker build -t mambbu:latest .

# O usar docker-compose
docker-compose up -d

# La aplicación estará disponible en http://localhost:4321
```

## 📁 Estructura del Proyecto

```
mambbu-project/
├── .devcontainer/           # Configuración de devcontainer
├── src/
│   ├── components/          # Componentes Astro y React
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PropertyCard.astro
│   │   └── SearchBox.tsx    # Componente React (isla)
│   ├── layouts/
│   │   └── BaseLayout.astro # Layout base
│   ├── pages/
│   │   └── index.astro      # Página de inicio
│   └── styles/
│       └── global.css       # Estilos globales
├── public/                  # Assets estáticos
├── Dockerfile               # Dockerfile de producción
├── Dockerfile.dev           # Dockerfile de desarrollo
├── docker-compose.yml       # Compose de producción
├── docker-compose.dev.yml   # Compose de desarrollo
├── astro.config.mjs         # Configuración de Astro
├── tailwind.config.mjs      # Configuración de Tailwind
└── package.json
```

## 🎨 Diseño

El diseño está inspirado en la estética postal y colonial cubana:

- **Colores**: Paleta inspirada en el mar Caribe y la arquitectura colonial
- **Tipografía**: Fraunces (serif) para encabezados, Inter para el cuerpo
- **Elementos visuales**: Bordes tipo postal, sellos, cortes de ticket
- **Patrón**: Azulejos cubanos como textura de fondo

## ⚡ Optimizaciones

### Para Dispositivos de Gama Media/Baja

1. **Imágenes lazy-loading**: Carga diferida de imágenes fuera del viewport
2. **CSS minificado**: Uso de Lightning CSS para minificación
3. **Code splitting**: Separación de vendor chunks
4. **SSR**: Renderizado en servidor reduce trabajo del cliente
5. **React Islands**: Solo componentes interactivos se hidratan
6. **Compresión**: HTML comprimido automáticamente

### Para Conexiones Lentas

1. **Preconnect**: Pre-conexión a Google Fonts
2. **Font display**: `display=swap` para mostrar texto antes de cargar fuentes
3. **Inline crítico**: CSS crítico inline cuando es pequeño
4. **Prefetch**: Pre-carga de rutas importantes

## 🔧 Configuración

### Variables de Entorno

Crear un archivo `.env` en la raíz:

```env
# Producción
NODE_ENV=production
HOST=0.0.0.0
PORT=4321

# API (cuando se implemente)
# API_URL=https://api.mambbu.cu
```

## 🚢 Despliegue

### Docker en Servidor

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd mambbu-project

# 2. Construir imagen
docker build -t mambbu:latest .

# 3. Ejecutar contenedor
docker run -d \
  --name mambbu \
  -p 4321:4321 \
  --restart unless-stopped \
  mambbu:latest

# O con docker-compose
docker-compose up -d
```

### Nginx como Reverse Proxy (Opcional)

```nginx
server {
    listen 80;
    server_name mambbu.cu www.mambbu.cu;

    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Compilar para producción
npm run preview    # Preview del build de producción
npm run dev -- --host 0.0.0.0 --port 4321
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y propietario.

## 👥 Equipo

Desarrollado con ❤️ para Cuba por el equipo de Mambbu.

---

**Nota**: Este proyecto está optimizado específicamente para las condiciones de conectividad en Cuba. Las decisiones de diseño y arquitectura priorizan el rendimiento en dispositivos de gama media/baja y conexiones lentas.
