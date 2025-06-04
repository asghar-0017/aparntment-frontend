import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApartmentCard from '../components/ApartmentCard';
import { Helmet } from 'react-helmet'; // For SEO

const ApartmentDetails = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5152/apartments/${id}`);
        if (!res.ok) throw new Error('Failed to fetch apartment');
        const data = await res.json();
        setApartment(data);
      } catch (err) {
        setError('Error fetching apartment details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
        <Link
          to="/apartments"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Apartments
        </Link>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 text-lg font-semibold">Apartment not found.</p>
        <Link
          to="/apartments"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Apartments
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Helmet>
        <title>{apartment.title} | Your Luxury Stay</title>
        <meta property="og:title" content={apartment.title} />
        <meta property="og:image" content={apartment.image} />
        <meta
          property="og:description"
          content={`Book ${apartment.title} for PKR ${apartment.pricePerDay.toLocaleString()}/day in ${apartment.city}`}
        />
        <meta property="og:url" content={`http://localhost:5173/apartments/${apartment._id}`} />
      </Helmet>
      <Link
        to="/apartments"
        className="inline-block mb-8 text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-200"
      >
        ← Back to Apartments
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative">
          <img
            src={apartment.image}
            alt={apartment.title}
            className="w-full h-[500px] object-cover rounded-2xl shadow-xl transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-lg">
            {apartment.type.toUpperCase()}
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{apartment.title}</h1>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Location:</span> {apartment.city}
          </p>
          <p className="text-2xl font-extrabold text-yellow-600">
            PKR {apartment.pricePerDay.toLocaleString()}/day
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            <span className="font-semibold">Amenities:</span> {apartment.amenities.join(', ')}
          </p>
          <div className="border-t border-gray-200 pt-6">
            <ApartmentCard apartment={apartment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetails;