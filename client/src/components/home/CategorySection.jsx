const categories = [
  {
    name: "Pants",
    image: "/category/pants.png",
    count: 5,
  },
  {
    name: "T-Shirts",
    image: "/category/tshirt.png",
    count: 4,
  },
  {
    name: "Shirts",
    image: "/category/shirt.png",
    count: 2,
  },
  {
    name: "Shoes",
    image: "/category/shoes.png",
    count: 3,
  },
  {
    name: "Jackets",
    image: "/category/jacket.png",
    count: 2,
  },
  {
    name: "Hoodies",
    image: "/category/hoodie.png",
    count: 3,
  },
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Heading */}

        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm">
            Shop By Category
          </span>

          <h2 className="mt-5 text-4xl lg:text-5xl font-extrabold text-gray-900">
            Find Your Style
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Explore premium fashion categories carefully selected for every
            lifestyle.
          </p>
        </div>

        {/* Categories */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
          {categories.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl border border-gray-100 hover:border-cyan-500 hover:shadow-xl transition-all duration-300 cursor-pointer p-6 text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-cyan-50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="mt-6 text-lg font-bold text-gray-900">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {item.count} Products
              </p>{" "}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
