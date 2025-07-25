import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../AuthProvider/UseAuth';
import useAxiosSecure from '../AuthProvider/UseAxios';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

const RegisteredCamps = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [feedbackModal, setFeedbackModal] = useState({ open: false, campId: null, campName: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 5;

  // ইউজারের রেজিস্টার্ড ক্যাম্প গুলো ফেচ
  const { data: camps = [], isLoading: campsLoading } = useQuery({
    queryKey: ['registeredCamps', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`joine/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ইউজারের দেওয়া ফিডব্যাক গুলো ফেচ
  const { data: userFeedbacks = [], isLoading: feedbacksLoading } = useQuery({
    queryKey: ['userFeedbacks', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedbacks?participantEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Registration Cancel করার মিউটেশন
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
    },
  });

  const handleCancel = (campId, paymentStatus) => {
    if (paymentStatus === 'Paid') {
      Swal.fire('Action denied', 'You cannot cancel after payment.', 'info');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel your registration?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(campId);
      }
    });
  };

  const handlePay = (campId) => {
    navigate(`/participent/payments/${campId}`);
  };

  // ইউজার ঐ camp এ ফিডব্যাক দিয়েছে কিনা চেক করার ফাংশন
  const hasGivenFeedback = (campId) => {
    return userFeedbacks.some((feedback) => feedback.campId === campId);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;
    const campId = feedbackModal.campId;
    const campName = feedbackModal.campName;

    try {
     await axiosSecure.post('/feedbacks', {
  campId,
  campName,
  participantEmail: user.email,
  participantName: user.displayName,
  participantImage: user.photoURL || "",  // এই লাইন যোগ করো
  rating: Number(rating),
  comment,
  date: new Date().toISOString(),
});
console.log("User Image:", user?.photoURL);



      Swal.fire('Thank you!', 'Your feedback has been submitted.', 'success');
      setFeedbackModal({ open: false, campId: null, campName: null });
      form.reset();

      // ফিডব্যাক দেওয়ার পর ইউজারের ফিডব্যাক লিস্ট রিফ্রেশ করো
      queryClient.invalidateQueries(['userFeedbacks', user?.email]);
    } catch (error) {
      Swal.fire('Error', 'Failed to submit feedback.', 'error');
    }
  };

  if (campsLoading || feedbacksLoading) return <p className="text-center mt-6">Loading...</p>;

  const filteredCamps = camps.filter((camp) =>
    camp.campName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCamps = filteredCamps.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Helmet>
        <title>RegisterCamps | MedCampMS</title>
        <meta
          name="description"
          content="Welcome to MedCampMS - Your trusted medical camp management system."
        />
      </Helmet>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">📋 Your Registered Camps</h2>

      {/* Search Box */}
      <div className="mb-4 flex justify-center text-black md:text-white lg:text-white">
        <input
          type="text"
          placeholder="🔍 Search by Camp Name..."
          className="input input-bordered w-full max-w-xs placeholder-blue-700 text-black md:text-white lg:text-white"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          
        />
      </div>

      {/* Camps Table */}
      {currentCamps.length === 0 ? (
        <p className="text-center text-gray-600">No camps registered yet.</p>
      ) : (
        <div className="overflow-x-auto mt-8 rounded-lg shadow-md">
          <table className="table min-w-[640px] w-full text-sm md:text-base">
            <thead className="bg-green-200 text-black">
              <tr>
                <th className="px-4 py-2">Camp</th>
                <th className="px-4 py-2">Fees</th>
                <th className="px-4 py-2 hidden sm:table-cell">Participant</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2 hidden sm:table-cell">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCamps.map((camp) => (
                <tr key={camp._id} className="hover:bg-gray-500 text-center">
                  <td className="border px-3 py-2">{camp.campName}</td>
                  <td className="border px-3 py-2">${camp.fees}</td>
                  <td className="border px-3 py-2 hidden sm:table-cell">{camp.participantName}</td>
                  <td className="border px-3 py-2">
                    {camp.paymentStatus === 'Paid' ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <>
                        <span className="text-red-600 font-semibold">Unpaid</span>
                        <button
                          onClick={() => handlePay(camp._id)}
                          className="ml-2 btn btn-sm btn-success mt-2 sm:mt-0"
                        >
                          Pay
                        </button>
                      </>
                    )}
                  </td>
                  <td className="border px-3 py-2 hidden sm:table-cell">
                    {camp.confirmationStatus || 'Pending'}
                  </td>
                  <td className="border px-3 py-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                    {camp.paymentStatus !== 'Paid' && (
                      <button
                        onClick={() => handleCancel(camp._id, camp.paymentStatus)}
                        className="btn btn-sm btn-error"
                      >
                        Cancel
                      </button>
                    )}

                    {camp.paymentStatus === 'Paid' && !hasGivenFeedback(camp._id) && (
                      <button
                        onClick={() =>
                          setFeedbackModal({ open: true, campId: camp._id, campName: camp.campName })
                        }
                        className="btn btn-sm btn-info"
                      >
                        Feedback
                      </button>
                    )}

                    {camp.paymentStatus === 'Paid' && hasGivenFeedback(camp._id) && (
                      <span className="text-green-600 font-semibold">Feedback Submitted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {filteredCamps.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-3">
          <p className="text-sm">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCamps.length)} of{' '}
            {filteredCamps.length}
          </p>
          <div className="flex flex-wrap gap-2">
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
        </div>
      )}

      {/* Feedback Modal */}
{feedbackModal.open && (
  <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 px-4">
    <div className="bg-white text-black rounded-lg p-6 w-full max-w-md relative">
      <button
        onClick={() => setFeedbackModal({ open: false, campId: null, campName: null })}
        className="absolute top-2 right-3 text-xl text-red-600 hover:text-red-800"
        aria-label="Close"
      >
        &times;
      </button>

      <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">
        Submit Feedback for <span className="italic">{feedbackModal.campName}</span>
      </h3>

      {user?.photoURL ? (
        <div className="flex justify-center mb-4">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-20 h-20 rounded-full object-cover border"
          />
        </div>
      ) : (
        <div className="flex justify-center mb-4">
          <img
            src="https://via.placeholder.com/80"
            alt="default user"
            className="w-20 h-20 rounded-full object-cover border"
          />
        </div>
      )}

      <form onSubmit={handleFeedbackSubmit}>
        <label className="block mb-2 font-semibold">Rating (1-5):</label>
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          required
          className="input input-bordered text-white lg:text-white  w-full mb-4"
        />

        <label className="block mb-2 font-semibold">Comment:</label>
        <textarea
          name="comment"
          rows="4"
          required
          className="textarea textarea-bordered text-white lg:text-white  w-full mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setFeedbackModal({ open: false, campId: null, campName: null })}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
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
