export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  location: string;
  locationDistrict: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  yearBuilt?: number;
  featured?: boolean;
  newListing?: boolean;
  verified?: boolean;
  images: PropertyImage[];
  amenities: string[];
  agent: Agent;
  similarProperties?: string[]; // slugs de propiedades similares
}

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