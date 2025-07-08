import { Link, NavLink } from 'react-router';
import { FaHome, FaBox, FaCreditCard, FaTruck, FaUserEdit } from 'react-icons/fa';

const SidBer = () => {
  return (
    <ul className="menu p-4 space-y-2">
      <li>
        <Link to="/dashboard/organizer" className="flex items-center gap-2">
          <FaHome /> Organizer Profile
        </Link>
      </li>
      <li>
        <NavLink to="/dashboard/addcamp" className="flex items-center gap-2">
          <FaBox /> Add A Camp
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/managecamps" className="flex items-center gap-2">
          <FaCreditCard /> Manage Camp
        </NavLink>
      </li>
  
      <li>
        <NavLink to="/dashboard/managereg" className="flex items-center gap-2">
          <FaUserEdit /> Manage Register Camps
        </NavLink>
      </li>
  
      
      
    </ul>
  );
};

export default SidBer;
