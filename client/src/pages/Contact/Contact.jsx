import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

import { FiMessageSquare } from "react-icons/fi";

import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

const Contact = () => {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm">
            CONTACT BICTOX
          </span>

          <h1 className="mt-5 text-5xl font-bold text-gray-900">
            Get In Touch
          </h1>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Have questions, feedback, or need support? Our team is always ready
            to help you.
          </p>
        </div>

        {/* Contact Content */}

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {/* Left : Contact Form */}

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right : Contact Info */}

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-cyan-600 text-xl" />
                  <h3 className="font-bold text-gray-900">Address</h3>
                </div>
                <p className="text-gray-500">Ahmedabad, Gujarat, India</p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-cyan-600 text-xl" />
                  <h3 className="font-bold text-gray-900">Email</h3>
                </div>
                <p className="text-gray-500">support@bictox.com</p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-cyan-600 text-xl" />
                  <h3 className="font-bold text-gray-900">Phone</h3>
                </div>
                <p className="text-gray-500">+91 98765 43210</p>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-cyan-600 text-xl" />
                  <h3 className="font-bold text-gray-900">Working Hours</h3>
                </div>
                <p className="text-gray-500">Mon - Sat : 9:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Visit Our Office
          </h2>

          <div className="rounded-3xl overflow-hidden shadow-xl">
            <iframe
              title="Bictox Location"
              src="https://www.google.com/maps?q=Ahmedabad,Gujarat&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* FAQ */}

        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm">
              FAQs
            </span>

            <div className="flex justify-center items-center gap-3">
              <HiOutlineQuestionMarkCircle className="text-cyan-600 text-4xl" />
              <h2 className="text-4xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <p className="mt-3 text-gray-500">
              Find quick answers to common questions.
            </p>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-lg">
                How long does delivery take?
              </h3>
              <p className="mt-2 text-gray-500">
                Orders are usually delivered within 3–7 business days.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-lg">Can I return my order?</h3>
              <p className="mt-2 text-gray-500">
                Yes, you can return eligible products within 7 days.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-lg">Is online payment secure?</h3>
              <p className="mt-2 text-gray-500">
                Yes. All payments are protected using secure payment gateways.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}

        <div className="mt-24">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl text-white text-center py-16 px-8">
            <h2 className="text-4xl font-bold">Still Need Help?</h2>

            <p className="mt-4 text-cyan-100 max-w-2xl mx-auto">
              Our AI Shopping Assistant is available 24/7 to help you find
              products, solve issues, and answer your questions instantly.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-5">
              <Link
                to="/bictox-ai"
                className="bg-white text-cyan-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
              >
                Ask Bictox AI
              </Link>

              <a
                href="mailto:support@bictox.com"
                className="border border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-cyan-700 transition"
              >
                Email Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
