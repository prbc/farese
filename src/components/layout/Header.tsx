import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0067b2] border border-[#0067b2]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Brand */}
          <a href="/" className="text-white text-xl font-semibold">
            Farese.com
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="text-white md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex md:items-center md:space-x-6 text-white">
            <li>
              <a href="/" className="hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-200">
                About
              </a>
            </li>
            <li>
              <a href="/map" className="hover:text-gray-200">
                Map
              </a>
            </li>
            <li>
              <a href="/list" className="hover:text-gray-200">
                List
              </a>
            </li>
            <li>
              <a href="/legacy" className="hover:text-gray-200">
                Legacy
              </a>
            </li>
            <li>
              <a href="/submit" className="px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors">
                Submit
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <ul className="md:hidden pb-4 text-center space-y-2 text-white">
            <li>
              <a href="/" className="block py-2 hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="block py-2 hover:text-gray-200">
                About
              </a>
            </li>
            <li>
              <a href="/map" className="block py-2 hover:text-gray-200">
                Map
              </a>
            </li>
            <li>
              <a href="/list" className="block py-2 hover:text-gray-200">
                List
              </a>
            </li>
            <li>
              <a href="/legacy" className="block py-2 hover:text-gray-200">
                Legacy
              </a>
            </li>
            <li>
              <a href="/submit" className="block py-2 hover:text-gray-200">
                Submit Update
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
