import React from 'react';
//import Banner from './Banner';
import PopularCamps from './PopularCamps';
import UnComingEvent from './UnComingEvent';
import FeedbackFrom from '../Participant Dashboard/FeedBackFrom';
import FlipAnimation from '../Animation/flipAnimation';
//import Loader from '../Animation/Loader';

const Home = () => {
    return (
    <dev>
      <FlipAnimation/>
       {/*  <Banner/> */}
      <PopularCamps/>
      <FeedbackFrom/>
      <UnComingEvent/>

      
    </dev>
    );
};

export default Home;