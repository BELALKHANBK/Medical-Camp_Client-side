import { FaArrowUp } from "react-icons/fa";


const ScrollButton = () => {
const scrollToNavbar = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};


  return (
    <button
      onClick={scrollToNavbar}
      className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 
                 text-white p-3 rounded-full shadow-lg transition duration-300 z-50"
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollButton;
