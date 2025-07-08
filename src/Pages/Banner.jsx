import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1 from '../assets/image/male-doctor-vaccinating-little-girl.jpg'
import Banner2 from '../assets/image/medical-nurse-helping-african-american-pediatrician-doctor-bandage-fractured-arm-little-kid-patient-clinical-physiotherapy-hospital-office-team-with-face-mask-against-covid19.jpg'
import Banner3 from '../assets/image/medical-technologist-doing-blood-draw-services-patient-lab-assistant-with-sterile-rubber-gloves-taking-blood-sample-from-patient.jpg'
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';


const Banner = () => {
  return (
    <div >
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={true}>
        <div className='reletive'>
          <img src={Banner1} />


          <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
            <p className='text-3xl  md:text-5xl font-bold '>Empowering Rural Communities</p>
            <p className='text-black text-2xl font-bold   lg:text-68'>Join hands in making healthcare accessible to everyone.</p>
            <Link
              to="/available-camps"
              className="bg-blue-600 hover:bg-blue-700 px-5  p-4 py-2 rounded-md text-white font-medium"
            >
              Join a Camp
            </Link>
          </div>
        </div>
        <div>
          <img src={Banner2} />
          <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
            <p className='text-3xl md:text-5xl font-bold '>Spreading Smiles through Service</p>
            <p className='text-black text-2xl font-bold   lg:text-68'>Our camps have served over 10,000 patients nationwide.</p>
            <Link
              to="/available-camps"
              className="bg-blue-600 hover:bg-blue-700 px-5  p-4 py-2 rounded-md text-white font-medium"
            >
              Join a Camp
            </Link>
          </div>
        </div>
        <div>
          <img className='' src={Banner3} />
          <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
            <p className='text-3xl md:text-5xl font-bold '>Spreading Smiles through Service</p>
            <p className='text-black text-2xl font-bold   lg:text-68'>Our camps have served over 10,000 patients nationwide.</p>
            <Link
              to="/available-camps"
              className="bg-blue-600 hover:bg-blue-700 px-5  p-4 py-2 rounded-md text-white font-medium"
            >
              Join a Camp
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;