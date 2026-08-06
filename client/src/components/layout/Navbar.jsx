import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { FiHeart, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";

import { HiOutlineSparkles } from "react-icons/hi";

import logo from "../../assets/images/logo.png";
import MobileMenu from "./MobileMenu";
import ProfileDropdown from "./ProfileDropDown";
import CategoriesDropdown from "./CategoriesDropdown";
import SearchBar from "./SearchBar";
import { getUser, logout } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const profileRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const user = getUser();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-[1440px] mx-auto h-[88px] flex items-center justify-between px-5 lg:px-8">
        {/* ================= Logo ================= */}

        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src={logo}
            alt="Bictox"
            className="h-25 lg:h-[95px] w-auto object-contain"
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
            <Link
              to="/categories"
              className="hover:text-teal-600 transition font-semibold"
            >
              Categories
            </Link>
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

          <Link
            to="/wishlist"
            className="p-3 rounded-full hover:bg-gray-100 transition"
          >
            <FiHeart size={22} />
          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            className="relative p-3 rounded-full hover:bg-gray-100 transition"
          >
            <FiShoppingCart size={22} />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] px-2 rounded-full">
              0
            </span>
          </Link>

          {/* AI */}

          <Link to="/bictox-ai">
            <button className="hidden lg:flex items-center gap-2 px-12 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg hover:scale-105 transition-all duration-300">
              <HiOutlineSparkles size={24} />
              <span className="font-medium">Bictox AI</span>
            </button>
          </Link>

          {/* User */}

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-3 rounded-full hover:bg-gray-100 transition"
            >
              <FiUser size={24} />
            </button>
            <ProfileDropdown
              isOpen={isProfileOpen}
              handleLogout={handleLogout}
            />
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
