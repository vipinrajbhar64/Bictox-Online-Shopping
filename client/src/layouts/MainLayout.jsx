import { useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {
  const location = useLocation();

  const hideFooter = location.pathname === "/bictox-ai";

  return (
    <>
      <Navbar />

      <main
        className={
          hideFooter
            ? "h-[calc(100vh-80px)] overflow-hidden flex"
            : "min-h-screen"
        }
      >
        {children}
      </main>

      {!hideFooter && <Footer />}
    </>
  );
};

export default MainLayout;
