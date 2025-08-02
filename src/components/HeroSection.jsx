import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';

const images = [
    slide1,
    slide2,
    slide3,
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Backgrounds */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-start px-6 md:px-20">
        <h2 className="text-xl md:text-2xl text-yellow-500 font-semibold mb-2">HOMEHUBSTAY</h2>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-3xl">
          YOUR PERFECT HOME AWAITS. COMFORT, LUXURY, MEMORIES.
        </h1>
        <Link
          to="/more-about"
          className="mt-6 bg-yellow-600 text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-yellow-700 transition inline-block"
        >
          More About →
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
