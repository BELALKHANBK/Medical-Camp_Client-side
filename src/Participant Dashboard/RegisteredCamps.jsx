// src/Participant Dashboard/RegisteredCamps.jsx

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../AuthProvider/UseAuth';
import useAxiosSecure from '../AuthProvider/UseAxios';
import { useNavigate } from 'react-router';

const RegisteredCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Feedback Modal state
  const [feedbackModal, setFeedbackModal] = useState({ open: false, campId: null });

  // Fetch Registered Camps (React Query v5 style)
  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['registeredCamps', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`joine/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Cancel registration mutation (React Query v5 style)
  const cancelMutation = useMutation({
    mutationFn: async (campId) => {
      await axiosSecure.delete(`joine/cancel/${campId}`);
    },
    onSuccess: () => {
      Swal.fire('Cancelled!', 'Registration cancelled successfully.', 'success');
      queryClient.invalidateQueries(['registeredCamps', user?.email]);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to cancel registration.', 'error');
    }
  });

  // Handle cancel button click
  const handleCancel = (campId, paymentStatus) => {
    if (paymentStatus === 'Paid') {
      Swal.fire('Action denied', 'You cannot cancel after payment.', 'info');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel your registration?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(campId);
      }
    });
  };

  // Navigate to Payment page (adjust your route accordingly)
  const handlePay = (campId) => {
     navigate(`/participent/payments/${campId}`);
  };

  // Feedback form submit handler
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;
    const campId = feedbackModal.campId;

    try {
      await axiosSecure.post('/feedbacks', {
        campId,
        participantEmail: user.email,
        participantName: user.displayName,
        rating: Number(rating),
        comment,
        date: new Date().toISOString(),
      });

      Swal.fire('Thank you!', 'Your feedback has been submitted.', 'success');
      setFeedbackModal({ open: false, campId: null });
    } catch (error) {
      Swal.fire('Error', 'Failed to submit feedback.', 'error');
    }
  };

  if (isLoading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Registered Camps</h2>

      {camps.length === 0 ? (
        <p className="text-center text-gray-600">No camps registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse  border-gray-300">
            <thead>
              <tr className="bg-green-200 text-black ">
                <th className="border border-gray-300 px-4 py-2">Camp Name</th>
                <th className="border border-gray-300 px-4 py-2">Fees</th>
                <th className="border border-gray-300 px-4 py-2">Participant Name</th>
                <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                <th className="border border-gray-300 px-4 py-2">Confirmation Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {camps.map((camp) => (
                <tr key={camp._id} className="text-center border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{camp.campName}</td>
                  <td className="border border-gray-300 px-4 py-2">${camp.fees}</td>
                  <td className="border border-gray-300 px-4 py-2">{camp.participantName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {camp.paymentStatus === 'Paid' ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <>
                        <span className="text-red-600 font-semibold">Unpaid</span>
                        <button
                          onClick={() => handlePay(camp._id)}
                          className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                          Pay
                        </button>
                      </>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {camp.confirmationStatus || 'Pending'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                       {camp.paymentStatus !== 'Paid' && (
                         <button
                           onClick={() => handleCancel(camp._id, camp.paymentStatus)}
                           className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white transition"
                         >
                           Cancel
                         </button>
                                            )}

                       {camp.paymentStatus === 'Paid' && (
                         <button
                           onClick={() => setFeedbackModal({ open: true, campId: camp._id })}
                           className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
                         >
                           Feedback
                         </button>
                       )}
                     </td>

                                     </tr>
                                   ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Submit Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <label className="block mb-2 font-semibold" htmlFor="rating">Rating (1-5):</label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                required
                className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
              />

              <label className="block mb-2 font-semibold" htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                required
                className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setFeedbackModal({ open: false, campId: null })}
                  className="px-4 py-2 rounded border border-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisteredCamps;
