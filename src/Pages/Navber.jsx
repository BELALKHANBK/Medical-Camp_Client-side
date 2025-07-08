import React, { useState } from "react";
import { Link, NavLink } from "react-router"; // ✅ use react-router-dom

import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";
import Logo from "../Extrasection/Logo";

const Navber = () => {
  const { user, logOut } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Logged Out!", "You have been logged out.", "success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/availecamp">Available Camps</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="relative">
      {/* ✅ Navbar */}
      <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown flex items-center">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
          {/*   <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 ml-3">
              🏥 <span>MedCampMS</span>
            </Link> */}
            <ul
              tabIndex={0}
              className="menu mt-20 menu-sm dropdown-content text-white z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Logo/>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end pr-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* ✅ Tooltip & Clickable Profile */}
              <div
                onClick={() => setIsDrawerOpen(true)}
                className="tooltip tooltip-bottom"
                data-tip={user?.displayName || "User"}
              >
                <img
                  src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* ✅ Drawer / Profile Panel */}
     {isDrawerOpen && (
  <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg p-6 z-50">
    <button
      onClick={() => setIsDrawerOpen(false)}
      className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-500"
    >
      ✕
    </button>

    <div className="flex flex-col text-black items-center text-center space-y-3 mt-6">
      <img
        src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
        className="w-20 h-20 rounded-full border-2 border-blue-500"
        alt="User"
      />
      <h3 className="font-bold text-lg">{user?.displayName || "User Name"}</h3>
      <p className="text-gray-600 text-sm">{user?.email}</p>

  {user ?
    <button onClick={handleLogOut} className="btn btn-sm btn-error mt-4 w-full">
        Log Out
      </button>:
     <Link to='/login'> <button>Login</button>  </Link>
}
    </div>
  </div>
)}
    </div>
  );
};

export default Navber;
