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
        const res = await fetch('http://localhost:5152/get-apparntment');
        if (!res.ok) throw new Error('Failed to fetch apartments');
        const data = await res.json();
        setApartments(data);
      } catch (err) {
        setError('Error fetching apartments. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartments();
  }, []);

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {apartments.length === 0 ? (
        <p className="text-center col-span-full">No apartments available.</p>
      ) : (
        apartments.map((apt) => (
          <ApartmentCard key={apt._id} apartment={apt} />
        ))
      )}
    </div>
  );
};

export default Apartments;