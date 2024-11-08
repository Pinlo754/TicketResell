import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Smooth scrolling effect
    });
  }, [pathname]);

  return null; // No UI elements to render
};

export default ScrollToTop;