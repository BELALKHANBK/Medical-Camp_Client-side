import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // স্ক্রল হ্যান্ডলার
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // স্ক্রল দূরত্ব 300px হলে দেখাবে
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToNavbar = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToNavbar}
          className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 
                     text-white p-3 rounded-full shadow-lg transition duration-300 z-50"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default ScrollButton;
