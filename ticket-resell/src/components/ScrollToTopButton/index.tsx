import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-20 bottom-6 right-2"
        >
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-12 h-12 fill-[#87CBB9] text-white transition-all duration-300 hover:fill-[#B9EDDD] hover:text-black hover:-translate-y-2" 
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;