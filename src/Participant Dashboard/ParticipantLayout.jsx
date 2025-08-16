import React from "react";
import SidBerPar from "./SidBerPar";
import Logo from "../Extrasection/Logo";
import { Outlet } from "react-router";
import img2 from "../assets/image/img2.jpg";
import { Helmet } from "react-helmet-async";

const ParticipantLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <Helmet>
        <title>Participant Dashboard | MedCampMS</title>
        <meta
          name="description"
          content="Welcome to MedCampMS - Your trusted medical camp management system."
        />
      </Helmet>

      {/* Drawer Toggle Checkbox */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col relative z-0">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-600 border-b lg:hidden z-50 relative">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-bold text-white">Dashboard</div>
        </div>

        {/* Page Content */}
        <div
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: "cover",
            minHeight: "100vh",
            backgroundPosition: "center",
          }}
          className="text-white px-6 relative z-0"
        >
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        {/* Overlay for small devices */}
        <label
          htmlFor="my-drawer-2"
          className="drawer-overlay lg:hidden"
        ></label>

        {/* Sidebar Content */}
        <ul className="menu bg-amber-200 text-base-content min-h-full w-80 p-4 relative z-50">
          <Logo />
          <SidBerPar />
        </ul>
      </div>
    </div>
  );
};

export default ParticipantLayout;
