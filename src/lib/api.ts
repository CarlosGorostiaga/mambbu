const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'relevance';

export interface PropertyFilters {
  location?: string;
  type?: 'apartamento-colonial' | 'casa-independiente' | 'villa-playa' | 'penthouse' | 'palacete';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  status?: string;
  featured?: boolean;
  sortBy?: SortOption;
  page?: number;
  perPage?: number;
}

export async function fetchProperties(filters: PropertyFilters = {}) {
  const params = new URLSearchParams();

  if (filters.location) params.append('location', filters.location);
  if (filters.type) params.append('type', filters.type);
  if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
  if (filters.bedrooms) params.append('bedrooms', filters.bedrooms.toString());
  if (filters.status) params.append('status', filters.status);
  if (filters.featured !== undefined) params.append('featured', filters.featured.toString());
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.perPage) params.append('perPage', filters.perPage.toString());

  const url = `${API_URL}/properties?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch properties');
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

export async function fetchPropertyBySlug(slug: string) {
  const url = `${API_URL}/properties/${slug}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Property not found');
  }

  return response.json();
}
