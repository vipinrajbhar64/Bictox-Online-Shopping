import heroImage from "../../assets/images/hero.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-white">
      {/* Background Decoration */}
      <div className="absolute -top-32 -left-32 w-[350px] h-[350px] rounded-full bg-cyan-200/20 blur-[120px]"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-200/20 blur-[140px]"></div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 items-center min-h-[72vh] lg:min-h-[74vh] gap-8">
          {/* LEFT CONTENT */}

          <div>
            {/* Badge */}

            <span className="inline-flex items-center bg-cyan-100 text-cyan-700 px-5 py-2 rounded-full text-sm font-semibold">
              🔥 New Collection 2026
            </span>

            {/* Heading */}

            <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              Shop Smarter
              <br />
              with
              <span className="block text-cyan-600">Bictox</span>
            </h1>

            {/* Description */}

            <p className="mt-8 text-lg leading-8 text-gray-600 max-w-xl">
              Discover premium fashion with AI-powered shopping, secure checkout
              and lightning-fast delivery.
            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
                Shop Now
              </button>

              <button className="px-8 py-4 rounded-full border-2 border-cyan-500 bg-white/70 backdrop-blur-md text-cyan-700 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all duration-300 font-semibold">
                Explore Collection
              </button>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}

          <div className="relative overflow-hidden flex justify-center items-center">
            {/* Soft Cyan Glow */}

            <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-300/20 blur-3xl"></div>

            {/* Hero Image */}

            <div className="relative flex justify-center items-center lg:justify-end">
              <img
                src={heroImage}
                alt="Hero"
                className="relative z-10 w-full max-w-[560px] lg:max-w-[600px] object-contain transition-all duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
