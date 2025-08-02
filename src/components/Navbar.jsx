import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`top-0 left-0 w-full z-50 text-white font-medium transition-all duration-300 ${
        scrolled ? "fixed bg-black shadow-md" : "absolute bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-widest flex items-center space-x-2"
        >
          <img 
            src="https://res.cloudinary.com/dwul2hfvj/image/upload/v1754079184/nisaiczumni7wpxc3idd.jpg" 
            alt="Homehubstay Logo" 
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white">Homehubstay</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wide">
          <Link to="/" className="hover:text-yellow-500">
            Home
          </Link>
          <Link to="/apartments" className="hover:text-yellow-500">
            Apartments
          </Link>
          <Link to="/about" className="hover:text-yellow-500">
            About
          </Link>
          <Link to="/more-about" className="hover:text-yellow-500">
            More About
          </Link>
          <a
            href="https://wa.me/+923041513361"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6 text-sm uppercase tracking-wide">
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
          <Link
            to="/"
            className="block hover:text-yellow-500"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/apartments"
            className="block hover:text-yellow-500"
            onClick={() => setIsOpen(false)}
          >
            Apartments
          </Link>
          <Link
            to="/about"
            className="block hover:text-yellow-500"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/more-about"
            className="block hover:text-yellow-500"
            onClick={() => setIsOpen(false)}
          >
            More About
          </Link>
          <a
            href="https://wa.me/+923041513361"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
