import { useEffect, useState, useCallback, useRef } from 'react';
import Map, { Marker, Popup, MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './MapPage.css';
import SearchBar from '../components/SearchBar';

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

interface ChurchData {
  type: 'FeatureCollection';
  features: ChurchFeature[];
}

export default function MapPage() {
  const mapRef = useRef<MapRef>(null);
  const [churches, setChurches] = useState<ChurchFeature[]>([]);
  const [selectedChurch, setSelectedChurch] = useState<ChurchFeature | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 3.5,
  });

  useEffect(() => {
    fetch('/map/data.json')
      .then((res) => res.json())
      .then((data: ChurchData) => {
        setChurches(data.features);
      })
      .catch((err) => console.error('Error loading church data:', err));
  }, []);

  const handleMarkerClick = useCallback((church: ChurchFeature) => {
    setSelectedChurch(church);
    // Smooth fly-to animation
    mapRef.current?.flyTo({
      center: [church.geometry.coordinates[0], church.geometry.coordinates[1]],
      zoom: Math.max(viewState.zoom, 10),
      duration: 1500,
    });
  }, [viewState.zoom]);

  const handleSelectChurch = useCallback((church: ChurchFeature) => {
    setSelectedChurch(church);
    mapRef.current?.flyTo({
      center: [church.geometry.coordinates[0], church.geometry.coordinates[1]],
      zoom: 12,
      duration: 1500,
    });
  }, []);

  const handleSelectPlace = useCallback((coordinates: [number, number], name: string) => {
    mapRef.current?.flyTo({
      center: coordinates,
      zoom: 10,
      duration: 1500,
    });
  }, []);

  // Clean up HTML in notes
  const cleanNote = (note: string | undefined): string => {
    if (!note) return '';
    return note
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();
  };

  return (
    <div className="h-[calc(100vh-64px)] relative">
      <SearchBar
        churches={churches}
        onSelectChurch={handleSelectChurch}
        onSelectPlace={handleSelectPlace}
      />
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        onClick={() => setSelectedChurch(null)}
        style={{ width: '100%', height: '100%' }}
      >

        {churches.map((church, index) => (
          <Marker
            key={`${church.properties.name}-${index}`}
            longitude={church.geometry.coordinates[0]}
            latitude={church.geometry.coordinates[1]}
            anchor="top"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleMarkerClick(church);
            }}
          >
            <div className="cursor-pointer flex flex-col items-center">
              <svg
                width="20"
                height="26"
                viewBox="0 0 24 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-md hover:scale-110 transition-transform"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                  fill="#0067b2"
                />
                <circle cx="12" cy="12" r="5" fill="white" />
              </svg>
              {viewState.zoom >= 6 && (
                <span className="church-label text-[10px] font-medium text-gray-800 bg-white/90 px-1 rounded shadow-sm whitespace-nowrap max-w-[120px] truncate mt-0.5">
                  {church.properties.name}
                </span>
              )}
            </div>
          </Marker>
        ))}

        {selectedChurch && (
          <Popup
            longitude={selectedChurch.geometry.coordinates[0]}
            latitude={selectedChurch.geometry.coordinates[1]}
            anchor="bottom"
            onClose={() => setSelectedChurch(null)}
            closeOnClick={false}
            className="church-popup"
            offset={[0, -30]}
          >
            <div className="church-popup-content">
              <div className="church-popup-header">
                {selectedChurch.properties.name}
              </div>
              <div className="church-popup-body">
                <p className="text-gray-700 text-sm mb-2">
                  {selectedChurch.properties.address}
                </p>
                {selectedChurch.properties.website && (
                  <a
                    href={`https://${selectedChurch.properties.website.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0083e0] hover:underline text-sm block mb-2"
                  >
                    {selectedChurch.properties.website}
                  </a>
                )}
                {selectedChurch.properties.note && (
                  <p className="text-gray-600 text-xs whitespace-pre-line">
                    {cleanNote(selectedChurch.properties.note)}
                  </p>
                )}
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
