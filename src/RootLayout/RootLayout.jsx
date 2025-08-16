import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../Pages/Navber';
import Footer from '../Pages/Footer';



const RootLayout = () => {
    return (
        <div>
            <Navber/>
           <main className='' style={{minHeight:'calc(100vh - 130px)'}}>
             <Outlet/>
           </main>
           <Footer/>
        </div>
    );
};

export default RootLayout;