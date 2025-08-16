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
    fetch('https://medical-camp-server-sage.vercel.app/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {
        setStats({
          totalCamps: 1422,
          totalParticipants: 1628,
          totalFeedbacks: 1395,
          totalOrganizers: 232,
          totalPayments: 3139,
        });
      });
  }, []);

  const items = [
    { label: 'Total Camps', value: stats.totalCamps, icon: <FaCampground size={30} className="text-green-600 dark:text-green-400" /> },
    { label: 'Participants', value: stats.totalParticipants, icon: <FaUsers size={30} className="text-blue-600 dark:text-blue-400" /> },
    { label: 'Feedbacks', value: stats.totalFeedbacks, icon: <FaComments size={30} className="text-yellow-500 dark:text-yellow-400" /> },
    { label: 'Organizers', value: stats.totalOrganizers, icon: <FaUserMd size={30} className="text-purple-500 dark:text-purple-400" /> },
    { label: 'Payments', value: stats.totalPayments, icon: <FaMoneyBillWave size={30} className="text-red-600 dark:text-red-400" /> },
  ];

  return (
    <div className=" transition-colors mt-8 duration-500  ">
      <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
        Our Community Impact
      </h1>

      {/* Responsive Grid */}
      <div className="grid 
                      grid-cols-1      /* mobile (default) */
                      sm:grid-cols-2   /* small devices, tablets */
                      md:grid-cols-3   /* medium devices, iPad/laptop */
                      lg:grid-cols-4   /* large laptops */
                      xl:grid-cols-5   /* extra large monitors */
                      gap-6 mt-10 max-w-8xl mx-auto  sm:px-4 ">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg 
                       text-center flex flex-col items-center
                       transform transition-transform duration-300 hover:scale-105"
            data-aos="zoom-in"
          >
            {item.icon}
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-2">
              <CountUp end={item.value} duration={2.5} />
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 font-medium">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountDown;
