import { Link } from "react-router-dom";
import {
  HiSparkles,
  HiShieldCheck,
  HiTruck,
  HiHeart,
  HiCurrencyRupee,
} from "react-icons/hi2";

import { MdRocketLaunch } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}

          <div>
            <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
              ABOUT BICTOX
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Smarter Shopping
              <span className="text-cyan-600"> Starts Here</span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              Bictox is an AI-powered online shopping platform that helps users
              discover products faster, compare items intelligently, and shop
              within their budget using modern technology.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                to="/shop"
                className="px-8 py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition text-white font-semibold"
              >
                Explore Shop
              </Link>

              <button
                onClick={() =>
                  document
                    .getElementById("our-story")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-xl border border-gray-300 hover:bg-white transition font-semibold"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right */}

          <div className="flex justify-center items-center">
            <img
              src="/images/about/about-hero.png"
              alt="About Hero"
              className="w-full max-w-[560px] lg:max-w-[600px object-contain transition-all duration-500 hover:scale-[1.02] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}

      <section id="our-story" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}

          <div className="rounded-3xl bg-white shadow-md p-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>

            <p className="text-gray-600 leading-8 text-lg">
              Bictox was created with one simple mission — to make online
              shopping smarter, faster, and more personalized. Instead of
              spending hours searching through hundreds of products, users can
              simply ask Bictox AI what they need and receive intelligent
              recommendations instantly.
            </p>

            <p className="text-gray-600 leading-8 text-lg mt-6">
              By combining Artificial Intelligence with modern ecommerce
              technology, Bictox helps customers discover products within their
              budget while enjoying a seamless shopping experience.
            </p>
          </div>

          {/* Right */}

          <div className="rounded-3xl bg-cyan-600 p-10 text-white">
            <h2 className="text-4xl font-bold mb-8">Why Bictox?</h2>

            <div className="space-y-8">
              {/* Smart Shopping */}

              <div className="flex items-start gap-4">
                <HiSparkles className="text-white text-4xl mt-1 shrink-0" />

                <div>
                  <h3 className="font-semibold text-xl">
                    Smart Shopping Assistant
                  </h3>

                  <p className="mt-2 text-cyan-100">
                    Discover products faster with intelligent recommendations
                    powered by Bictox AI.
                  </p>
                </div>
              </div>

              {/* Budget */}

              <div className="flex items-start gap-4">
                <HiCurrencyRupee className="text-white text-4xl mt-1 shrink-0" />

                <div>
                  <h3 className="font-semibold text-xl">Budget Shopping</h3>

                  <p className="mt-2 text-cyan-100">
                    Shop within your budget using smart AI suggestions.
                  </p>
                </div>
              </div>

              {/* Secure */}

              <div className="flex items-start gap-4">
                <HiShieldCheck className="text-white text-4xl mt-1 shrink-0" />

                <div>
                  <h3 className="font-semibold text-xl">Secure Payments</h3>

                  <p className="mt-2 text-cyan-100">
                    Safe and trusted checkout with Razorpay integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION VISION VALUES ================= */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Mission & Vision
          </h2>

          <p className="mt-5 text-lg text-gray-500 max-w-3xl mx-auto">
            Our goal is to simplify online shopping by combining modern
            technology, intelligent recommendations, and a secure shopping
            experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Mission */}

          <div className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition">
            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center">
              <TbTargetArrow className="text-cyan-600 text-4xl" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">Mission</h3>

            <p className="mt-4 text-gray-600 leading-8">
              To make shopping easier through smart recommendations, secure
              payments, and a seamless user experience.
            </p>
          </div>

          {/* Vision */}

          <div className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition">
            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center">
              <MdRocketLaunch className="text-cyan-600 text-4xl" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">Vision</h3>

            <p className="mt-4 text-gray-600 leading-8">
              To become the most trusted AI-powered online shopping platform for
              customers worldwide.
            </p>
          </div>

          {/* Values */}

          <div className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition">
            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center">
              <HiHeart className="text-cyan-600 text-4xl" />
            </div>

            <h3 className="mt-6 text-2xl font-bold">Values</h3>

            <p className="mt-4 text-gray-600 leading-8">
              Innovation, customer satisfaction, transparency, trust, and
              continuous improvement drive everything we build.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE BICTOX ================= */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Bictox?
          </h2>

          <p className="mt-5 text-lg text-gray-500 max-w-3xl mx-auto">
            Experience the next generation of online shopping with AI-powered
            recommendations, secure transactions, and customer-first innovation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-3xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <HiSparkles className="text-cyan-600 text-3xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Smart Shopping
              </h3>
            </div>

            <p className="mt-4 text-gray-600 leading-7">
              Discover products faster with intelligent recommendations powered
              by Bictox AI.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <HiCurrencyRupee className="text-cyan-600 text-3xl" />
              <h3 className="text-xl font-bold text-gray-800">
                Budget Friendly
              </h3>
            </div>

            <p className="mt-4 text-gray-600 leading-7">
              Shop within your budget without compromising on quality or style.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <HiShieldCheck className="text-cyan-600 text-4xl shrink-0" />

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Secure Checkout
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  Razorpay powered safe and secure online transactions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <HiTruck className="text-cyan-600 text-4xl shrink-0" />

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Fast Delivery
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  Reliable shipping with fast order processing.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <HiHeart className="text-cyan-600 text-4xl shrink-0" />

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Easy Returns
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  Hassle-free returns for a worry-free shopping experience.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <HiShieldCheck className="text-cyan-600 text-4xl shrink-0" />

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Customer Support
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  Dedicated support team available whenever you need assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BICTOX STATS ================= */}

      <section className="bg-cyan-600 py-20 mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            <div>
              <h2 className="text-5xl font-bold text-white">20K+</h2>
              <p className="mt-3 text-cyan-100 text-lg">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-white">15K+</h2>
              <p className="mt-3 text-cyan-100 text-lg">Products Sold</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-white">4.9★</h2>
              <p className="mt-3 text-cyan-100 text-lg">Customer Rating</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-white">24/7</h2>
              <p className="mt-3 text-cyan-100 text-lg">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MEET BICTOX ================= */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}

          <div>
            <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
              MEET BICTOX
            </span>

            <h2 className="mt-6 text-4xl font-bold text-gray-900">
              Your Trusted Shopping Partner
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Bictox combines Artificial Intelligence with modern ecommerce to
              make shopping simple, fast and personalized.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Whether you're looking for the best budget products, premium
              fashion, or smart recommendations, Bictox helps you discover
              exactly what you need with confidence.
            </p>
          </div>

          {/* Right */}

          <div className="flex justify-center items-center">
            <img
              src="/images/about/about-meet.png"
              alt="Meet Bictox"
              className="w-full max-w-[560px] lg:max-w-[600px object-contain transition-all duration-500 hover:scale-[1.02] cursor-pointer"
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="bg-gray-900 py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold text-white">
            Ready to Start Shopping?
          </h2>

          <p className="mt-6 text-lg text-gray-300 leading-8">
            Discover thousands of products with intelligent recommendations
            powered by Bictox AI.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-10 px-10 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-700 transition text-white font-semibold text-lg"
          >
            Explore Shop
          </Link>
        </div>
      </section>
    </div>
  );
};
export default About;
