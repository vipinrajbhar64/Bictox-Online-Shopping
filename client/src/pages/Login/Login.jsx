import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
//import { HiOutlineSparkles } from "react-icons/hi";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      return setError("Please fill all fields");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success(response.data.message);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* RIGHT */}

        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold tracking-wider text-cyan-600">
              BICTOX
            </h1>

            <p className="text-sm text-gray-500 mt-1">Premium Fashion Store</p>
          </div>
          <h2 className="text-4xl font-bold text-gray-800">Welcome Back</h2>

          <p className="text-gray-500 mt-3">
            {error && (
              <div className="mt-5 rounded-lg bg-red-100 text-red-600 px-4 py-3">
                {error}
              </div>
            )}
            Login to continue your shopping journey.
          </p>

          <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
            {/* Email */}

            <div className="relative">
              <FiMail
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-xl py-4 pl-14 pr-5 outline-none focus:border-cyan-500"
              />
            </div>

            {/* Password */}

            <div className="relative">
              <FiLock
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-gray-300 rounded-xl py-4 pl-14 pr-14 outline-none focus:border-cyan-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember Me
              </label>

              <button type="button" className="text-cyan-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-[260px] py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?
            <Link to="/register" className="ml-2 text-cyan-600 font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
