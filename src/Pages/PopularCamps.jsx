import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";


const PopularCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/camps")
      .then(res => {
        // participantCount অনুযায়ী descending sort
        const sortedCamps = res.data.sort(
          (a, b) => b.participantCount - a.participantCount
        );
        setCamps(sortedCamps.slice(0, 6));  // শুধু প্রথম ৬টা
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch popular camps:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Popular Medical Camps</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {camps.map(camp => (
          <div key={camp._id} className="border p-4 rounded shadow">
            <img
              src={camp.image}
              alt={camp.name}
              className="w-full h-40 object-cover rounded"
            />
           <div className="flex justify-between">
             <h3 className="text-xl font-semibold mt-2">{camp.name}</h3>
            <p><strong>Fees:</strong> ${camp.fees}</p>
           </div>
            <p><strong>Date & Time:</strong> {camp.dateTime}</p>
            <p><strong>Location:</strong> {camp.location}</p>
            <p><strong>Doctor:</strong> {camp.doctor}</p>
            <p><strong>Participants:</strong> {camp.participantCount}</p>
            <Link
              to={`/camp-details/${camp._id}`}
              className=" btn btn-primary text-white hover:underline"
            >
              Details
            </Link>
          </div>
        ))}
      </div>

      {/* See All Camps Button */}
      <div className="text-center mt-8">
        <Link to="/availecamp">
          <button className="btn btn-primary">See All Camps</button>
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
