const WhyChooseBictox = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Heading */}

        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm">
            Why Choose Bictox
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-extrabold text-gray-900">
            Shop With Confidence
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Experience secure shopping, fast delivery and AI powered assistance
            with Bictox.
          </p>
        </div>

        {/* Feature Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
            <div className="text-5xl mb-5">🚚</div>
            <h3 className="text-xl font-bold text-gray-900">Fast Delivery</h3>
            <p className="text-gray-500 mt-3">
              Quick and reliable delivery across India.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
            <div className="text-5xl mb-5">🔒</div>
            <h3 className="text-xl font-bold text-gray-900">Secure Payment</h3>
            <p className="text-gray-500 mt-3">
              100% safe and encrypted payment gateway.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
            <div className="text-5xl mb-5">↩️</div>
            <h3 className="text-xl font-bold text-gray-900">Easy Returns</h3>
            <p className="text-gray-500 mt-3">
              Hassle-free returns and replacement process.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
            <div className="text-5xl mb-5">🤖</div>
            <h3 className="text-xl font-bold text-gray-900">Bictox AI</h3>
            <p className="text-gray-500 mt-3">
              Smart AI assistant to help you shop better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBictox;
