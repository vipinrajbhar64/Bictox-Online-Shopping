import HeroSection from "../../components/home/HeroSection";
import CategorySection from "../../components/home/CategorySection";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import WhyChooseBictox from "../../components/home/WhyChooseBictox";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log(res.data);
      setProducts(res.data.products);
    } catch (error) {
      console.log("Products Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts products={products} />
      <WhyChooseBictox />
    </>
  );
};

export default Home;
