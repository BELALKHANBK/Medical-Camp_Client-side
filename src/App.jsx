import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RouterProvider } from 'react-router';
import { router } from './Routes/Routes';

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
