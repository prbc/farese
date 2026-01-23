import { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import ListPage from './pages/ListPage';
import AboutPage from './pages/AboutPage';
import SubmitChurchPage from './pages/SubmitChurchPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Simple routing based on pathname
  const renderPage = () => {
    const path = currentPath.replace(/\/$/, ''); // Remove trailing slash

    switch (path) {
      case '':
      case '/index.html':
        return <HomePage />;
      case '/map':
        return <MapPage />;
      case '/list':
        return <ListPage />;
      case '/about':
        return <AboutPage />;
      case '/submit':
        return <SubmitChurchPage />;
      default:
        return <HomePage />;
    }
  };

  // Hide footer on map page for full-screen map experience
  const isMapPage = currentPath.replace(/\/$/, '') === '/map';

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-1">{renderPage()}</main>
      {!isMapPage && <Footer />}
    </div>
  );
}

export default App;
