# 🚀 Inicio Rápido - Mambbu

## Opción 1: Desarrollo Local (Recomendado para empezar)

### Requisitos
- Node.js 20 o superior
- npm o pnpm

### Pasos

```bash
# 1. Navegar al proyecto
cd mambbu-project

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir navegador
# Ir a: http://localhost:4321
```

¡Listo! El servidor se recargará automáticamente cuando edites archivos.

---

## Opción 2: Desarrollo con Docker

### Requisitos
- Docker
- Docker Compose

### Pasos

```bash
# 1. Navegar al proyecto
cd mambbu-project

# 2. Levantar contenedores de desarrollo
docker-compose -f docker-compose.dev.yml up

# 3. Abrir navegador
# Ir a: http://localhost:4321
```

Para detener:
```bash
docker-compose -f docker-compose.dev.yml down
```

---

## Opción 3: VS Code Devcontainer (Recomendado para equipos)

### Requisitos
- Docker
- VS Code
- Extensión "Dev Containers"

### Pasos

1. Abrir el proyecto en VS Code
2. Presionar `Ctrl+Shift+P` (o `Cmd+Shift+P` en Mac)
3. Escribir "Dev Containers: Reopen in Container"
4. Esperar a que se construya el contenedor (primera vez toma unos minutos)
5. El terminal integrado ya estará dentro del contenedor
6. Ejecutar `npm run dev`

---

## 📝 Siguientes Pasos

### 1. Reemplazar Placeholders de Imágenes

Las imágenes actuales son placeholders SVG. Reemplázalas con imágenes reales:

```bash
# Las imágenes van en:
public/images/

# Nombres esperados:
- hero-havana.jpg (1200x500px)
- property-1.jpg (800x600px)
- property-2.jpg (800x600px)
- property-3.jpg (800x600px)
- neighborhood-miramar.jpg (600x400px)
- neighborhood-vedado.jpg (600x400px)
- neighborhood-habana-vieja.jpg (600x400px)
- team.jpg (600x400px)
```

### 2. Personalizar Contenido

Edita el archivo principal:
```bash
src/pages/index.astro
```

### 3. Añadir Nuevas Páginas

Crear nuevos archivos en `src/pages/`:
```bash
src/pages/propiedades.astro       # /propiedades
src/pages/contacto.astro          # /contacto
src/pages/propiedades/[id].astro  # /propiedades/:id (dinámico)
```

### 4. Crear Componentes

```bash
# Componentes estáticos (Astro)
src/components/MiComponente.astro

# Componentes interactivos (React)
src/components/MiComponente.tsx
```

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev           # Iniciar servidor de desarrollo

# Producción
npm run build         # Compilar para producción
npm run preview       # Preview del build

# Formato
npm run format        # Formatear código con Prettier
npm run lint          # Verificar formato
```

---

## 🐳 Comandos Docker

```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml up
docker-compose -f docker-compose.dev.yml down

# Producción
docker-compose up -d
docker-compose down

# Ver logs
docker-compose logs -f

# Rebuild
docker-compose build --no-cache
```

---

## 📚 Documentación

- **README.md** - Información general del proyecto
- **DEVELOPMENT.md** - Guía detallada de desarrollo
- **SPECS.md** - Especificaciones técnicas
- **CHANGELOG.md** - Historial de cambios

---

## ❓ Problemas Comunes

### Puerto 4321 ya en uso

```bash
# Cambiar puerto en package.json o usar variable de entorno
PORT=3000 npm run dev
```

### Dependencias no se instalan

```bash
# Limpiar cache de npm
npm cache clean --force
rm -rf node_modules
npm install
```

### Docker no inicia

```bash
# Verificar Docker está corriendo
docker --version
docker-compose --version

# Restart Docker Desktop
```

---

## 🎯 Próximos Pasos Sugeridos

1. ✅ Reemplazar imágenes placeholder
2. ✅ Personalizar textos y contenido
3. ✅ Crear páginas adicionales (listado, detalle)
4. ✅ Implementar backend/API
5. ✅ Conectar con base de datos
6. ✅ Añadir autenticación
7. ✅ Implementar sistema de búsqueda
8. ✅ Configurar analytics
9. ✅ Optimizar SEO
10. ✅ Deploy a producción

---

## 💬 Soporte

¿Necesitas ayuda? Consulta:
1. README.md para información general
2. DEVELOPMENT.md para guías de desarrollo
3. Issues en el repositorio (cuando aplique)

---

**¡Bienvenido a Mambbu! 🇨🇺**
