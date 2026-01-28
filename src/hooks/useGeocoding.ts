import { useState, useCallback } from 'react';

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

export function useGeocoding() {
  const [isLoading, setIsLoading] = useState(false);

  const geocode = useCallback(async (query: string): Promise<GeocodingFeature[]> => {
    if (!query || query.length < 3) return [];

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      return data.features || [];
    } catch (error) {
      console.error('Geocoding error:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { geocode, isLoading };
}
