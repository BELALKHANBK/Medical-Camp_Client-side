import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
//import video from '../assets/image/img1.jpg'; // ভিডিও বা ব্যাকগ্রাউন্ড ইমেজ
import '../../src/App.css'
const PopularCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://medical-camp-server-sage.vercel.app/camps")
      .then(res => {
        const sortedCamps = res.data.sort(
          (a, b) => b.participantCount - a.participantCount
        );
        setCamps(sortedCamps.slice(0, 6));
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch popular camps:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="relative max-w-8xl mx-auto px-4 my-10">
    <Helmet>
        <title>Popular Camp | MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
      </Helmet>
      <div className="absolute inset-0  bg-opacity-50 z-0"></div>

      <h2 className="relative z-10 text-3xl font-cinzel mb-8 text-center ">
        Popular Medical Camps
      </h2>

      <div className="relative z-10 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
        {camps.map(camp => (
          <div
            key={camp._id}
            className="bg-white text-black font-bold font-cinzel rounded-xl shadow-lg overflow-hidden
                       hover:shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <img
              src={camp.image}
             
              className="w-full h-48 object-cover"
            />
            <h1 className="text-center font-bold font-cinzel">OrganizerName: {camp.name}</h1>
            <div className="p-6 ">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-md font-semibold text-indigo-800">camp: {camp.camp_name}</h3>
                <p className="text-lg  text-green-600">💰Camp Fees: ${camp.fees}</p>
              </div>
              <p className="mb-1"><strong>📅 Date & Time:</strong> {camp.dateTime}</p>
              <p className="mb-1"><strong>📍Location:</strong> {camp.location}</p>
              <p className="mb-3"><strong>👨‍⚕️Professional:</strong> {camp.doctor}</p>
              <p className="mb-3"><strong>👥participant count: </strong> {camp.participantCount}</p>

             <div className="flex justify-end">
  <Link
    to={`/camp-details/${camp._id}`}
    className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold btn-gradient-hover"
  >
   View Details
  </Link>
</div>

            </div>
          </div>
        ))}
      </div>

      {/* See All Camps Button */}
      <div className="relative z-10 text-center mt-12">
        <Link to="/availecamp">
          <button className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 btn-gradient-hover">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
