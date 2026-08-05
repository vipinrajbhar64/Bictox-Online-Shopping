import { Link } from "react-router-dom";
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiSettings,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";

import { HiOutlineHandRaised } from "react-icons/hi2";

const Profile = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Title */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>

          <p className="text-gray-500 mt-2">
            Manage your account and shopping activity.
          </p>
        </div>

        {/* Layout */}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}

          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="text-center border-b pb-6">
              <img
                src="/profile/profile.png"
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-cyan-100"
              />

              <h2 className="mt-4 text-xl font-bold">Vipin Rajbhar</h2>

              <p className="text-gray-500 text-sm">vipinrajbhar@example.com</p>
            </div>

            {/* Menu */}

            <div className="mt-6 space-y-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition"
              >
                <FiUser />
                My Account
              </Link>

              <Link
                to="/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition"
              >
                <FiShoppingBag />
                My Orders
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition"
              >
                <FiHeart />
                Wishlist
              </Link>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition">
                <FiMapPin />
                Saved Address
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition">
                <FiSettings />
                Settings
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition">
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>

          {/* Right Content */}

          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-md p-8">
              <div className="flex items-center gap-3">
                <HiOutlineHandRaised className="text-4xl text-cyan-600" />

                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome Back
                </h2>
              </div>

              <p className="text-gray-500 mt-3">
                Manage your shopping experience from one dashboard.
              </p>
            </div>

            {/* Quick Access */}

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Link
                to="/orders"
                className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition text-center"
              >
                <FiShoppingBag className="text-5xl text-cyan-600 mx-auto" />

                <h3 className="mt-5 text-xl font-bold">Orders</h3>

                <p className="text-gray-500 mt-2">Track your purchases</p>
              </Link>

              <Link
                to="/wishlist"
                className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition text-center"
              >
                <FiHeart className="text-5xl text-red-500 mx-auto" />

                <h3 className="mt-5 text-xl font-bold">Wishlist</h3>

                <p className="text-gray-500 mt-2">Saved favourite products</p>
              </Link>

              <Link
                to="/cart"
                className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition text-center"
              >
                <FiShoppingCart className="text-5xl text-orange-500 mx-auto" />

                <h3 className="mt-5 text-xl font-bold">Cart</h3>

                <p className="text-gray-500 mt-2">Ready to checkout</p>
              </Link>
            </div>

            {/* User Statistics */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <div className="bg-white rounded-3xl shadow-md p-6 text-center">
                <h3 className="text-3xl font-bold text-cyan-600">12</h3>
                <p className="text-gray-500 mt-2">Orders</p>
              </div>

              <div className="bg-white rounded-3xl shadow-md p-6 text-center">
                <h3 className="text-3xl font-bold text-red-500">8</h3>
                <p className="text-gray-500 mt-2">Wishlist</p>
              </div>

              <div className="bg-white rounded-3xl shadow-md p-6 text-center">
                <h3 className="text-3xl font-bold text-green-600">3</h3>
                <p className="text-gray-500 mt-2">Addresses</p>
              </div>

              <div className="bg-white rounded-3xl shadow-md p-6 text-center">
                <h3 className="text-3xl font-bold text-orange-500">5★</h3>
                <p className="text-gray-500 mt-2">Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
