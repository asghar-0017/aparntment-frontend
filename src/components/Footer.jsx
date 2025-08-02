import { Mail, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleTypeFilter = (type) => {
    navigate('/apartments', { state: { filterType: type } });
  };

  return (
    <footer className="bg-black text-white text-sm pt-12 pb-6">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6 border-b border-white/20 pb-10">
        <div>
          <h2 className="text-xl font-bold uppercase mb-2">
            Subscribe to our Newsletter!
          </h2>
          <p className="text-gray-400">
            Never miss anything from Construx by signing up to our newsletter.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 w-full p-3 rounded-sm text-black"
          />
          <button className="bg-[#b79264] px-6 py-3 text-white uppercase font-bold hover:bg-[#a67d47] transition">
            Submit
          </button>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 mt-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold uppercase flex items-center gap-2">
            <img 
              src="https://res.cloudinary.com/dwul2hfvj/image/upload/v1754079184/nisaiczumni7wpxc3idd.jpg" 
              alt="Homehubstay Logo" 
              className="w-8 h-8 rounded-full"
            />
            <span className="text-white">Homehubstay</span>
          </h2>
          <p className="text-gray-400 mt-4">
            At homehubstay, we believe finding your perfect home should be simple,
            inspiring, and stress-free. Thanks to your trust and enthusiasm,
            we've built a platform that helps connect renters with beautiful,
            thoughtfully curated apartments tailored to their lifestyle.
          </p>


        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold uppercase mb-4">Useful Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/about" className="hover:text-[#b79264] transition-colors">
                About
              </Link>
            </li>
            <li>
              <a 
                href="https://wa.me/923041513361" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#b79264] transition-colors"
              >
                Contact Us
              </a>
            </li>
            <li>
              <Link to="/faq" className="hover:text-[#b79264] transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Rooms & Suites */}
        <div>
          <h3 className="text-lg font-bold uppercase mb-4">Rooms & Suites</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <button 
                onClick={() => handleTypeFilter('classic')}
                className="hover:text-[#b79264] transition-colors cursor-pointer"
              >
                Classic
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleTypeFilter('luxury')}
                className="hover:text-[#b79264] transition-colors cursor-pointer"
              >
                Luxury
              </button>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold uppercase mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin className="text-[#b79264]" size={16} />
              Suit 705 Noor Trade Center Karachi
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-[#b79264]" size={16} />
              Sheerazahmed801@yahoo.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="text-[#b79264]" size={16} />
              <a 
                href="https://wa.me/923041513361" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#b79264] transition-colors"
              >
                (+92) 304-151-3361
              </a>
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 mt-10 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} Homehubstay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
