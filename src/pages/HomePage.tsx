import { useEffect, useState } from 'react';

export default function HomePage() {
  const [churchCount, setChurchCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/map/data.json')
      .then((res) => res.json())
      .then((data) => {
        setChurchCount(data.features.length);
      })
      .catch((err) => console.error('Error loading church data:', err));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#0067b2] border border-[#0067b2] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome to an online directory
          </h1>
          <h2 className="text-2xl md:text-3xl">of Reformed Baptist churches</h2>
        </div>
      </div>

      {/* About and Disclaimer Section */}
      <div className="bg-gray-700 border border-gray-700 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* About */}
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-white text-center mb-4">
                About
              </h2>
              <p className="text-[#adddff] text-justify">
                This directory of Reformed Baptist churches is a collection of{' '}
                {churchCount !== null ? (
                  <span className="font-semibold">{churchCount}</span>
                ) : (
                  '...'
                )}{' '}
                churches that hold to the 1689 London Baptist Confession of Faith
                or a similar statement of faith. It is our desire that this list
                would be used of God to help Christians find a church when
                considering a move, or when planning a trip.
              </p>
            </div>

            {/* Quick Disclaimer */}
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-white text-center mb-4">
                Quick Disclaimer
              </h2>
              <p className="text-[#adddff] text-justify">
                We do not personally know all of these churches nor can we
                recommend them from personal knowledge. Some of the churches
                listed in this directory may not be considered by all to be
                distinctly Reformed. However, they would be like-minded in several
                areas of faith and practice and so are listed on this directory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Find a Church Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold text-[#0067b2] mb-4">
                Find a church
              </h2>
              <p className="text-gray-800 text-lg leading-relaxed">
                Visit the{' '}
                <a href="/map" className="text-[#0083e0] hover:underline">
                  map
                </a>{' '}
                to search by location to find a church nearby, whether at home or
                traveling.
              </p>
            </div>
            <div className="flex justify-center">
              <a href="/map">
                <img
                  src="/img/map-preview.png"
                  alt="Map preview"
                  className="rounded-lg shadow-lg max-w-full h-auto hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
