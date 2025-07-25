import React from 'react';

import PopularCamps from './PopularCamps';
import UnComingEvent from './UnComingEvent';
import FeedbackFrom from '../Participant Dashboard/FeedBackFrom';

import { Helmet } from 'react-helmet-async';
import SuccessStoriesSlider from '../Animation/SuccessStoriesSlider';
import CountDown from './CountDown';



const Home = () => {
    return (
    <dev>
      <Helmet>
        <title>Home | MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
      </Helmet>
   <SuccessStoriesSlider/>
       {/*  <Banner/> */}
      <PopularCamps/>
      <FeedbackFrom/>
      <UnComingEvent/>
<CountDown/>

      
    </dev>
    );
};

export default Home;