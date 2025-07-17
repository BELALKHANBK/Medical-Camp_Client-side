import React, { useEffect, useState } from 'react';
import bgVideo from '../assets/image/1103996_1080p_Disease_3840x2160.mp4'; // Ensure .mp4 file

const FeedBackFrom = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/feedbacks')
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch feedbacks.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4 text-white">Loading feedbacks...</p>;
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;
  if (!feedbacks.length) return <p className="text-center mt-4 text-white">No feedbacks available.</p>;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ✅ Scoped background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0  bg-opacity-60" />
      </div>

      {/* ✅ Main Content */}
      <div className="relative z-10 max-w-6xl  mx-auto p-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-white">📣 Participant Feedback</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-6 transition-transform hover:scale-105 duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-indigo-700">{fb.participantName}</h3>
                <span className="text-yellow-500 font-bold">⭐ {fb.rating} / 5</span>
              </div>
              <p className="text-gray-700 italic mb-3">"{fb.comment}"</p>
              <p className="text-sm text-gray-500 text-right">
                🕒 {new Date(fb.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedBackFrom;
