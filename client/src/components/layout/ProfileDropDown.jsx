import { Link } from "react-router-dom";

const ProfileDropdown = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-16 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      <div className="px-5 py-4 border-b">
        <h3 className="font-semibold text-gray-800">Welcome 👋</h3>

        <p className="text-sm text-gray-500">Sign in to continue</p>
      </div>

      <Link to="/login" className="block px-5 py-3 hover:bg-gray-50">
        Login
      </Link>

      <Link to="/register" className="block px-5 py-3 hover:bg-gray-50">
        Register
      </Link>

      <Link to="/profile" className="block px-5 py-3 hover:bg-gray-50">
        My Profile
      </Link>

      <Link to="/orders" className="block px-5 py-3 hover:bg-gray-50">
        My Orders
      </Link>

      <button className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50">
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
