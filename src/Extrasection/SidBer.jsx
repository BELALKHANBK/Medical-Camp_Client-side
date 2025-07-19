import { NavLink } from 'react-router';
import { FaHome, FaPlus, FaTasks, FaClipboardList } from 'react-icons/fa';

const SidBer = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
      isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-800'
    }`;

  return (
    <ul className="menu p-4 text-base space-y-2">
      {/* Organizer Profile */}
      <li>
        <NavLink to="/dashboard/organizer" className={linkStyle}>
          <FaHome className="text-lg" />
          <span>Organizer Profile</span>
        </NavLink>
      </li>

      {/* Add A Camp */}
      <li>
        <NavLink to="/dashboard/addcamp" className={linkStyle}>
          <FaPlus className="text-lg" />
          <span>Add A Camp</span>
        </NavLink>
      </li>

      {/* Manage Camp */}
      <li>
        <NavLink to="/dashboard/managecamps" className={linkStyle}>
          <FaTasks className="text-lg" />
          <span>Manage Camp</span>
        </NavLink>
      </li>

      {/* Manage Register Camps */}
      <li>
        <NavLink to="/dashboard/managereg" className={linkStyle}>
          <FaClipboardList className="text-lg" />
          <span>Manage Register Camps</span>
        </NavLink>
      </li>
    
    </ul>
  );
};

export default SidBer;
