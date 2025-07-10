import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import useAuth from '../AuthProvider/UseAuth';
import useAxoiseSecure from '../AuthProvider/UseAxios';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxoiseSecure();

  const { data: payments = [], isPending, isError } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`http://localhost:5000/payments?email=${user.email}`);
      return res.data;
    }
  });

  if (isPending) return <p className="text-center mt-10">Loading payment history...</p>;
  if (isError) return <p className="text-center text-red-600">Failed to load payment history</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="table w-full table-zebra">
            <thead className="bg-base-200 text-gray-700">
              <tr>
                <th>#</th>
                <th>Camp ID</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Transaction ID</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td className="text-blue-500 break-words">{payment.campId}</td>
                  <td>{payment.email}</td>
                  <td className="text-green-700 font-semibold">{payment.amount}৳</td>
                  <td className="capitalize">{payment.paymentMethod || 'N/A'}</td>
                  <td className="break-all text-sm">{payment.transactionId}</td>
                  <td>{moment(payment.paid_at_string).format('DD MMM YYYY, hh:mm A')}</td>
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


