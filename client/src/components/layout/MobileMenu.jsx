import { Link } from "react-router-dom";
import {
  FiX,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiHome,
  FiGrid,
  FiInfo,
  FiPhone,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose}></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[320px] bg-white z-50 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-cyan-600 tracking-wide">
              BICTOX
            </h2>
            <p className="text-xs text-gray-500">Premium Fashion Store</p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-6 py-4 space-y-1">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 py-4 border-b border-gray-100 hover:text-cyan-600 transition"
          >
            <FiHome size={20} />
            Home
          </Link>

          <Link
            to="/shop"
            onClick={onClose}
            className="flex items-center gap-3 py-4 border-b border-gray-100 hover:text-cyan-600 transition"
          >
            <FiShoppingCart size={20} />
            Shop
          </Link>

          <Link
            to="/new"
            onClick={onClose}
            className="flex items-center justify-between py-4 border-b border-gray-100 hover:text-cyan-600 transition"
          >
            <div className="flex items-center gap-3">
              <HiOutlineSparkles size={20} />
              New Collection
            </div>

            <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">
              NEW
            </span>
          </Link>

          <Link
            to="/categories"
            onClick={onClose}
            className="flex items-center gap-3 py-4 border-b border-gray-100 hover:text-cyan-600 transition"
          >
            <FiGrid size={20} />
            Categories
          </Link>

          <Link
            to="/about"
            onClick={onClose}
            className="flex items-center gap-3 py-4 border-b border-gray-100 hover:text-cyan-600 transition"
          >
            <FiInfo size={20} />
            About
          </Link>

          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center gap-3 py-4 border-b border-gray-100 hover:text-cyan-600 transition"
          >
            <FiPhone size={20} />
            Contact
          </Link>
        </nav>

        {/* User */}
        <div className="px-6 mt-4 space-y-5">
          <button className="flex items-center gap-3 text-gray-700 hover:text-cyan-600 transition">
            <FiHeart size={20} />
            Wishlist
          </button>

          <button className="flex items-center gap-3 text-gray-700 hover:text-cyan-600 transition">
            <FiShoppingCart size={20} />
            Cart
          </button>

          <button className="flex items-center gap-3 text-gray-700 hover:text-cyan-600 transition">
            <FiUser size={20} />
            Login
          </button>
        </div>

        {/* Bictox AI Button */}

        <div className="px-5 mt-8">
          <button className="w-full flex items-center justify-center gap-2 px-12 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg hover:scale-105 transition-all duration-300">
            <HiOutlineSparkles size={24} />

            <span className="font-medium">Bictox AI</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
