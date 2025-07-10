import { Link, NavLink } from 'react-router';
import { FaHome, FaBox, FaCreditCard, FaTruck, FaUserEdit } from 'react-icons/fa';

const SidBerPar = () => {
  return (
    <ul className="menu p-4 space-y-2">
      <li>
        <Link to="" className="flex items-center gap-2">
          <FaHome /> Analytics.

        </Link>
      </li>
      <li>
        <NavLink to="" className="flex items-center gap-2">
          <FaBox /> Participant Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/participent/registered" className="flex items-center gap-2">
          <FaCreditCard />Registered Camps
        </NavLink>
      </li>
  
      <li>
        <NavLink to="/participent/paymenthis" className="flex items-center gap-2">
          <FaUserEdit /> Payment History
        </NavLink>
      </li>
  
      
      
    </ul>
  );
};

export default SidBerPar;
