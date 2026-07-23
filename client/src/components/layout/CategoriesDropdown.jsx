import { Link } from "react-router-dom";

const CategoriesDropdown = ({ isOpen }) => {
  if (!isOpen) return null;

  const categories = [
    "Men",
    "Women",
    "Kids",
    "Shoes",
    "Accessories",
    "Electronics",
  ];

  return (
    <div className="absolute top-12 left-0 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50">
      {categories.map((item) => (
        <Link
          key={item}
          to={`/category/${item.toLowerCase()}`}
          className="block px-5 py-3 text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition"
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default CategoriesDropdown;
