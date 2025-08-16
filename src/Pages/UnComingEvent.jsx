import React from "react";
import { motion } from "framer-motion";

const UnComingEvent = () => {
  const events = [
    {
      title: "Blood Donation Camp",
      date: "August 15, 2025",
      location: "Dhaka Medical Center",
      description: "Join us for a noble cause. Save lives by donating blood and get free health checkups."
    },
    {
      title: "Health Awareness Seminar",
      date: "September 3, 2025",
      location: "Chattogram Community Hall",
      description: "Attend a seminar on diabetes, high blood pressure, and general well-being."
    },
    {
      title: "Free Eye Check-up Camp",
      date: "October 10, 2025",
      location: "Rajshahi Central Hospital",
      description: "Get your eyes tested for free by experienced ophthalmologists."
    }
  ];

  return (
    <section className=" py-12  md:px-12">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Upcoming Health Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-1">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-gray-700 mt-2">{event.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UnComingEvent;
