# Especificaciones Técnicas - Mambbu

## 🎯 Objetivos del Proyecto

Portal inmobiliario moderno diseñado específicamente para las condiciones de Cuba:
- Dispositivos de gama media/baja (2-4GB RAM)
- Conexiones lentas o intermitentes (< 1 Mbps)
- Acceso limitado a servicios externos
- Alta latencia

## 📊 Métricas de Rendimiento

### Objetivos Web Vitals

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | TBD |
| FID (First Input Delay) | < 100ms | TBD |
| CLS (Cumulative Layout Shift) | < 0.1 | TBD |
| TTFB (Time to First Byte) | < 600ms | TBD |
| TTI (Time to Interactive) | < 3.8s | TBD |

### Tamaños de Bundle

| Recurso | Objetivo | Actual |
|---------|----------|--------|
| HTML inicial | < 50KB | TBD |
| CSS total | < 30KB | TBD |
| JS total | < 100KB | TBD |
| Total (gzipped) | < 150KB | TBD |

## 🏗️ Stack Tecnológico Detallado

### Frontend Framework
- **Astro 4.4.0**
  - SSR (Server-Side Rendering)
  - Islands Architecture
  - File-based routing
  - Built-in optimizations

### UI Library
- **React 18.2.0**
  - Solo para componentes interactivos
  - Hidratación parcial (islands)
  - No SPA, sin client-side routing

### Estilos
- **Tailwind CSS 3.4.1**
  - Utility-first approach
  - PurgeCSS integrado
  - Lightning CSS para minificación
- **@tailwindcss/forms 0.5.7**
  - Estilos base para formularios

### Runtime
- **Node.js 20 LTS (Alpine)**
  - Menor tamaño de imagen Docker
  - Mejor seguridad
  - LTS para estabilidad

### Build Tool
- **Vite** (incluido en Astro)
  - Fast Hot Module Replacement
  - Optimización automática
  - Code splitting

### Containerización
- **Docker**
  - Multi-stage builds
  - Imagen final: ~150MB
- **Docker Compose**
  - Orquestación local
  - Networking automático

## 📦 Dependencias

### Production Dependencies

```json
{
  "@astrojs/node": "^8.2.5",        // Adapter SSR para Node.js
  "@astrojs/react": "^3.1.0",       // Integración React
  "@astrojs/tailwind": "^5.1.0",    // Integración Tailwind
  "@tailwindcss/forms": "^0.5.7",   // Estilos formularios
  "astro": "^4.4.0",                // Framework principal
  "react": "^18.2.0",               // UI library
  "react-dom": "^18.2.0",           // React DOM renderer
  "tailwindcss": "^3.4.1"           // Utility CSS
}
```

### Development Dependencies

```json
{
  "@types/react": "^18.2.56",       // TypeScript types
  "@types/react-dom": "^18.2.19",   // TypeScript types
  "prettier": "^3.2.5",             // Code formatter
  "prettier-plugin-astro": "^0.13.0" // Prettier para Astro
}
```

## 🔧 Configuraciones

### Astro Config

```javascript
{
  output: 'server',                 // SSR mode
  adapter: node({
    mode: 'standalone'              // Self-contained server
  }),
  integrations: [react(), tailwind()],
  compressHTML: true,               // Minificar HTML
  build: {
    inlineStylesheets: 'auto'       // CSS crítico inline
  }
}
```

### Vite Optimizations

```javascript
{
  build: {
    cssMinify: 'lightningcss',      // CSS minification
    minify: 'terser',               // JS minification
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  }
}
```

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
--primary: #0b2c3c;          /* Azul colonial profundo */
--sea-glass: #7FD1C8;        /* Turquesa caribeño */
--cuba-red: #D13438;         /* Rojo bandera cubana */
--accent-gold: #c5a059;      /* Dorado envejecido */
--cream: #F9F7F2;            /* Crema papel antiguo */
--background-light: #f6f7f8; /* Gris claro */
--background-dark: #121b20;  /* Azul oscuro */
--card-light: #ffffff;       /* Blanco puro */
```

### Tipografía

**Fraunces** (Variable Font)
- Weights: 400, 700
- Usage: Headings, display text
- Character: Serif clásica con personalidad

**Inter** (Variable Font)
- Weights: 300, 400, 500, 600, 700
- Usage: Body text, UI elements
- Character: Sans-serif moderna y legible

### Espaciado

Escala de espaciado basada en 4px:
- xs: 4px (0.25rem)
- sm: 8px (0.5rem)
- md: 16px (1rem)
- lg: 24px (1.5rem)
- xl: 32px (2rem)
- 2xl: 48px (3rem)
- 3xl: 64px (4rem)

### Breakpoints

```css
sm:  640px   /* min-width */
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

## 🗃️ Arquitectura de Datos

### Futura Estructura de Base de Datos

**Properties** (Propiedades)
```sql
id, title, description, price, currency, bedrooms, bathrooms,
area, area_unit, property_type, transaction_type, address,
neighborhood, city, province, latitude, longitude,
images[], amenities[], year_built, created_at, updated_at,
status, featured, verified, agent_id
```

**Users** (Usuarios)
```sql
id, email, password_hash, name, phone, role, 
created_at, updated_at, verified, avatar_url
```

**Agents** (Agentes Inmobiliarios)
```sql
id, user_id, agency_name, license_number, bio,
rating, reviews_count, properties_count, verified
```

## 🔐 Seguridad

### Medidas Implementadas

- Headers HTTP seguros (helmet.js en futuro)
- Sanitización de inputs
- Rate limiting (a implementar)
- CORS configurado
- CSP (Content Security Policy) a configurar

### Variables de Entorno

```bash
NODE_ENV=production
HOST=0.0.0.0
PORT=4321
DATABASE_URL=postgresql://...  # Futuro
JWT_SECRET=...                 # Futuro
```

## 🚀 Proceso de Deploy

### 1. Build
```bash
npm run build
```

### 2. Docker Image
```bash
docker build -t mambbu:latest .
```

### 3. Deploy
```bash
docker-compose up -d
```

### 4. Health Check
```bash
curl http://localhost:4321/
```

## 📈 Monitoreo Futuro

### Métricas a Trackear

- **Rendimiento**
  - Tiempo de carga de página
  - Tiempo de respuesta API
  - Errores de servidor
  
- **Usuarios**
  - Sesiones activas
  - Páginas vistas
  - Conversiones (contactos)
  
- **Negocio**
  - Propiedades publicadas
  - Búsquedas realizadas
  - Leads generados

### Tools Sugeridas

- **Analytics**: Plausible, Umami (privacy-friendly)
- **Error Tracking**: Sentry
- **Uptime**: UptimeRobot
- **Performance**: Lighthouse CI

## 🧪 Testing Strategy (Futuro)

### Unit Tests
- Vitest para lógica de negocio
- React Testing Library para componentes

### Integration Tests
- Testing de API endpoints
- Testing de formularios

### E2E Tests
- Playwright para flujos críticos
- Testing cross-browser

### Visual Regression
- Percy o Chromatic
- Testing de UI en diferentes viewports

## 📱 Compatibilidad

### Navegadores Soportados

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome    | 90+ |
| Firefox   | 88+ |
| Safari    | 14+ |
| Edge      | 90+ |

### Dispositivos Target

- **Desktop**: 1280x720 y superiores
- **Tablet**: 768x1024
- **Mobile**: 375x667 (iPhone SE) y superiores

## 🔄 CI/CD Pipeline (Futuro)

```yaml
# Ejemplo de workflow
1. Commit → Push to GitHub
2. GitHub Actions:
   - Run tests
   - Build Docker image
   - Push to registry
   - Deploy to staging
3. Manual approval
4. Deploy to production
```

## 📚 Documentación Adicional

- [README.md](./README.md) - Guía de inicio rápido
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Guía para desarrolladores
- [CHANGELOG.md](./CHANGELOG.md) - Historial de cambios

---

**Última actualización**: 2024-02-16
**Versión**: 1.0.0
