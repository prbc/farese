import { useMemo } from 'react';
import Fuse from 'fuse.js';

interface ChurchProperties {
  name: string;
  address: string;
  region: string;
  website?: string;
  note?: string;
}

interface ChurchFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: ChurchProperties;
}

export function useChurchSearch(churches: ChurchFeature[]) {
  const fuse = useMemo(() => {
    return new Fuse(churches, {
      keys: [
        { name: 'properties.name', weight: 2 },
        { name: 'properties.address', weight: 1.5 },
        { name: 'properties.region', weight: 1 },
        { name: 'properties.note', weight: 0.5 }
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true
    });
  }, [churches]);

  const search = (query: string) => {
    if (!query || query.length < 2) return [];
    return fuse.search(query).slice(0, 10);
  };

  return { search };
}
