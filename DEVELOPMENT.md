# Guía de Desarrollo - Mambbu

## 📐 Arquitectura

### Principios de Diseño

1. **SSR First**: Todo se renderiza en el servidor por defecto
2. **Islands Architecture**: Solo componentes interactivos usan JavaScript en el cliente
3. **Performance First**: Optimizado para dispositivos de gama media/baja
4. **Progressive Enhancement**: Funciona sin JavaScript, mejora con él

### Cuándo Usar Astro vs React

**Usa Componentes Astro (.astro) para:**
- Contenido estático (headers, footers, secciones informativas)
- Layouts y páginas
- Componentes que no necesitan interactividad
- SEO-crítico content

**Usa Componentes React (.tsx) para:**
- Formularios con validación
- Componentes con estado complejo
- Interactividad del usuario (búsqueda, filtros, modales)
- Animaciones complejas

### Hidratación de Islas React

```astro
<!-- No hydrata (solo SSR) -->
<SearchBox />

<!-- Hydrata cuando sea visible -->
<SearchBox client:visible />

<!-- Hydrata inmediatamente -->
<SearchBox client:load />

<!-- Hydrata cuando el usuario interactúa -->
<SearchBox client:idle />

<!-- Hydrata solo en dispositivos específicos -->
<SearchBox client:media="(max-width: 768px)" />
```

## 🎨 Guía de Estilos

### Sistema de Colores

```css
primary:     #0b2c3c  /* Azul oscuro colonial */
sea-glass:   #7FD1C8  /* Verde turquesa Caribe */
cuba-red:    #D13438  /* Rojo de la bandera cubana */
accent-gold: #c5a059  /* Dorado envejecido */
cream:       #F9F7F2  /* Crema papel antiguo */
```

### Tipografía

- **Display/Headings**: Fraunces (serif) - peso 400, 700
- **Body**: Inter (sans-serif) - peso 300, 400, 500, 600, 700

### Clases Utilitarias Personalizadas

```css
.tile-pattern       /* Fondo con patrón de azulejos */
.postcard-border    /* Borde estilo postal con sombra */
.ticket-cut         /* Recorte de ticket */
.postal-stamp       /* Estilo sello postal */
.hero-pattern       /* Patrón del hero */
.wave-divider       /* Divisor con olas */
.verified-stamp     /* Sello de verificación */
.cuba-badge         /* Badge rojo destacado */
```

## 🚀 Performance

### Optimización de Imágenes

```astro
<img 
  src="/images/property.jpg"
  alt="Descripción"
  loading="lazy"          // Lazy load automático
  decoding="async"        // Decodificación asíncrona
  width="800"             // Especificar dimensiones
  height="600"
/>
```

### Code Splitting

El proyecto está configurado para:
- Separar dependencias de React en chunk independiente
- Minificación con Terser
- CSS minificado con Lightning CSS

### Metrics Target

Para usuarios en Cuba con dispositivos medios:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Total Bundle Size**: < 150KB (gzipped)

## 🗂️ Estructura de Archivos

```
src/
├── components/
│   ├── *.astro          # Componentes estáticos
│   └── *.tsx            # Componentes interactivos (islas React)
├── layouts/
│   └── BaseLayout.astro # Layouts reutilizables
├── pages/
│   └── *.astro          # Rutas (file-based routing)
└── styles/
    └── global.css       # Estilos globales
```

## 🔧 Convenciones de Código

### Naming

- **Componentes**: PascalCase (`PropertyCard.astro`)
- **Archivos de utilidades**: camelCase (`imageUtils.ts`)
- **CSS clases**: kebab-case (`tile-pattern`)

### Imports

```astro
---
// 1. Imports de librerías
import { useState } from 'react';

// 2. Imports de componentes
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';

// 3. Imports de utilidades
import { formatPrice } from '../utils/format';

// 4. Imports de tipos
import type { Property } from '../types';

// 5. Lógica del componente
const properties = await fetchProperties();
---
```

### Props en Astro

```astro
---
export interface Props {
  title: string;
  description?: string;  // Opcional con valor por defecto abajo
}

const { 
  title, 
  description = 'Default description' 
} = Astro.props;
---
```

## 📱 Responsive Design

### Breakpoints de Tailwind

```css
sm:  640px   /* Móviles grandes */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Pantallas grandes */
```

### Mobile First

Siempre diseñar mobile-first:

```astro
<div class="flex flex-col md:flex-row lg:gap-8">
  <!-- Columna en móvil, fila en desktop -->
</div>
```

## 🧪 Testing (Futuro)

Recomendaciones para implementar:

```bash
# Unit Tests
npm install -D vitest @testing-library/react

# E2E Tests
npm install -D playwright
```

## 🔐 Seguridad

### Variables de Entorno

```astro
---
// ✅ Correcto - acceso seguro en servidor
const apiKey = import.meta.env.API_KEY;

// ❌ Incorrecto - expone en cliente
const apiKey = process.env.API_KEY;
---
```

### Sanitización

```astro
---
import { sanitize } from '../utils/sanitize';

const userInput = sanitize(Astro.request.body.comment);
---
```

## 📊 Monitoreo

### Logs en Producción

```javascript
// En astro.config.mjs
export default defineConfig({
  // ...
  vite: {
    logLevel: 'info'
  }
});
```

## 🚢 Despliegue

### Checklist Pre-Deploy

- [ ] Build exitoso (`npm run build`)
- [ ] Preview funcional (`npm run preview`)
- [ ] Imágenes optimizadas
- [ ] Variables de entorno configuradas
- [ ] Tests pasando (cuando se implementen)
- [ ] README actualizado

### Comandos de Deploy

```bash
# Construir imagen Docker
docker build -t mambbu:latest .

# Subir a registry (ejemplo)
docker tag mambbu:latest registry.ejemplo.com/mambbu:latest
docker push registry.ejemplo.com/mambbu:latest

# Actualizar en servidor
ssh usuario@servidor 'docker pull registry.ejemplo.com/mambbu:latest && docker-compose up -d'
```

## 💡 Tips y Trucos

### Debugging en Astro

```astro
---
// Logs solo en desarrollo
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}

// Componente de debug
import Debug from '../components/Debug.astro';
---

{import.meta.env.DEV && <Debug data={data} />}
```

### Hot Module Replacement

El HMR de Astro funciona automáticamente:
- Cambios en `.astro`: recarga completa
- Cambios en `.tsx`: HMR preserva estado
- Cambios en CSS: actualización instantánea

## 🔗 Recursos

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [MDN Web Docs](https://developer.mozilla.org)

## 🤝 Git Workflow

### Branches

- `main`: Producción
- `develop`: Desarrollo activo
- `feature/*`: Nuevas características
- `fix/*`: Correcciones de bugs

### Commits

Usar conventional commits:

```bash
feat: añadir filtro de búsqueda por precio
fix: corregir layout en móviles
docs: actualizar README
style: formatear código con prettier
refactor: reorganizar estructura de componentes
perf: optimizar carga de imágenes
test: añadir tests para PropertyCard
```

---

**Nota**: Esta guía está en constante evolución. Si encuentras algo que mejorar, ¡actualízala!
