import React from 'react';

import useAuth from '../AuthProvider/UseAuth';
import useAxoiseSecure from '../AuthProvider/UseAxios';
import { useQuery } from '@tanstack/react-query';
const formateData =(iso) => new data(iso).toLocaleString()
const PaymentHistory = () => {
    const {user}=useAuth();
    const axiosSor=useAxoiseSecure();
   const { isLoading, isError, data: payments = [] } = useQuery({
  queryKey: ['payments', user.email],
  enabled: !!user?.email, // important!
  queryFn: async () => {
    const res = await axiosSor.get(`/payments?email=${user.email}`);
    return res.data;
  },
});

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-red-500 text-center">Failed to load payment history</p>;

    return (
         <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-gray-800">
              <tr>
                <th>#</th>
                <th>Camp ID</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Transaction ID</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td className="text-blue-500 break-all">{payment.campId}</td>
                  <td>{payment.email}</td>
                  <td className="text-green-700 font-semibold">{payment.amount}৳</td>
                  <td className="capitalize">{payment.paymentMethod}</td>
                  <td className="text-sm break-all">{payment.transactionId}</td>
                  <td>{formateData(payment.paid_at).format('DD MMM YYYY, hh:mm A')}</td>
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