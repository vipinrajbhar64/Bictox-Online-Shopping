import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return setError("Please fill all fields");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      );

      toast.success(response.data.message);

      // Show OTP verification screen
      setShowOtp(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    setError("");

    if (!otp || otp.length !== 6) {
      return setError("Please enter a valid 6-digit OTP");
    }

    setOtpLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: formData.email,
          otp: otp,
        },
      );

      toast.success(response.data.message);

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <section className="h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center px-6 py-4 overflow-hidden">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-start bg-gradient-to-br from-cyan-500 to-teal-600 text-white px-10 pt-10 pb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full w-fit">
            <HiOutlineSparkles size={20} />
            <span>Welcome to Bictox</span>
          </div>
          <h1 className="text-4xl font-extrabold mt-5 leading-tight">
            Create
            <br />
            Your Account
          </h1>

          <p className="mt-5 text-cyan-100 leading-7 text-base max-w-sm">
            Join India's next generation shopping platform with AI powered
            recommendations, secure checkout and premium fashion collection.
          </p>
          <div className="mt-8 space-y-4">
            <div>✔ Premium Fashion Collection</div>

            <div>✔ Secure Payments</div>

            <div>✔ AI Shopping Assistant</div>

            <div>✔ Fast Delivery</div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold tracking-wider text-cyan-600">
              BICTOX
            </h1>

            <p className="text-gray-500 mt-2">
              Create your account to continue shopping.
            </p>

            {error && (
              <div className="mt-4 rounded-lg bg-red-100 text-red-600 px-4 py-3 text-sm">
                {error}
              </div>
            )}
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={showOtp ? handleVerifyOTP : handleSubmit}
          >
            {showOtp ? (
              <>
                {/* OTP Verification */}

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Verify Your Email
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    We sent a 6-digit OTP to
                  </p>

                  <p className="text-sm font-semibold text-cyan-600 mt-1">
                    {formData.email}
                  </p>
                </div>

                {/* OTP Input */}

                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

                      setOtp(value);
                    }}
                    placeholder="Enter 6-digit OTP"
                    className="w-full border border-gray-300 rounded-xl py-3 px-5 text-center text-xl tracking-[8px] outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Verify Button */}

                <button
                  type="submit"
                  disabled={otpLoading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-60"
                >
                  {otpLoading ? "Verifying..." : "Verify Email"}
                </button>

                {/* Back */}

                <button
                  type="button"
                  onClick={() => {
                    setShowOtp(false);
                    setOtp("");
                    setError("");
                  }}
                  className="w-full text-sm text-gray-500 hover:text-cyan-600"
                >
                  ← Back to Registration
                </button>
              </>
            ) : (
              <>
                {/* Name */}

                <div className="relative">
                  <FiUser
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border border-gray-300 rounded-xl py-3 pl-14 pr-5 outline-none focus:border-cyan-500"
                  />
                </div>

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
                    className="w-full border border-gray-300 rounded-xl py-3 pl-14 pr-5 outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Phone */}

                <div className="flex rounded-xl border border-gray-300 overflow-hidden focus-within:border-cyan-500">
                  <div className="flex items-center px-4 bg-gray-50 border-r border-gray-300 gap-2">
                    <FiPhone className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      +91
                    </span>
                  </div>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="flex-1 py-3 px-4 outline-none"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
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
                    className="w-full border border-gray-300 rounded-xl py-3 pl-14 pr-14 outline-none focus:border-cyan-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>

                {/* Confirm Password */}

                <div className="relative">
                  <FiLock
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded-xl py-3 pl-14 pr-14 outline-none focus:border-cyan-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>

                {/* Terms */}

                <label className="flex items-center gap-3 text-sm text-gray-600">
                  <input type="checkbox" />I agree to Terms & Conditions
                </label>

                {/* Register Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-[260px] py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </>
            )}
          </form>

          <p className="text-center mt-5 text-gray-600">
            Already have an account?
            <Link to="/login" className="text-cyan-600 font-semibold ml-2">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
