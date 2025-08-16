import React, { useState, useEffect } from 'react';
import PopularCamps from './PopularCamps';
import UnComingEvent from './UnComingEvent';
import FeedbackFrom from '../Participant Dashboard/FeedBackFrom';
import SuccessStoriesSlider from '../Animation/SuccessStoriesSlider';
import CountDown from './CountDown';
import { Helmet } from 'react-helmet-async';
import { Fade, Slide, Zoom } from 'react-awesome-reveal'; // 👈 scroll animation
import '../../src/App.css'
import App from '../App';
import CardGalary from './CardGalary';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

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

      {/* একে একে scroll করলে বের হবে */}
      <Fade triggerOnce>
        <SuccessStoriesSlider />
      </Fade>

      <Slide direction="up" triggerOnce>
        <PopularCamps />
      </Slide>

      <Zoom triggerOnce>
        <FeedbackFrom />
      </Zoom>
      <CardGalary/>

      <Slide direction="left" triggerOnce>
        <UnComingEvent />
      </Slide>

      <Fade delay={200} triggerOnce>
        <CountDown />
      </Fade>

      <Slide direction="right" triggerOnce>
        <App />
      </Slide>
    </div>
  );
};

export default Home;
