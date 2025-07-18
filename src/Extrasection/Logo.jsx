import React from 'react';
import logo from '../assets/image/male-doctor-vaccinating-little-girl.jpg';
import { Link } from 'react-router'; // ✅ ঠিক করে দিয়েছি

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center gap-6'>
                <img className='w-10 h-8' src={logo} alt="Logo" />
                <h1 className='-ml-5 text-2xl font-extrabold bg-gradient-to-r from-green-200 via-red-500 to-yellow-400 bg-clip-text text-transparent'>
                    MedCampMS
                </h1>
            </div>
        </Link>
    );
};

export default Logo;
