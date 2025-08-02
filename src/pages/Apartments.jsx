import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ApartmentCard from '../components/ApartmentCard';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeType, setActiveType] = useState('all');
  const location = useLocation();

  useEffect(() => {
    // Check if there's a filter type in the location state
    if (location.state?.filterType) {
      setActiveType(location.state.filterType);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setIsLoading(true);
        
        const res = await fetch('https://aparntment-rental-frontend.vercel.app/get-apparntment', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch apartments: ${res.status} ${errorText}`);
        }
        
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setApartments(data);
        } else {
          setApartments([]);
        }
      } catch (err) {
        console.error('Error fetching apartments:', err);
        if (err.message.includes('Failed to fetch')) {
          setError('Unable to connect to server. Please check your internet connection.');
        } else {
          setError(`Error fetching apartments: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartments();
  }, []);

  useEffect(() => {
    if (activeType === 'all') {
      setFilteredApartments(apartments);
    } else {
      const filtered = apartments.filter(
        (apt) => apt.type?.toLowerCase() === activeType.toLowerCase()
      );
      setFilteredApartments(filtered);
    }
  }, [activeType, apartments]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-lg font-semibold mb-4">{error}</div>
          <div className="text-gray-600 mb-6">
            <p className="mb-2">To fix this issue:</p>
            <ol className="text-sm text-left space-y-1">
              <li>1. Check your internet connection</li>
              <li>2. Make sure the backend server is running</li>
              <li>3. Verify there are apartments in the database</li>
            </ol>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Apartments
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect stay with our carefully curated selection of premium apartments
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-6 px-6 max-w-7xl mx-auto">
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeType === 'all'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
            }`}
            onClick={() => setActiveType('all')}
          >
            All
          </button>
          <button
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeType === 'classic'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
            }`}
            onClick={() => setActiveType('classic')}
          >
            Classic
          </button>
          <button
            className={`px-5 py-2 rounded-full font-semibold transition ${
              activeType === 'luxury'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-yellow-100'
            }`}
            onClick={() => setActiveType('luxury')}
          >
            Luxury
          </button>
        </div>
      </section>

      {/* Apartments Grid Section */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        {filteredApartments.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              {activeType === 'all' ? 'No Apartments Available' : `No ${activeType.charAt(0).toUpperCase() + activeType.slice(1)} Apartments`}
            </h3>
            <p className="text-gray-500">
              {activeType === 'all' ? 'Check back later for new listings.' : `No ${activeType} apartments found. Try selecting a different category.`}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredApartments.map((apt) => (
                <ApartmentCard key={apt._id} apartment={apt} />
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center mt-12 text-gray-600">
              <p className="text-lg">
                Showing {filteredApartments.length} apartment{filteredApartments.length !== 1 ? 's' : ''}
                {activeType !== 'all' && ` in ${activeType.charAt(0).toUpperCase() + activeType.slice(1)} category`}
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Apartments;