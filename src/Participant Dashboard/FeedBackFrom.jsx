import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../AuthProvider/UseAxios';


const FeedbackFrom = ({ campId }) => {
  const axiosSecure = useAxiosSecure();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!campId) return;

    const fetchFeedbacks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosSecure.get(`/feedbacks/${campId}`);
        console.log('Feedback API response:', res.data);
        setFeedbacks(res.data);
      } catch (err) {
        console.error('Failed to load feedbacks:', err);
        setError('Failed to load feedbacks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [campId, axiosSecure]);

  if (loading) return <p className="text-center mt-4">Loading feedbacks...</p>;
  if (error) return <p className="text-center mt-4 text-red-600">{error}</p>;
  if (!feedbacks.length) return <p className="text-center mt-4">No feedback available yet.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Feedbacks</h2>
      <div className="space-y-4">
        {feedbacks.map(fb => (
          <div key={fb._id} className="border p-4 rounded shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{fb.participantName}</h3>
              <span className="text-yellow-500 font-bold">Rating: {fb.rating} / 5</span>
            </div>
            <p className="mb-2">{fb.comment}</p>
            <small className="text-gray-500">Submitted on: {new Date(fb.date).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackFrom;
