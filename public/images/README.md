# Configuración de Imágenes

Este archivo documenta las imágenes necesarias para el proyecto.

## Imágenes Requeridas

### Hero Section
- `hero-havana.jpg` (1200x500px) - Calle colorida de La Habana

### Propiedades Destacadas
- `property-1.jpg` (800x600px) - Mansión años 50 Miramar
- `property-2.jpg` (800x600px) - Ático con vistas Vedado
- `property-3.jpg` (800x600px) - Palacete colonial Habana Vieja

### Barrios
- `neighborhood-miramar.jpg` (600x400px) - Vista de Miramar
- `neighborhood-vedado.jpg` (600x400px) - Vista del Vedado
- `neighborhood-habana-vieja.jpg` (600x400px) - Vista de Habana Vieja

### About
- `team.jpg` (600x400px) - Equipo Mambbu

## Optimización de Imágenes

Recomendaciones para optimizar las imágenes:

1. **Formato WebP**: Usar WebP con fallback a JPG
2. **Compresión**: 80-85% de calidad para web
3. **Responsive**: Generar múltiples tamaños (srcset)
4. **Lazy Loading**: Activado por defecto en componentes

## Herramientas Recomendadas

- **Squoosh**: https://squoosh.app/
- **Sharp**: Para procesamiento automático
- **ImageOptim**: Para macOS

## Implementación Futura

Considerar implementar:
- Servicio de CDN (Cloudinary, ImageKit)
- Generación automática de thumbnails
- Conversión automática a WebP
