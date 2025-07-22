import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Extrasection/Logo';

const LoginLayout = () => {
    return (
        <div className='bg-gray'>
            <Logo/>
            <Outlet></Outlet>
        </div>
    );
};

export default LoginLayout;