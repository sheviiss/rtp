import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This forces your MacBook browser screen to instantly jump to the top
    window.scrollTo(0, 0);
  }, [pathname]); // Every single time the path trail shifts, run this code!

  return null; // It stays completely invisible in the UI background
};

export default ScrollToTop;