import { useState, useCallback } from 'react';

interface GeocodingResult {
  name: string;
  coordinates: [number, number];
  city?: string;
  state?: string;
  country?: string;
}

interface GeocodingFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    name: string;
    country?: string;
    state?: string;
    city?: string;
  };
}

// Use backend API in production, fall back to Photon in development
const API_BASE_URL = import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'https://photon.komoot.io' : 'https://api-dev.farese.com');

export function useGeocoding() {
  const [isLoading, setIsLoading] = useState(false);

  const geocode = useCallback(async (query: string): Promise<GeocodingFeature[]> => {
    if (!query || query.length < 3) return [];

    setIsLoading(true);
    try {
      // Check if using our backend API or Photon directly
      const isBackendAPI = !API_BASE_URL.includes('photon.komoot.io');

      if (isBackendAPI) {
        // Use our backend API
        const response = await fetch(
          `${API_BASE_URL}/v1/geocode?q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await response.json();

        // Convert backend format to GeoJSON format
        const results: GeocodingResult[] = data.results || [];
        return results.map(result => ({
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: result.coordinates
          },
          properties: {
            name: result.name,
            city: result.city,
            state: result.state,
            country: result.country
          }
        }));
      } else {
        // Fall back to Photon directly (development)
        const response = await fetch(
          `${API_BASE_URL}/api/?q=${encodeURIComponent(query)}&limit=5`
        );
        const data = await response.json();
        return data.features || [];
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { geocode, isLoading };
}
