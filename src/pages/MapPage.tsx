import { useEffect, useState, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

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
    setViewState((prev) => ({
      ...prev,
      longitude: church.geometry.coordinates[0],
      latitude: church.geometry.coordinates[1],
      zoom: Math.max(prev.zoom, 10),
    }));
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
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />
        <GeolocateControl position="top-right" />

        {churches.map((church, index) => (
          <Marker
            key={`${church.properties.name}-${index}`}
            longitude={church.geometry.coordinates[0]}
            latitude={church.geometry.coordinates[1]}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleMarkerClick(church);
            }}
          >
            <div className="cursor-pointer">
              <svg
                width="24"
                height="32"
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
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-[#0067b2] text-lg mb-1">
                {selectedChurch.properties.name}
              </h3>
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
          </Popup>
        )}
      </Map>

      {/* Church count overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
        <p className="text-gray-700 text-sm">
          <span className="font-semibold text-[#0067b2]">{churches.length}</span> churches
        </p>
      </div>
    </div>
  );
}
