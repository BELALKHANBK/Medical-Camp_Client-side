import { NavLink } from "react-router";
import { FaChartBar, FaUserCircle, FaClipboardCheck, FaCreditCard, FaHome } from "react-icons/fa";
import { motion } from "framer-motion"; // animation import

const SidBerPar = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
      isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-800'
    }`;

  // Auto-close drawer on mobile
  const handleClick = () => {
    const checkbox = document.getElementById("my-drawer-2");
    if (checkbox && checkbox.checked) {
      checkbox.checked = false; // drawer close
    }
  };

  // Animation variants
  const list = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const menuItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/participent/analytics", icon: <FaChartBar />, label: "Analytics" },
    { to: "/participent/profile", icon: <FaUserCircle />, label: "Participant Profile" },
    { to: "/participent/registered", icon: <FaClipboardCheck />, label: "Registered Camps" },
    { to: "/participent/paymenthis", icon: <FaCreditCard />, label: "Payment History" },
  ];

  return (
    <ul className="menu p-4 space-y-2 text-base z-100">
      {menuItems.map((item, index) => (
        <motion.li
          key={item.to}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={list}
        >
          <NavLink to={item.to} className={linkStyle} onClick={handleClick}>
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        </motion.li>
      ))}
    </ul>
  );
};

export default SidBerPar;
