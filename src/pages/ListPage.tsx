import { useEffect, useState, useMemo } from 'react';

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

type SortField = 'name' | 'region' | 'address';
type SortDirection = 'asc' | 'desc';

const REGION_NAMES: Record<string, string> = {
  AUS: 'Australia',
  CAN: 'Canada',
  EUR: 'Europe',
  UK: 'United Kingdom',
  USA: 'United States',
  AFR: 'Africa',
  ASIA: 'Asia',
  SA: 'South America',
  OTHER: 'Other',
};

export default function ListPage() {
  const [churches, setChurches] = useState<ChurchFeature[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    fetch('/map/data.json')
      .then((res) => res.json())
      .then((data: ChurchData) => {
        setChurches(data.features);
      })
      .catch((err) => console.error('Error loading church data:', err));
  }, []);

  // Get unique regions
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(churches.map((c) => c.properties.region))];
    return uniqueRegions.sort();
  }, [churches]);

  // Filter and sort churches
  const filteredChurches = useMemo(() => {
    let result = churches;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.properties.name.toLowerCase().includes(term) ||
          c.properties.address.toLowerCase().includes(term)
      );
    }

    // Filter by region
    if (regionFilter !== 'all') {
      result = result.filter((c) => c.properties.region === regionFilter);
    }

    // Sort
    result = [...result].sort((a, b) => {
      let aVal: string;
      let bVal: string;

      switch (sortField) {
        case 'name':
          aVal = a.properties.name;
          bVal = b.properties.name;
          break;
        case 'region':
          aVal = a.properties.region;
          bVal = b.properties.region;
          break;
        case 'address':
          aVal = a.properties.address;
          bVal = b.properties.address;
          break;
      }

      const comparison = aVal.localeCompare(bVal);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [churches, searchTerm, regionFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-[#0067b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-[#0067b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Church Directory
        </h1>

        {/* Search and Filter Controls */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:border-[#0067b2] focus:ring-1 focus:ring-[#0067b2] outline-none"
              />
            </div>

            {/* Region Filter */}
            <div className="md:w-48">
              <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-1">
                Region
              </label>
              <select
                id="region"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-600 text-white border border-gray-500 focus:border-[#0067b2] focus:ring-1 focus:ring-[#0067b2] outline-none"
              >
                <option value="all">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {REGION_NAMES[region] || region}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-400 text-sm mt-3">
            Showing {filteredChurches.length} of {churches.length} churches
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0067b2] text-white">
                <tr>
                  <th
                    className="px-4 py-3 text-left cursor-pointer hover:bg-[#005a9e] transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Name
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left cursor-pointer hover:bg-[#005a9e] transition-colors hidden md:table-cell"
                    onClick={() => handleSort('address')}
                  >
                    <div className="flex items-center gap-2">
                      Address
                      <SortIcon field="address" />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left cursor-pointer hover:bg-[#005a9e] transition-colors"
                    onClick={() => handleSort('region')}
                  >
                    <div className="flex items-center gap-2">
                      Region
                      <SortIcon field="region" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Website</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredChurches.map((church, index) => (
                  <tr
                    key={`${church.properties.name}-${index}`}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {church.properties.name}
                      </div>
                      <div className="text-sm text-gray-500 md:hidden">
                        {church.properties.address}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 hidden md:table-cell">
                      {church.properties.address}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {REGION_NAMES[church.properties.region] || church.properties.region}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {church.properties.website && (
                        <a
                          href={`https://${church.properties.website.replace(/^https?:\/\//, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0083e0] hover:underline text-sm"
                        >
                          {church.properties.website}
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredChurches.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No churches found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
