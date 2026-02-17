export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  priceValue: number; // ← NUEVO: precio numérico para filtrar/ordenar
  location: string;
  locationDistrict: string;
  type: PropertyType; // ← NUEVO: tipo de propiedad
  status: PropertyStatus; // ← NUEVO: estado (available, sold, rented)
  bedrooms: number;
  bathrooms: number;
  area: string;
  yearBuilt?: number;
  featured?: boolean;
  newListing?: boolean;
  verified?: boolean;
  quickResponse?: boolean; // ← NUEVO: respuesta rápida
  images: PropertyImage[];
  amenities: string[];
  agent: Agent;
  similarProperties?: string[];
}

export type PropertyType =
  | 'apartamento-colonial'
  | 'casa-independiente'
  | 'villa-playa'
  | 'penthouse'
  | 'palacete';

export type PropertyStatus = 'available' | 'sold' | 'rented';

export interface PropertyImage {
  url: string;
  alt: string;
}

export interface Agent {
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  responseTime: string;
  activeListings: number;
  salesClosed: number;
  phone?: string;
  whatsapp?: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  type?: PropertyType;
  location?: string;
  bedrooms?: number;
  sortBy?: SortOption;
  page?: number;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'relevance';
