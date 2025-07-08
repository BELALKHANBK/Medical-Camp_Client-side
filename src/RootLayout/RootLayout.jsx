import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../Pages/Navber';
import Footer from '../Pages/Footer';



const RootLayout = () => {
    return (
        <div>
            <Navber/>
           <Outlet></Outlet>
           <Footer/>
        </div>
    );
};

export default RootLayout;