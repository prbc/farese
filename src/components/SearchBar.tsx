import { useState, useEffect, useRef } from 'react';
import { useChurchSearch } from '../hooks/useChurchSearch';
import { useGeocoding } from '../hooks/useGeocoding';

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

interface SearchBarProps {
  churches: ChurchFeature[];
  onSelectChurch: (church: ChurchFeature) => void;
  onSelectPlace: (coordinates: [number, number]) => void;
}

interface SearchResult {
  type: 'church' | 'place';
  label: string;
  sublabel: string;
  coordinates: [number, number];
  data: any;
}

export default function SearchBar({ churches, onSelectChurch, onSelectPlace }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { search: searchChurches } = useChurchSearch(churches);
  const { geocode } = useGeocoding();

  // Handle search
  useEffect(() => {
    const performSearch = async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      // Search churches locally
      const churchResults = searchChurches(query);

      // Geocode for places (with debounce)
      const placeResults = await geocode(query);

      // Calculate distances for places (optional enhancement)
      const combinedResults: SearchResult[] = [
        ...churchResults.map(r => ({
          type: 'church' as const,
          label: r.item.properties.name,
          sublabel: r.item.properties.address,
          coordinates: r.item.geometry.coordinates as [number, number],
          data: r.item
        })),
        ...placeResults.map(r => ({
          type: 'place' as const,
          label: r.properties.name,
          sublabel: [r.properties.city, r.properties.state, r.properties.country]
            .filter(Boolean)
            .join(', ') || 'Place',
          coordinates: r.geometry.coordinates as [number, number],
          data: r
        }))
      ];

      setResults(combinedResults);
      setIsOpen(combinedResults.length > 0);
      setSelectedIndex(-1);
    };

    const timer = setTimeout(performSearch, 300);
    return () => clearTimeout(timer);
  }, [query, searchChurches, geocode]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          const result = results[selectedIndex];
          if (result) {
            handleSelectResult(result);
          }
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    if (result.type === 'church') {
      onSelectChurch(result.data);
    } else {
      onSelectPlace(result.coordinates);
    }
    setQuery('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={searchRef} className="search-bar-container">
      <div className="search-bar">
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search churches or places"
          className="search-input"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="search-clear"
            aria-label="Clear search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((result, idx) => (
            <button
              key={idx}
              className={`search-result-item ${idx === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelectResult(result)}
              onMouseEnter={() => setSelectedIndex(idx)}
            >
              <div className="search-result-icon">
                {result.type === 'church' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L12 6M12 6L8 6M12 6L16 6M6 10L18 10M9 10L9 22M15 10L15 22M6 22L18 22M4 10L4 22M20 10L20 22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
              <div className="search-result-text">
                <div className="search-result-label">{result.label}</div>
                <div className="search-result-sublabel">{result.sublabel}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
