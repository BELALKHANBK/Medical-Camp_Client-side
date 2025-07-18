import React from 'react';
//import Banner from './Banner';
import PopularCamps from './PopularCamps';
import UnComingEvent from './UnComingEvent';
import FeedbackFrom from '../Participant Dashboard/FeedBackFrom';
import FlipAnimation from '../Animation/flipAnimation';
import { Helmet } from 'react-helmet-async';
//import Loader from '../Animation/Loader';

const Home = () => {
    return (
    <dev>
      <Helmet>
        <title>Home | MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
      </Helmet>
      <FlipAnimation/>
       {/*  <Banner/> */}
      <PopularCamps/>
      <FeedbackFrom/>
      <UnComingEvent/>

      
    </dev>
    );
};

export default Home;