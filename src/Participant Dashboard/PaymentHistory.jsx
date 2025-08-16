import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../AuthProvider/UseAuth';
import useAxiosSecure from '../AuthProvider/UseAxios';
//import vidbg from '../assets/image/1103996_1080p_Disease_3840x2160.mp4';
import { Helmet } from 'react-helmet-async';
import '../../src/App.css'
const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 5;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return   <div className="loader"></div>
  }

  const filteredPayments = payments.filter(payment =>
    payment.campName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(filteredPayments.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden z-500">
      {/*  Background Video */}
     {/*  <video
        src={vidbg}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      /> */}
      <Helmet>
        <title>ParmentHistory| MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
     </Helmet>
      {/* 🔲 Content Wrapper */}
      <div className="relative z-10 min-h-screen  bg-opacity-70 px-4 sm:px-6 lg:px-10 py-12 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">💳 Payment History</h2>

          {/*  Search */}
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="Search by Camp Name..."
              className="input input-bordered w-full max-w-sm text-black bg-white"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/*  Table Section */}
          {currentPayments.length === 0 ? (
            <p className="text-center text-gray-300">No payment history found.</p>
          ) : (
            <div className="w-full overflow-x-auto rounded-xl shadow-lg bg-white bg-opacity-90 text-black">
              <table className="table min-w-[640px] w-full text-sm md:text-base">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <tr>
                    <th className="px-3 py-2 text-left">Camp Name</th>
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Transaction ID</th>
                    <th className="px-3 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-200 transition">
                      <td className="px-3 py-2">{payment.campName}</td>
                      <td className="px-3 py-2 text-green-600 font-semibold">${payment.amount}</td>
                      <td className="px-3 py-2 break-all">{payment.transactionId}</td>
                      <td className="px-3 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/*  Pagination */}
          {filteredPayments.length > itemsPerPage && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
              <div>
                Showing {indexOfFirst + 1}–
                {Math.min(indexOfLast, filteredPayments.length)} of {filteredPayments.length}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-red-500 hover:bg-gray-600 disabled:opacity-40"
                >
                  ← Prev
                </button>

                {Array.from({ length: Math.ceil(filteredPayments.length / itemsPerPage) }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(filteredPayments.length / itemsPerPage)}
                  className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
