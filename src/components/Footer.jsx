import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaRss,
  FaLinkedinIn,
  FaGooglePlusG,
} from "react-icons/fa";

const Footer = () => {
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
            <span className="text-[#b79264]">👑</span> Rentio
          </h2>
          <p className="text-gray-400 mt-4">
            At Rentio, we believe finding your perfect home should be simple,
            inspiring, and stress-free. Thanks to your trust and enthusiasm,
            we've built a platform that helps connect renters with beautiful,
            thoughtfully curated apartments tailored to their lifestyle.
          </p>

          <div className="flex space-x-4 mt-4 text-[#b79264]">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaRss className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
            <FaGooglePlusG className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold uppercase mb-4">Useful Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>About</li>
            <li>Contact Us</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Rooms & Suites */}
        <div>
          <h3 className="text-lg font-bold uppercase mb-4">Rooms & Suites</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Classic</li>
            <li>Luxury</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold uppercase mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin className="text-[#b79264]" size={16} />
              92 Princess Road, Parkvenue, Greater London, NW18JR, United
              Kingdom
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-[#b79264]" size={16} />
              rantio@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="text-[#b79264]" size={16} />
              (+0091) 912-3456-073
            </li>
            <li className="flex items-center gap-2">
              {/* <Fax className="text-[#b79264]" size={16} /> */}
              (+0091) 912-3456-084
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 mt-10 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} Rentio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
