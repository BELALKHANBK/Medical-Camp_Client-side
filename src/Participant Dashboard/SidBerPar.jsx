import { NavLink } from 'react-router';
import { FaChartBar, FaUserCircle, FaClipboardCheck, FaCreditCard } from 'react-icons/fa';

const SidBerPar = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
      isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-800'
    }`;

  return (
    <ul className="menu p-4 space-y-2 text-base">
      {/* Analytics */}
      <li>
        <NavLink to="/participent/analytics" className={linkStyle}>
          <FaChartBar className="text-lg" />
          <span>Analytics</span>
        </NavLink>
      </li>

      {/* Participant Profile */}
      <li>
        <NavLink to="/participent/profile" className={linkStyle}>
          <FaUserCircle className="text-lg" />
          <span>Participant Profile</span>
        </NavLink>
      </li>

      {/* Registered Camps */}
      <li>
        <NavLink to="/participent/registered" className={linkStyle}>
          <FaClipboardCheck className="text-lg" />
          <span>Registered Camps</span>
        </NavLink>
      </li>

      {/* Payment History */}
      <li>
        <NavLink to="/participent/paymenthis" className={linkStyle}>
          <FaCreditCard className="text-lg" />
          <span>Payment History</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default SidBerPar;
