import React, { useEffect, useState } from 'react';
import ApartmentCard from '../components/ApartmentCard';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setIsLoading(true);
        
        const res = await fetch('/api/get-apparntment', {
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
          setError('Unable to connect to server. Please make sure the backend is running on port 5152.');
        } else {
          setError(`Error fetching apartments: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartments();
  }, []);

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
              <li>1. Make sure the backend server is running on port 5152</li>
              <li>2. Check that the database is connected</li>
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

      {/* Apartments Grid Section */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        {apartments.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Apartments Available</h3>
            <p className="text-gray-500">Check back later for new listings.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {apartments.map((apt) => (
                <ApartmentCard key={apt._id} apartment={apt} />
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center mt-12 text-gray-600">
              <p className="text-lg">
                Showing {apartments.length} apartment{apartments.length !== 1 ? 's' : ''}
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Apartments;