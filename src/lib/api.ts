const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

export interface PropertyFilters {
  location?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  status?: string;
  sortBy?: string;
  page?: number;
  perPage?: number;
}

export async function fetchProperties(filters: PropertyFilters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const url = `${API_URL}/properties?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching properties');
  }

  return response.json();
}

export async function fetchPropertyBySlug(slug: string) {
  const url = `${API_URL}/properties/${slug}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Property not found');
  }

  return response.json();
}
