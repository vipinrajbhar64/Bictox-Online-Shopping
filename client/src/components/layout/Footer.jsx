import { Link } from "react-router-dom";
import logoWhite from "../../assets/images/logo-white.png";

import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiGithub,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white mt-20 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        {/* Top */}
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Logo */}

          <div>
            <img
              src={logoWhite}
              alt="Bictox Logo"
              className="h-16 hover:scale-105 transition duration-300"
            />
            <p className="mt-5 text-gray-400 leading-7">
              Buy It Conveniently Through Online Experience. Premium Fashion
              Store built with modern technology.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-cyan-600 transition flex items-center justify-center"
              >
                <FiFacebook size={20} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-pink-600 transition flex items-center justify-center"
              >
                <FiInstagram size={20} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center"
              >
                <FiLinkedin size={20} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gray-700 transition flex items-center justify-center"
              >
                <FiGithub size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}

          <div>
            <h3 className="text-xl font-bold mb-5">Shop</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  to="/shop"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/new-collection"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  New Collection
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="text-xl font-bold mb-5">Company</h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/bictox-ai"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  AI Assistant
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="hover:text-cyan-400 transition duration-300"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}

          <div>
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
              <FiMail className="text-cyan-400" />
              Newsletter
            </h3>
            <p className="text-gray-400 mb-5">
              Subscribe to receive latest updates and offers.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl px-4 py-3 bg-slate-800 border border-slate-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 outline-none transition"
            />

            <button className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 hover:scale-105 transition-all duration-300 rounded-xl py-3 font-semibold shadow-lg shadow-cyan-500/20">
              Join Newsletter
            </button>
          </div>
        </div>
        {/* Bottom */}
        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col lg:flex-row items-center justify-between gap-5">
          <p className="text-gray-400 text-sm">
            © 2026 <span className="font-semibold text-cyan-400">Bictox</span>.
            All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              Support
            </Link>
          </div>

          <p className="text-gray-400 text-sm">Powered by Bictox Technology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
