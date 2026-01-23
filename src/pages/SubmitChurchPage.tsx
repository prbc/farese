import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const churchSchema = z.object({
  action: z.enum(['add', 'edit', 'delete']),
  name: z.string().min(2, 'Name must be at least 2 characters').max(200),
  address: z.string().min(5, 'Address is required').max(500),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  region: z.string().min(2, 'Region is required').max(10),
  note: z.string().max(1000).optional(),
  submitterEmail: z.string().email('Valid email required'),
  submitterNotes: z.string().max(500).optional(),
});

type ChurchFormData = z.infer<typeof churchSchema>;

interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

const REGIONS = [
  { code: 'USA', name: 'United States' },
  { code: 'CAN', name: 'Canada' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'AUS', name: 'Australia' },
  { code: 'EUR', name: 'Europe' },
  { code: 'AFR', name: 'Africa' },
  { code: 'ASIA', name: 'Asia' },
  { code: 'SA', name: 'South America' },
  { code: 'OTHER', name: 'Other' },
];

export default function SubmitChurchPage() {
  const [coordinates, setCoordinates] = useState<{ lng: number; lat: number } | null>(null);
  const [geocodingResults, setGeocodingResults] = useState<GeocodingResult[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [addressQuery, setAddressQuery] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ChurchFormData>({
    resolver: zodResolver(churchSchema),
    defaultValues: {
      action: 'add',
      region: 'USA',
    },
  });

  const action = watch('action');

  // Debounced geocoding search
  useEffect(() => {
    if (addressQuery.length < 5) {
      setGeocodingResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsGeocoding(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressQuery)}&format=json&limit=5`,
          {
            headers: {
              'User-Agent': 'Farese.com Church Directory (contact: admin@farese.com)',
            },
          }
        );
        const data = await response.json();
        setGeocodingResults(data);
      } catch (error) {
        console.error('Geocoding error:', error);
      } finally {
        setIsGeocoding(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [addressQuery]);

  const handleAddressSelect = useCallback(
    (result: GeocodingResult) => {
      setValue('address', result.display_name);
      setCoordinates({
        lng: parseFloat(result.lon),
        lat: parseFloat(result.lat),
      });
      setGeocodingResults([]);
      setAddressQuery(result.display_name);
    },
    [setValue]
  );

  const handleMarkerDrag = useCallback((event: { lngLat: { lng: number; lat: number } }) => {
    setCoordinates({
      lng: event.lngLat.lng,
      lat: event.lngLat.lat,
    });
  }, []);

  const onSubmit = async (data: ChurchFormData) => {
    if (!coordinates) {
      setSubmitStatus('error');
      setSubmitMessage('Please select a location on the map');
      return;
    }

    setSubmitStatus('submitting');

    try {
      const payload = {
        action: data.action,
        church: {
          name: data.name,
          address: data.address,
          website: data.website || undefined,
          region: data.region,
          note: data.note || undefined,
        },
        geometry: {
          type: 'Point',
          coordinates: [coordinates.lng, coordinates.lat],
        },
        submitter: {
          email: data.submitterEmail,
          notes: data.submitterNotes,
        },
      };

      const response = await fetch('https://farese-api.pig.workers.dev/api/submit-church', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const result = await response.json();
      setSubmitStatus('success');
      setSubmitMessage(`Submission successful! PR created: ${result.prUrl || 'Pending review'}`);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Submission failed. Please try again or contact us directly.');
      console.error('Submit error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#003052] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Submit Church Update
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Suggest a new church, update existing information, or report a closure
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Action Type */}
          <div className="bg-[#004a77] rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              What would you like to do?
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                { value: 'add', label: 'Add New Church', color: 'green' },
                { value: 'edit', label: 'Update Existing', color: 'blue' },
                { value: 'delete', label: 'Report Closure', color: 'red' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border-2 transition-colors ${
                    action === option.value
                      ? option.color === 'green'
                        ? 'border-green-500 bg-green-500/20 text-green-400'
                        : option.color === 'blue'
                          ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                          : 'border-red-500 bg-red-500/20 text-red-400'
                      : 'border-gray-600 text-gray-400 hover:border-[#0067b2]'
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register('action')}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Church Details */}
          <div className="bg-[#004a77] rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Church Details</h2>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Church Name *
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full px-4 py-2 rounded-lg bg-[#00395e] text-white border border-[#0067b2] focus:border-[#0067b2] focus:ring-1 focus:ring-[#0067b2] outline-none"
                placeholder="e.g., Grace Reformed Baptist Church"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Address with Geocoding */}
            <div className="relative">
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                Address *
              </label>
              <input
                type="text"
                id="address"
                value={addressQuery}
                onChange={(e) => setAddressQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#00395e] text-white border border-[#0067b2] focus:border-[#0067b2] focus:ring-1 focus:ring-[#0067b2] outline-none"
                placeholder="Start typing to search..."
              />
              <input type="hidden" {...register('address')} />
              {isGeocoding && (
                <p className="text-gray-400 text-sm mt-1">Searching...</p>
              )}
              {geocodingResults.length > 0 && (
                <ul className="absolute z-10 w-full bg-[#00395e] border border-[#0067b2] rounded-lg mt-1 max-h-60 overflow-auto shadow-lg">
                  {geocodingResults.map((result, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-500 cursor-pointer text-white text-sm"
                      onClick={() => handleAddressSelect(result)}
                    >
                      {result.display_name}
                    </li>
                  ))}
                </ul>
              )}
              {errors.address && (
                <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* Map Preview */}
            {coordinates && (
              <div className="h-64 rounded-lg overflow-hidden border border-[#0067b2]">
                <Map
                  initialViewState={{
                    longitude: coordinates.lng,
                    latitude: coordinates.lat,
                    zoom: 14,
                  }}
                  mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                  style={{ width: '100%', height: '100%' }}
                >
                  <NavigationControl position="top-right" />
                  <Marker
                    longitude={coordinates.lng}
                    latitude={coordinates.lat}
                    draggable
                    onDragEnd={handleMarkerDrag}
                  >
                    <div className="cursor-move">
                      <svg
                        width="32"
                        height="42"
                        viewBox="0 0 24 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg"
                      >
                        <path
                          d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                          fill="#0067b2"
                        />
                        <circle cx="12" cy="12" r="5" fill="white" />
                      </svg>
                    </div>
                  </Marker>
                </Map>
                <p className="text-gray-400 text-xs mt-1 text-center">
                  Drag the marker to adjust the exact location
                </p>
              </div>
            )}

            {/* Region */}
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-1">
                Region *
              </label>
              <select
                id="region"
                {...register('region')}
                className="w-full px-4 py-2 rounded-lg bg-[#00395e] text-white border border-[#0067b2] focus:border-[#0067b2] focus:ring-1 focus:ring-[#0067b2] outline-none"
              >
                {REGIONS.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </select>
              {errors.region && (
                <p className="text-red-400 text-sm mt-1">{errors.region.message}</p>
              )}
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                Website (optional)
              </label>
              <input
                type="url"
                id="website"
                {...register('website')}
                className="w-full px-4 py-2 rounded-lg bg-[#00395e] text-white border border-[#0067b2] focus:border-[#0067b2] focus:ring-1 focus:ring-[#0067b2] outline-none"
                placeholder="https://www.example.com"
              />
              {errors.website && (
                <p className="text-red-400 text-sm mt-1">{errors.website.message}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-1">
                Additional Info (optional)
              </label>
              <textarea
                id="note"
                {...register('note')}
                rows={3}
                className="w-full px-4 py-2 rounded-lg bg-[#00395e] text-white border border-[#0067b2] focus:border-[#0067b2] focus:ring-1 focus:ring-[#0067b2] outline-none resize-none"
                placeholder="Pastor name, phone number, service times, etc."
              />
            </div>
          </div>

          {/* Submitter Info */}
          <div className="bg-[#004a77] rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Your Information</h2>

            <div>
              <label htmlFor="submitterEmail" className="block text-sm font-medium text-gray-300 mb-1">
                Your Email *
              </label>
              <input
                type="email"
                id="submitterEmail"
                {...register('submitterEmail')}
                className="w-full px-4 py-2 rounded-lg bg-[#00395e] text-white border border-[#0067b2] focus:border-[#0067b2] focus:ring-1 focus:ring-[#0067b2] outline-none"
                placeholder="your@email.com"
              />
              <p className="text-gray-500 text-xs mt-1">
                We may contact you if we have questions about this submission
              </p>
              {errors.submitterEmail && (
                <p className="text-red-400 text-sm mt-1">{errors.submitterEmail.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="submitterNotes" className="block text-sm font-medium text-gray-300 mb-1">
                Reason for Update (optional)
              </label>
              <textarea
                id="submitterNotes"
                {...register('submitterNotes')}
                rows={2}
                className="w-full px-4 py-2 rounded-lg bg-[#00395e] text-white border border-[#0067b2] focus:border-[#0067b2] focus:ring-1 focus:ring-[#0067b2] outline-none resize-none"
                placeholder="How do you know about this church?"
              />
            </div>
          </div>

          {/* Submit Status */}
          {submitStatus !== 'idle' && (
            <div
              className={`p-4 rounded-lg ${
                submitStatus === 'success'
                  ? 'bg-green-500/20 text-green-400 border border-green-500'
                  : submitStatus === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500'
              }`}
            >
              {submitStatus === 'submitting' ? 'Submitting...' : submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitStatus === 'submitting'}
            className="w-full py-3 px-6 rounded-lg bg-[#0067b2] hover:bg-[#005a9e] text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitStatus === 'submitting' ? 'Submitting...' : 'Submit for Review'}
          </button>

          <p className="text-gray-500 text-sm text-center">
            Submissions are reviewed before being added to the directory.
            This helps us maintain accurate information.
          </p>
        </form>
      </div>
    </div>
  );
}
