import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../../src/App.css'
const FeedBackFrom = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('https://medical-camp-server-sage.vercel.app/feedbacks')
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch feedbacks.');
        setLoading(false);
      });
  }, []);

  if (loading) return
  <div class="flex items-center justify-center min-h-screen">
  <span class="load"></span>
</div>
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;
  if (!feedbacks.length) return <p className="text-center mt-4 text-white">No feedbacks available.</p>;

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFeedbacks = feedbacks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative  overflow-hidden ">
      {/* Background Overlay */}
      <div className="absolute inset-0  bg-opacity-60 z-0" />

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <h2 className="text-3xl font-bold py-6 text-center text-white">
          📣 Participant Feedback
        </h2>

        {/* Full Width Grid */}
        <div className="grid grid-cols-1  md:grid-cols-2 px-6 lg:grid-cols-3 gap-10 w-full">
          {currentFeedbacks.map((fb) => (
            <div
              key={fb._id}
              className="bg-white bg-opacity-90 backdrop-blur-md shadow-md p-6 
                         transition-transform hover:scale-105 duration-300 border 
                         flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <img className="w-14 rounded-2xl" src={fb.participantImage} alt="" />
                  <h3 className="font-semibold text-indigo-700">{fb.participantName}</h3>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  {Array.from({ length: Math.round(fb.rating) }, (_, i) => (
                    <FaStar key={i} />
                  ))}
                  <span className="ml-1 text-black">({fb.rating} / 5)</span>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">"{fb.comment}"</p>
              <p className="text-sm text-gray-500 text-right">
                🕒 {fb.date ? new Date(fb.date).toLocaleDateString() : 'Unknown Date'}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {feedbacks.length > itemsPerPage && (
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-sm"
            >
              ←
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-sm"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedBackFrom;
