import React, { useEffect, useState } from 'react';

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/feedbacks') // ✅ তোমার Backend route
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched Feedbacks:', data);
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading feedbacks:', err);
        setError('Failed to fetch feedbacks.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4">Loading feedbacks...</p>;
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;
  if (!feedbacks.length) return <p className="text-center mt-4">No feedbacks available.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Participant Feedback</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="border p-4 rounded shadow-sm text-black bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{fb.participantName}</h3>
              <span className="text-yellow-500 font-bold">Rating: {fb.rating} / 5</span>
            </div>
            <p className="mb-2">{fb.comment}</p>
            <small className="text-gray-500">Submitted: {new Date(fb.date).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFeedbacks;
