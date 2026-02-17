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
    cócteles bajo las estrellas.`,
    price: '$425,000',
    priceValue: 425000,
    location: 'Miramar',
    locationDistrict: 'Playa',
    type: 'villa-playa',
    status: 'available',
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
    description:
      'Hermosa mansión neocolonial en el corazón de Miramar. Completamente restaurada con acabados de lujo y jardín tropical.',
    price: '$450,000',
    priceValue: 450000,
    location: 'Miramar',
    locationDistrict: 'Playa',
    type: 'casa-independiente',
    status: 'available',
    bedrooms: 4,
    bathrooms: 3,
    area: '420m²',
    featured: true,
    images: [
      { url: '/images/property-1.jpg', alt: 'Mansión de los Años 50' },
      { url: '/images/property-2.jpg', alt: 'Interior mansión' },
    ],
    amenities: ['Piscina', 'Jardín amplio', 'Garaje doble', 'Terraza'],
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
  },
  {
    id: '3',
    slug: 'atico-vistas-malecon-vedado',
    title: 'Ático con Vistas al Malecón',
    description:
      'Espectacular ático con vistas panorámicas al Malecón. Ubicación privilegiada en el Vedado con acabados modernos.',
    price: '$125,000',
    priceValue: 125000,
    location: 'Vedado',
    locationDistrict: 'Plaza',
    type: 'penthouse',
    status: 'available',
    bedrooms: 2,
    bathrooms: 2,
    area: '115m²',
    newListing: true,
    quickResponse: true,
    images: [
      { url: '/images/property-2.jpg', alt: 'Ático con Vistas al Malecón' },
      { url: '/images/property-3.jpg', alt: 'Sala del ático' },
    ],
    amenities: ['Vista al mar', 'Balcón amplio', 'Cocina equipada'],
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
    id: '4',
    slug: 'palacete-colonial-habana-vieja',
    title: 'Palacete Colonial Restaurado',
    description:
      'Majestuoso palacete colonial en el corazón de la Habana Vieja. Declarado patrimonio histórico con restauración impecable.',
    price: '$280,000',
    priceValue: 280000,
    location: 'Habana Vieja',
    locationDistrict: 'Habana Vieja',
    type: 'palacete',
    status: 'available',
    bedrooms: 5,
    bathrooms: 4,
    area: '510m²',
    verified: true,
    yearBuilt: 1920,
    images: [
      { url: '/images/property-3.jpg', alt: 'Palacete Colonial' },
      { url: '/images/property-1.jpg', alt: 'Interior palacete' },
    ],
    amenities: ['Patio colonial', 'Techos altos', 'Vitrales originales', 'Biblioteca'],
    agent: {
      name: 'Elena Gómez',
      avatar: '/images/team.jpg',
      rating: 5,
      reviews: 48,
      responseTime: 'Menos de 2 horas',
      activeListings: 24,
      salesClosed: 127,
    },
  },
  {
    id: '5',
    slug: 'estudio-san-rafael-centro-habana',
    title: 'Estudio San Rafael',
    description:
      'Acogedor estudio en pleno Centro Habana. Ideal para inversión o primera vivienda.',
    price: '$75,000',
    priceValue: 75000,
    location: 'Centro Habana',
    locationDistrict: 'Centro Habana',
    type: 'apartamento-colonial',
    status: 'sold',
    bedrooms: 1,
    bathrooms: 1,
    area: '45m²',
    images: [{ url: '/images/property-2.jpg', alt: 'Estudio San Rafael' }],
    amenities: ['Cocina equipada', 'Balcón', 'Ascensor'],
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
    id: '6',
    slug: 'casa-familiar-cerro',
    title: 'Casa Familiar Cerro',
    description:
      'Amplia casa familiar en el Cerro. Excelente ubicación con fácil acceso a toda La Habana.',
    price: '$35,000',
    priceValue: 35000,
    location: 'Cerro',
    locationDistrict: 'Cerro',
    type: 'casa-independiente',
    status: 'available',
    bedrooms: 3,
    bathrooms: 1,
    area: '95m²',
    images: [{ url: '/images/property-3.jpg', alt: 'Casa Familiar Cerro' }],
    amenities: ['Patio trasero', 'Garaje', 'Azotea'],
    agent: {
      name: 'Elena Gómez',
      avatar: '/images/team.jpg',
      rating: 5,
      reviews: 48,
      responseTime: 'Menos de 3 horas',
      activeListings: 24,
      salesClosed: 127,
    },
  },
  {
    id: '7',
    slug: 'apartamento-moderno-nuevo-vedado',
    title: 'Apartamento Moderno',
    description: 'Moderno apartamento en Nuevo Vedado con acabados de primera y excelentes vistas.',
    price: '$120,000',
    priceValue: 120000,
    location: 'Vedado',
    locationDistrict: 'Nuevo Vedado',
    type: 'apartamento-colonial',
    status: 'available',
    bedrooms: 2,
    bathrooms: 1,
    area: '68m²',
    quickResponse: true,
    newListing: true,
    images: [{ url: '/images/property-1.jpg', alt: 'Apartamento Moderno Nuevo Vedado' }],
    amenities: ['Aire acondicionado', 'Internet', 'Seguridad 24/7'],
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
    id: '8',
    slug: 'palacete-tropical-siboney',
    title: 'Palacete Tropical Siboney',
    description:
      'Lujoso palacete en Siboney con jardín tropical y piscina privada. El máximo lujo en La Habana.',
    price: '$890,000',
    priceValue: 890000,
    location: 'Miramar',
    locationDistrict: 'Siboney',
    type: 'palacete',
    status: 'available',
    bedrooms: 6,
    bathrooms: 5,
    area: '650m²',
    verified: true,
    images: [
      { url: '/images/property-3.jpg', alt: 'Palacete Tropical Siboney' },
      { url: '/images/property-1.jpg', alt: 'Piscina palacete' },
    ],
    amenities: ['Piscina', 'Jardín tropical', 'Cancha de tenis', 'Garaje triple', 'Servicio'],
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

export function getFilteredProperties(filters: {
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  location?: string;
  bedrooms?: number;
  sortBy?: string;
  page?: number;
  perPage?: number;
}): { properties: Property[]; total: number; totalPages: number } {
  let filtered = [...properties];

  // Filtrar por precio mínimo
  if (filters.minPrice) {
    filtered = filtered.filter((p) => p.priceValue >= filters.minPrice!);
  }

  // Filtrar por precio máximo
  if (filters.maxPrice) {
    filtered = filtered.filter((p) => p.priceValue <= filters.maxPrice!);
  }

  // Filtrar por tipo
  if (filters.type) {
    filtered = filtered.filter((p) => p.type === filters.type);
  }

  // Filtrar por ubicación
  if (filters.location) {
    filtered = filtered.filter((p) =>
      p.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  // Filtrar por habitaciones
  if (filters.bedrooms) {
    filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!);
  }

  // Ordenar
  switch (filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.priceValue - b.priceValue);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.priceValue - a.priceValue);
      break;
    case 'newest':
    default:
      // Los featured primero, luego el resto
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
      break;
  }

  const total = filtered.length;
  const perPage = filters.perPage || 6;
  const page = filters.page || 1;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    properties: filtered.slice(start, end),
    total,
    totalPages,
  };
}
