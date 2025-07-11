// src/Participant Dashboard/PaymentHistory.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../AuthProvider/UseAuth';
import useAxiosSecure from '../AuthProvider/UseAxios';


const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <p className="text-center mt-6">Loading Payment History...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment history found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-green-200 text-black">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Camp Name</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment._id} className="text-center">
                  <td className="border px-4 py-2">{payment.campName}</td>
                  <td className="border px-4 py-2">${payment.amount}</td>
                  <td className="border px-4 py-2">{payment.transactionId}</td>
                  <td className="border px-4 py-2">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
