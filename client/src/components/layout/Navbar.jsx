import { useState } from "react";
import { Link } from "react-router-dom";

import { FiHeart, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";

import { HiOutlineSparkles } from "react-icons/hi";

import logo from "../../assets/images/logo.png";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropdown";
import CategoriesDropdown from "./CategoriesDropdown";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-[1440px] mx-auto h-[88px] flex items-center justify-between px-5 lg:px-8">
        {/* ================= Logo ================= */}

        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src={logo}
            alt="Bictox"
            className="h-20 lg:h-[68px] w-auto object-contain"
          />
        </Link>

        {/* ================= Navigation ================= */}

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 ml-8 text-[15px] font-semibold text-gray-700">
          <Link to="/" className="hover:text-teal-600 transition">
            Home
          </Link>

          <Link to="/shop" className="hover:text-teal-600 transition">
            Shop
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <button className="hover:text-teal-600 transition font-semibold">
              Categories
            </button>

            <CategoriesDropdown isOpen={isCategoryOpen} />
          </div>

          <Link to="/about" className="hover:text-teal-600 transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-teal-600 transition">
            Contact
          </Link>
        </nav>

        {/* ================= Right Section ================= */}

        <div className="flex items-center gap-4">
          {/* Search */}

          <SearchBar />

          {/* Wishlist */}

          <button className="p-3 rounded-full hover:bg-gray-100 transition">
            <FiHeart size={22} />
          </button>

          {/* Cart */}

          <button className="relative p-3 rounded-full hover:bg-gray-100 transition">
            <FiShoppingCart size={22} />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] px-2 rounded-full">
              0
            </span>
          </button>

          {/* AI */}

          <button className="hidden lg:flex items-center gap-2 px-12 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg hover:scale-105 transition-all duration-300">
            <HiOutlineSparkles size={24} />

            <span className="font-medium">Bictox AI</span>
          </button>

          {/* User */}

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-3 rounded-full hover:bg-gray-100 transition"
            >
              <FiUser size={24} />
            </button>
            <ProfileDropdown isOpen={isProfileOpen} />
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-3 rounded-full hover:bg-gray-100 transition"
          >
            ☰
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Navbar;
