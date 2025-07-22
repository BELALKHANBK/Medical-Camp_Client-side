import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FaUsers, FaCampground, FaComments, FaUserMd, FaMoneyBillWave } from 'react-icons/fa';

const CountDown = () => {
  const [stats, setStats] = useState({
    totalCamps: 0,
    totalParticipants: 0,
    totalFeedbacks: 0,
    totalOrganizers: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    // Replace with real API if needed
    fetch('https://medical-camp-server-sage.vercel.app/stats') // optional endpoint
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(() => {
        // fallback mock data
        setStats({
          totalCamps:142,
          totalParticipants: 168,
          totalFeedbacks: 95,
          totalOrganizers: 32,
          totalPayments: 139,
        });
      });
  }, []);

  const items = [
    { label: 'Total Camps', value: stats.totalCamps, icon: <FaCampground size={30} className="text-green-600" /> },
    { label: 'Participants', value: stats.totalParticipants, icon: <FaUsers size={30} className="text-blue-600" /> },
    { label: 'Feedbacks', value: stats.totalFeedbacks, icon: <FaComments size={30} className="text-yellow-500" /> },
    { label: 'Organizers', value: stats.totalOrganizers, icon: <FaUserMd size={30} className="text-purple-500" /> },
    { label: 'Payments', value: stats.totalPayments, icon: <FaMoneyBillWave size={30} className="text-red-600" /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
            data-aos="zoom-in"
          >
            {item.icon}
            <h2 className="text-3xl font-bold text-gray-800 mt-2">
              <CountUp end={item.value} duration={50} />
            </h2>
            <p className="mt-2 text-gray-600 font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountDown;
