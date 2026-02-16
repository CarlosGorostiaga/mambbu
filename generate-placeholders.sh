#!/bin/bash

# Script para generar placeholders SVG para desarrollo
# Uso: ./generate-placeholders.sh

echo "Generando placeholders SVG..."

# Función para crear placeholder SVG
create_placeholder() {
    local filename=$1
    local width=$2
    local height=$3
    local text=$4
    
    cat > "public/images/$filename" <<EOF
<svg width="$width" height="$height" xmlns="http://www.w3.org/2000/svg">
  <rect width="$width" height="$height" fill="#7FD1C8" opacity="0.3"/>
  <text x="50%" y="50%" font-family="Inter, sans-serif" font-size="20" fill="#0b2c3c" text-anchor="middle" dominant-baseline="middle">$text</text>
</svg>
EOF
}

# Hero
create_placeholder "hero-havana.jpg" "1200" "500" "Hero - La Habana"

# Properties
create_placeholder "property-1.jpg" "800" "600" "Mansión Miramar"
create_placeholder "property-2.jpg" "800" "600" "Ático Vedado"
create_placeholder "property-3.jpg" "800" "600" "Palacete Colonial"

# Neighborhoods
create_placeholder "neighborhood-miramar.jpg" "600" "400" "Miramar"
create_placeholder "neighborhood-vedado.jpg" "600" "400" "Vedado"
create_placeholder "neighborhood-habana-vieja.jpg" "600" "400" "Habana Vieja"

# Team
create_placeholder "team.jpg" "600" "400" "Equipo Mambbu"

echo "✓ Placeholders generados exitosamente en public/images/"
