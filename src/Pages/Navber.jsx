import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router"; // react-router-dom ব্যবহার করো
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";
import Logo from "../Extrasection/Logo";
import { CiLogin } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";
import "../Animation/Loader"; // Glow effect ইম্পোর্ট
import Speech from 'speak-tts';
const Navber = () => {



  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isScrolled, setIsScrolled] = useState(false);
   const [speech, setSpeech] = useState(null);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };


    // speak-tts init
  useEffect(() => {
    const speechInstance = new Speech();
    if (speechInstance.hasBrowserSupport()) {
      speechInstance.init({
        volume: 1,
        lang: 'en-US',
        rate: 1,
        pitch: 1,
        voice: 'Google US English',
        splitSentences: true,
      }).then(() => {
        setSpeech(speechInstance);
      }).catch(e => {
        console.error("Speech initialization failed:", e);
      });
    } else {
      console.warn("Speech synthesis not supported");
    }
  }, []);
 const speakText = (text) => {
    if (speech) {
      speech.speak({
        text: text,
      }).catch(e => {
        console.error("Speech error:", e);
      });
    }
  };


  
  const { user, role, loading, logOut } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut();

      await Swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have been logged out successfully.",
        showConfirmButton: true,
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      setIsDrawerOpen(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message || "Something went wrong!",
        showConfirmButton: true,
      });
    }
  };

  if (loading) {
    return (
      <div className="navbar bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-sm fixed top-0 z-50 w-full flex justify-center items-center text-white h-16">
        Loading...
      </div>
    );
  }

  const navItems = (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
     {/*  <NavLink
        to="/"
            
        className={({ isActive }) =>
       
          isActive
            ? "text-yellow-300 font-semibold underline"
            : "text-white hover:text-yellow-300 transition-colors duration-300"
        }
        onClick={() =>
           speakText('Home'),
          setIsMenuOpen(false)

        }
      >
        Home
      </NavLink> */}

<NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold underline"
      : "text-white hover:text-yellow-300 transition-colors duration-300"
  }
  onClick={() => {
    speakText('Home');   // TTS
    setIsMenuOpen(false); // Menu বন্ধ করা
  }}
>
  Home
</NavLink>


      <NavLink
        to="/availecamp"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-300 font-semibold underline"
            : "text-white hover:text-yellow-300 transition-colors duration-300"
        }
        onClick={() =>{
             speakText('available camps');
           setIsMenuOpen(false)

         } }
      >
        Available Camps
      </NavLink>

      {role === "organizer" && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-300 font-semibold underline"
              : "text-white hover:text-yellow-300 transition-colors duration-300"
          }
          onClick={() =>{
             speakText('dashboard');
            setIsMenuOpen(false)}}
        >
          Dashboard
        </NavLink>
      )}

      {role === "participant" && (
        <NavLink
          to="/participent"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-300 font-semibold"
              : "text-white hover:text-yellow-300 transition-colors duration-300"
          }
          onClick={() =>{
           speakText('participant dashboard');
          setIsMenuOpen(false)}}
        >
          Participant Dashboard
        </NavLink>
      )}
    </div>
  );

  return (
     <div
        className={`navbar sticky top-0 z-50 w-full transition-colors duration-300
          ${
            isScrolled
              ? (theme === 'dark' ? 'bg-gray-900 text-white shadow-md py-2' : 'bg-white text-black shadow-md py-2')
              : (theme === 'dark' ? 'bg-transparent text-white py-2' : 'bg-transparent text-black py-2')
          }
        `}
      >
      {/* Navbar */}
      <div className="navbar bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-sm -ml-2 fixed top-0 z-50 w-full">
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
          <ul className="menu menu-horizontal px-1">{navItems}

                  <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors ml-4"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </button>
          </ul>
        </div>

        <div className="navbar-end pr-4">
          {user ? (
            <div
              onClick={() =>{
                 speakText('User Profile');
                setIsDrawerOpen(true)}}
              className="tooltip tooltip-bottom cursor-pointer"
              data-tip={user?.displayName || "User"}
            >
              <div className="profile-glow-wrapper">
                <div className="outer-border"></div>
                <div className="profile-glow"></div>
                <img
                  src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
            </div>
          ) : (
            <Link
              to="/login"
                onClick={() => speakText('login')}
              className="btn btn-sm btn-primary flex items-center gap-1"
            >
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
            onClick={() =>{ 
               speakText('close sidbar');
              setIsDrawerOpen(false)}}
            className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>

          <div className="flex flex-col items-center text-center text-black mt-6 space-y-3">
            <div className="profile-glow-wrapper">
              <div className="outer-border"></div>
              <div className="profile-glow"></div>
              <img
                src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                alt="Profile"
                className="profile-image"
              />
            </div>

            <h3 className="font-bold text-lg">{user?.displayName || "User Name"}</h3>
            <p className="text-gray-600 text-sm">{user?.email}</p>

            {role === "organizer" && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-semibold"
                    : "text-white btn hover:text-blue-800 p-4 hover:bg-amber-400 transition-colors duration-300"
                }
                onClick={() =>{
                   speakText('dashboard');
                  setIsMenuOpen(false)}}
              >
                Dashboard
              </NavLink>
            )}

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
