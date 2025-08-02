import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ApartmentCard from '../components/ApartmentCard';
import DateSearch from "../components/AvailabilityForm";
import apiService from '../services/api.js';

const Home = () => {
  const [apartments, setApartments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeType, setActiveType] = useState('classic'); // default

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await apiService.getApartments();
        setApartments(data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
        setApartments([]);
      }
    };

    fetchApartments();
  }, []);

  useEffect(() => {
    const filteredList = apartments.filter(
      (apt) => apt.type.toLowerCase() === activeType
    );
    setFiltered(filteredList);
  }, [activeType, apartments]);

  return (
    <div>
      <HeroSection />
<section className="py-10 px-6 max-w-7xl mx-auto">
  <DateSearch />
</section>
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="flex justify-center gap-4 mb-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((apt) => (
              <ApartmentCard key={apt._id} apartment={apt} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No {activeType} apartments available at the moment.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/apartments"
            className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
          >
            View All Apartments
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
