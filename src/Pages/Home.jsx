import React, { useState, useEffect } from 'react';
import PopularCamps from './PopularCamps';
import UnComingEvent from './UnComingEvent';
import FeedbackFrom from '../Participant Dashboard/FeedBackFrom';
import SuccessStoriesSlider from '../Animation/SuccessStoriesSlider';
import CountDown from './CountDown';
import { Helmet } from 'react-helmet-async';
//import '../App.css'; // spinner CSS import
import '../../src/App.css'
import App from '../App';
const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // spinner 5s ধরে দেখানোর উদাহরণ
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 5s delay, চাইলে 10000 (10s) দিতে পারেন

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Home | MedCampMS</title>
        <meta
          name="description"
          content="Welcome to MedCampMS - Your trusted medical camp management system."
        />
      </Helmet>

      <SuccessStoriesSlider />
      {/* <Banner/> */}
      <PopularCamps />
      <FeedbackFrom />
      <UnComingEvent />
      <CountDown />
      <App/>
    </div>
  );
};

export default Home;
