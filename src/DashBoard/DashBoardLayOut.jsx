import React from 'react';
//import MyParcel from '../pages/dashboard/MyParcel';
import { Link, NavLink, Outlet } from 'react-router';
import Logo from '../Extrasection/Logo';
import SidBer from '../Extrasection/SidBer';
//import MyParcel from '../pages/dashboard/MyParcel';
//import Logo from '../Logo';
//import SidebarLinks from '../pages/dashboard/SidebarLinks';
import img1 from '../assets/image/pawel-czerwinski-f5ITyZ8pi5I-unsplash.jpg'
import img2 from '../assets/image/img2.jpg'
import { Helmet } from 'react-helmet-async';
const DashBoardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
           <Helmet>
                  <title>Organizer Dashboard| MedCampMS</title>
                  <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
                </Helmet>
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">
    {/* Page content here */}
      <div className="navbar bg-base-300 w-full lg:hidden">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
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
      <div className="mx-2 flex-1 px-2">DeshBoard</div>
      
    </div>

<div
   style={{ 
        backgroundImage: `url(${img2})`,
        backgroundSize: 'cover',
          minHeight: '100vh' ,
        backgroundPosition: 'center',}}
      className=" text-white  px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      
>
  <Outlet></Outlet>
</div>
{/* Page content here */}

  </div>
  <div className="drawer-side"
  
    >
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul 
     style={{ 
        backgroundImage: `url(${img1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',}}
   
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    className="menu  text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
 <NavLink><Logo/></NavLink>
    <SidBer/>

    </ul>
  </div>
</div>
    );
};

export default DashBoardLayout;