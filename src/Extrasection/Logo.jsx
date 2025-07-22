import React from 'react';
import logo from '../assets/image/male-doctor-vaccinating-little-girl.jpg';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link to="/" className="inline-block  no-underline">
      <div className="flex items-center gap-8 w-fit ml-8  bg-transparent shadow-none p-0 m-0">
        <img className="w-10 h-8 rounded-sm" src={logo} alt="Logo" />
        <h1 className="-ml-5 text-2xl font-extrabold bg-gradient-to-r from-green-200 via-red-500 to-yellow-400 bg-clip-text text-transparent">
          MedCampMS
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
