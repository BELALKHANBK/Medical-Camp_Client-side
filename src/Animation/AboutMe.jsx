import React from "react";
import { Helmet } from "react-helmet-async";
import profileImg from '../../src/assets/image/belal khan.jpg'; // তোমার ছবি path
import '../../src/App.css'
const AboutMe = () => {
  const qualifications = [
    {
      degree: "SSC",
      institution: " Rangpur Zella School, Rangpur",
      year: "2021",
    },
    {
      degree: "Diploma in Computer Science",
      institution: "Gopalgonj Polytechnice Institute, Gopalgonj",
      year: "2026",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 font-cinzel lg:px-8 py-10" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Helmet>
        <title>About Me | MedCampMS</title>
        <meta name="description" content="About the creator of MedCampMS website" />
      </Helmet>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img 
          src={profileImg} 
          alt="Belal Khan" 
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-indigo-600 shadow-lg"
        />
      </div>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-cinzel md:text-4xl font-bold text-center text-indigo-600 mb-6">About Me & My Qualifications</h1>

      {/* Main Info Card */}
      <div className="bg-white dark:bg-gray-800 font-playfair  dark:text-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10 space-y-4 text-sm sm:text-base md:text-lg">
        <p><strong>Website Name:</strong> MedCampMS</p>
        <p><strong>Created By:</strong> Md. Belal Khan</p>
        <p><strong>Email:</strong> belalkhanloverboy2004@gmail.com</p>
        <p><strong>Phone:</strong> +880-1309707330</p>
        <p><strong>Professional:</strong> Web Developer</p>
        <p><strong>Current Role:</strong> Frontend Developer</p>
        <p><strong>Purpose:</strong> To manage medical camps efficiently, show available camps, allow participants to join, and provide information about health services.</p>
        <p><strong>Date of Creation:</strong> August 2025</p>
        <p><strong>Technologies Used:</strong> React, Vite, Tailwind CSS, Firebase Auth, MongoDB, Node.js, Express</p>
        <p><strong>About Me:</strong> I am a passionate web developer creating user-friendly, modern web applications. This website demonstrates my skills and aims to provide a useful service to the community.</p>
      </div>

      {/* Qualification Section */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-roboto font-semibold text-indigo-600 mt-10 mb-4 text-center">My Education & Certificates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 font-roboto gap-6">
        {qualifications.map((q, index) => (
          <div key={index} className="bg-white dark:bg-gray-700 dark:text-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-bold text-indigo-600 mb-2">{q.degree}</h3>
            <p><strong>Institution:</strong> {q.institution}</p>
            <p><strong>Year:</strong> {q.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
