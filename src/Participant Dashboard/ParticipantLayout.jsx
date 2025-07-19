import React from 'react';
import SidBerPar from './SidBerPar';
import Logo from '../Extrasection/Logo';
import { Outlet } from 'react-router';
import img2 from '../assets/image/img2.jpg'
import { Helmet } from 'react-helmet-async';

const ParticipantLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
           <Helmet>
                            <title>Participanr Dashboard| MedCampMS</title>
                            <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
                          </Helmet>
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">
    {/* Page content here */}
      <div className="navbar bg-base-600 border-r-red-400 w-full lg:hidden">
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
  </div>
  <div className="drawer-side bg-amber-200">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-red-600 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
<Logo/>
<SidBerPar/>
    </ul> 
  </div>
</div>
    );
};

export default ParticipantLayout;