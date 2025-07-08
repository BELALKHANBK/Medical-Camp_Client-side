
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import img1 from '../assets/image/male-doctor-vaccinating-little-girl.jpg'

const slides = [
  {
    id: 1,
    image: {img1},
    title: "Empowering Rural Communities",
    description: "Join hands in making healthcare accessible to everyone.",
  },
  {
    id: 2,
    image: "https://i.ibb.co/m5r74rfK/side-view-people-making-donations-packages.jpg",
    title: "Spreading Smiles through Service",
    description: "Our camps have served over 10,000 patients nationwide.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/gbQCB7Pz/medical-nurse-helping-african-american-pediatrician-doctor-bandage-fractured-arm-little-kid-patient.jpg",
    title: "Be the Change",
    description: "Volunteer or register today to be a part of the mission.",
  },
];

const Banner = () => {
  return (
    <div className="mt-16">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={5000}
        transitionTime={800}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img src={slide.image} alt={slide.title} className="h-[70vh] w-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg mb-6">{slide.description}</p>
              <Link
                to="/available-camps"
                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md text-white font-medium"
              >
                Join a Camp
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
