import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";
import Logo from "../Extrasection/Logo";
import { CiLogin } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";
import "../Animation/Loader"; // ⬅️ Import the glow effect

const Navber = () => {
  const { user, logOut } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-300 font-semibold"
            : "text-white hover:text-yellow-300 transition-colors duration-300"
        }
        onClick={() => setIsMenuOpen(false)}
      >
        Home
      </NavLink>

      <NavLink
        to="/availecamp"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-300 font-semibold"
            : "text-white hover:text-yellow-300 transition-colors duration-300"
        }
        onClick={() => setIsMenuOpen(false)}
      >
        Available Camps
      </NavLink>

      {user && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-300 font-semibold"
              : "text-white hover:text-yellow-300 transition-colors duration-300"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Dashboard
        </NavLink>
      )}

      {user && (
        <NavLink
          to="/participent"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-300 font-semibold"
              : "text-white hover:text-yellow-300 transition-colors duration-300"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Participant Dashboard
        </NavLink>
      )}
    </div>
  );

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="navbar bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-sm fixed top-0 z-50 w-full">
        <div className="navbar-start">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-ghost lg:hidden text-white hover:bg-purple-700 transition-colors duration-300 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end pr-4">
          {user ? (
            <div
              onClick={() => setIsDrawerOpen(true)}
              className="tooltip tooltip-bottom cursor-pointer"
              data-tip={user?.displayName || "User"}
            >
              <div className="profile-glow-wrapper">
                <div className="profile-glow"></div>
                <img
                  src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary flex items-center gap-1">
              <CiLogin /> Login
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed top-[60px] left-0 right-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 z-40 p-4 lg:hidden">
          {navItems}
        </div>
      )}

      {/* Profile Drawer */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg p-6 z-50">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>

          <div className="flex flex-col items-center text-center text-black mt-6 space-y-3">
            <div className="profile-glow-wrapper">
              <div className="profile-glow"></div>
              <img
                src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                className="profile-image"
                alt="User"
              />
            </div>
            <h3 className="font-bold text-lg">{user?.displayName || "User Name"}</h3>
            <p className="text-gray-600 text-sm">{user?.email}</p>

            <button
              onClick={handleLogOut}
              className="btn btn-sm btn-error mt-4 w-full flex items-center justify-center gap-1"
            >
              <IoLogInOutline />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navber;
