import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Navigation, Autoplay, Pagination } from "swiper";
import { motion } from "framer-motion";
import { FaHeartbeat } from "react-icons/fa"; // FontAwesome Icon
import '../../src/App.css'
import img1 from '../assets/image/male-doctor-vaccinating-little-girl.jpg';
import img2 from '../assets/image/medical-nurse-helping-african-american-pediatrician-doctor-bandage-fractured-arm-little-kid-patient-clinical-physiotherapy-hospital-office-team-with-face-mask-against-covid19.jpg';
import img3 from '../assets/image/medical-technologist-doing-blood-draw-services-patient-lab-assistant-with-sterile-rubber-gloves-taking-blood-sample-from-patient.jpg';
import img4 from '../assets/image/people-are-practicing-medicine.jpg';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([EffectCoverflow, Navigation, Autoplay, Pagination]);

const successStories = [
  {
    id: 1,
    title: "Free Vaccination Camp in Dhaka",
    description:
      "Successfully vaccinated over 500 children and adults, improving community health significantly.",
    image: img1
  },
  {
    id: 2,
    title: "Eye Check-up Camp in Chittagong",
    description:
      "Provided free eye checkups and glasses to 300+ patients, restoring vision and hope.",
    image: img2
  },
  {
    id: 3,
    title: "Blood Donation Drive",
    description:
      "Collected 200+ units of blood, helping save dozens of lives in emergency situations.",
    image: img3
  },
  {
    id: 4,
    title: "Health Awareness Camp",
    description:
      "Educated hundreds on healthy living and preventive care, empowering the community.",
    image: img4
  },
];

const SuccessStoriesSlider = () => {
  return (
    <>
      {/* Inline keyframes style for gradient animation + Google Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

          @keyframes gradientBG {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          body {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>

      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ padding: "60px 20px" }}
      >
        <div style={{ maxWidth: "900px", margin: "auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: "2.5rem", marginBottom: "1rem", color: "#004d40" }}>
            <FaHeartbeat className="inline text-red-500 font-cinzel mr-2 font-cinzel" /> Success Stories from Our Medical Camps
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "40px", color: "#555" }}>
            Celebrating impactful moments and achievements from our past camps.
          </p>
        </div>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={true}
          pagination={{ clickable: true }}
          style={{ paddingBottom: "60px" }}
        >
          {successStories.map(({ id, title, description, image }) => (
            <SwiperSlide
              key={id}
              style={{ width: "320px" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{
                  background: "linear-gradient(270deg, #e0f7fa, #f3e5f5, #ffe0b2, #e3f2fd)",
                  backgroundSize: "800% 800%",
                  animation: "gradientBG 8s ease infinite",
                  borderRadius: "15px",
                  padding: "20px",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                <img
                  src={image}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "15px",
                  }}
                />
                <h3 style={{ fontSize: "1.3rem", marginBottom: "10px", color: "#004d40" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "1rem", color: "#333" }}>
                  {description}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>
    </>
  );
};

export default SuccessStoriesSlider;
