import type { Property } from '../types/property';

export const properties: Property[] = [
  {
    id: '1',
    slug: 'villa-mar-azul-miramar',
    title: 'Villa Mar Azul',
    description: `Villa Mar Azul no es solo una residencia, es un pedazo de la historia de La Habana. 
    Construida originalmente en 1958, esta propiedad neocolonial ha sido meticulosamente 
    restaurada para preservar sus detalles arquitectónicos originales mientras incorpora 
    todas las comodidades modernas.

    La propiedad se distribuye en dos niveles, con un imponente vestíbulo de entrada que 
    conduce a una luminosa sala principal. Amplias puertas francesas se abren hacia un 
    patio interior privado y exuberante, el oasis perfecto para el café de la mañana o 
    cócteles bajo las estrellas.

    Se han integrado conveniencias modernas de manera impecable, incluyendo una cocina 
    con mármol de cantera local y climatización completa en todas las habitaciones. Esta 
    casa representa el equilibrio perfecto entre el encanto de antaño y el lujo contemporáneo.`,
    price: '$425,000',
    location: 'Miramar',
    locationDistrict: 'Playa',
    bedrooms: 4,
    bathrooms: 3,
    area: '280m²',
    yearBuilt: 1958,
    featured: true,
    images: [
      { url: '/images/property-1.jpg', alt: 'Fachada principal Villa Mar Azul' },
      { url: '/images/property-2.jpg', alt: 'Sala de estar elegante' },
      { url: '/images/property-3.jpg', alt: 'Jardín privado tropical' },
      { url: '/images/hero-havana.jpg', alt: 'Cocina moderna' },
    ],
    amenities: [
      'Pisos de mosaico originales',
      'Terraza en azotea',
      'Jardín privado',
      'Seguridad 24/7',
      'Internet de alta velocidad',
      'Vista al océano',
      'Garaje para 2 vehículos',
      'Aire acondicionado central',
    ],
    agent: {
      name: 'Elena Gómez',
      avatar: '/images/team.jpg',
      rating: 5,
      reviews: 48,
      responseTime: 'Menos de 1 hora',
      activeListings: 24,
      salesClosed: 127,
      whatsapp: '+53 5555 1234',
    },
    similarProperties: ['mansion-anos-50-miramar', 'atico-vistas-malecon-vedado'],
  },
  {
    id: '2',
    slug: 'mansion-anos-50-miramar',
    title: 'Mansión de los Años 50',
    description: 'Hermosa mansión neocolonial en el corazón de Miramar. Completamente restaurada con acabados de lujo.',
    price: '$450,000',
    location: 'Miramar',
    locationDistrict: 'Playa',
    bedrooms: 4,
    bathrooms: 3,
    area: '420m²',
    featured: true,
    images: [
      { url: '/images/property-1.jpg', alt: 'Mansión de los Años 50' },
    ],
    amenities: [
      'Piscina',
      'Jardín amplio',
      'Garaje doble',
      'Terraza',
    ],
    agent: {
      name: 'Elena Gómez',
      avatar: '/images/team.jpg',
      rating: 5,
      reviews: 48,
      responseTime: 'Menos de 1 hora',
      activeListings: 24,
      salesClosed: 127,
    },
  },
  {
    id: '3',
    slug: 'atico-vistas-malecon-vedado',
    title: 'Ático con Vistas al Malecón',
    description: 'Espectacular ático con vistas panorámicas al Malecón. Ubicación privilegiada en el Vedado.',
    price: '$125,000',
    location: 'Vedado',
    locationDistrict: 'Plaza',
    bedrooms: 2,
    bathrooms: 2,
    area: '115m²',
    newListing: true,
    images: [
      { url: '/images/property-2.jpg', alt: 'Ático con Vistas al Malecón' },
    ],
    amenities: [
      'Vista al mar',
      'Balcón amplio',
      'Cocina equipada',
    ],
    agent: {
      name: 'Elena Gómez',
      avatar: '/images/team.jpg',
      rating: 5,
      reviews: 48,
      responseTime: 'Menos de 1 hora',
      activeListings: 24,
      salesClosed: 127,
    },
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getPropertiesByIds(ids: string[]): Property[] {
  return properties.filter((p) => ids.includes(p.id));
}