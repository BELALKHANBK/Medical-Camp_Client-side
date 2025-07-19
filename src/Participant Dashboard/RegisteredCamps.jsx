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

  const [feedbackModal, setFeedbackModal] = useState({ open: false, campId: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 5;

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['registeredCamps', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`joine/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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

  const filteredCamps = camps.filter(camp =>
    camp.campName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCamps = filteredCamps.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 md:p-6 max-w-7xl  mx-auto">
                      <Helmet>
                        <title>RegisterCamps| MedCampMS</title>
                        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
                      </Helmet>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">📋 Your Registered Camps</h2>

      {/* 🔍 Search Box */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search by Camp Name..."
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* ✅ Table */}
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
                <tr key={camp._id} className="hover:bg-gray-100 text-center">
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
                    {camp.paymentStatus === 'Paid' && (
                      <button
                        onClick={() => setFeedbackModal({ open: true, campId: camp._id })}
                        className="btn btn-sm btn-info"
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

      {/* ✅ Pagination */}
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

      {/* ✅ Feedback Modal */}
      {feedbackModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Submit Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <label className="block mb-2 font-semibold">Rating (1-5):</label>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                required
                className="input input-bordered w-full mb-4"
              />
              <label className="block mb-2 font-semibold">Comment:</label>
              <textarea
                name="comment"
                rows="4"
                required
                className="textarea textarea-bordered w-full mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFeedbackModal({ open: false, campId: null })}
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
