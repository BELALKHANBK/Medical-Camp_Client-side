import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import useAuth from "../AuthProvider/UseAuth";
import useAxiosSecure from "../AuthProvider/UseAxios";


const RegisteredCamps = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  const { data: registeredCamps = [], isLoading, refetch } = useQuery({
    queryKey: ["registered-camps", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/joined-camps?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading your registered camps...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-4">My Registered Camps</h2>
      {registeredCamps.length === 0 ? (
        <p>You have not registered for any camps yet.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Camp Name</th>
              <th className="border border-gray-300 p-2">Date & Time</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Payment Status</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {registeredCamps.map((camp) => (
              <tr key={camp._id} className="text-center">
                <td className="border border-gray-300 p-2">{camp.campName}</td>
                <td className="border border-gray-300 p-2">{camp.dateTime || "N/A"}</td>
                <td className="border border-gray-300 p-2">{camp.location}</td>
                <td className="border border-gray-300 p-2">
                  {camp.payment_status === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unpaid</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {camp.payment_status !== "paid" && (
                    <Link
                      to={`/dashboard/payment/${camp.campId}`}
                      className="btn btn-sm btn-primary"
                    >
                      Pay Now
                    </Link>
                  )}
                  {camp.payment_status === "paid" && <button disabled className="btn btn-sm btn-success">Paid</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RegisteredCamps;
