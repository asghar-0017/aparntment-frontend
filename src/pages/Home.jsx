import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ApartmentCard from '../components/ApartmentCard';

const Home = () => {
  const [apartments, setApartments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeType, setActiveType] = useState('classic'); // default

  useEffect(() => {
    const fetchApartments = async () => {
      const res = await fetch('http://localhost:5152/get-apparntment');
      const data = await res.json();
      setApartments(data);
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
          {filtered.map((apt) => (
            <ApartmentCard key={apt._id} apartment={apt} />
          ))}
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
