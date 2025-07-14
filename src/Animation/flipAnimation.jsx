import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Navigation, Autoplay, Pagination } from "swiper";
import img1 from '../assets/image/male-doctor-vaccinating-little-girl.jpg'
import img2 from '../assets/image/medical-nurse-helping-african-american-pediatrician-doctor-bandage-fractured-arm-little-kid-patient-clinical-physiotherapy-hospital-office-team-with-face-mask-against-covid19.jpg'
import img3 from '../assets/image/medical-technologist-doing-blood-draw-services-patient-lab-assistant-with-sterile-rubber-gloves-taking-blood-sample-from-patient.jpg'
import img4 from '../assets/image/people-are-practicing-medicine.jpg' 


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
    id: 1,
    title: "Free Vaccination Camp in Dhaka",
    description:
      "Successfully vaccinated over 500 children and adults, improving community health significantly.",
    image: img4
  },
  // আরো stories যোগ করতে পারো এখানে
];

const SuccessStoriesSlider = () => {
  return (
    <section style={{ padding: "60px 20px", backgroundColor: "#f7f9fc" }}>
      <div style={{ maxWidth: "900px", margin: "auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#004d40" }}>
          Success Stories from Our Medical Camps
        </h2>
        <p style={{ fontSize: "1.1rem", marginBottom: "40px", color: "#555" }}>
          Celebrating impactful moments and achievements from our past camps.
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
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
            style={{
              width: "320px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              padding: "20px",
              boxSizing: "border-box",
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
            <h3 style={{ fontSize: "1.3rem", marginBottom: "10px", color: "#00796b" }}>
              {title}
            </h3>
            <p style={{ fontSize: "1rem", color: "#444" }}>{description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SuccessStoriesSlider;
