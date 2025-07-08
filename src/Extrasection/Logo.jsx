import React from 'react';
import logo from '../assets/image/male-doctor-vaccinating-little-girl.jpg'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to='/'>
        <div className='flex items-center gap-6 '>
            <img className='w-10 h-8' src={logo} alt="" />
            <h1 className=' -ml-5 text-2xl font-extrabold'>MedCampMS</h1>
        </div>
        </Link>
    );
};

export default Logo;