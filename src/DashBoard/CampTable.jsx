import React from "react";
import { FaEye, FaTrash, FaMoneyCheckAlt } from "react-icons/fa";

const CampTable = ({ camps, onDelete, onPay, onView, user }) => {
  const isAdmin = user?.role === "admin";

  const handleDelete = (campId) => {
    if (!isAdmin) {
      alert("Only admin can delete this camp.");
      return;
    }

    onDelete(campId, {
      headers: { email: user.email },
    });
  };

  return (
    <div className="mt-6">
      <div className="overflow-x-auto hidden md:block">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Participant</th>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => {
              const isPayer = user?.email === camp.email; // পে করার user চেক
              const isPaid = camp.payment_status === "paid";

              return (
                <tr key={camp._id}>
                  <td>{index + 1}</td>
                  <td>{camp.name || "N/A"}</td>
                  <td>{camp.camp_name}</td>
                  <td>৳ {camp.fees}</td>
                  <td>{camp.location || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        isPaid ? "badge-success" : "badge-error"
                      }`}
                    >
                      {isPaid ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView(camp)}
                        className="btn btn-xs btn-info"
                        title="View"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => onPay(camp._id)}
                        className="btn btn-xs btn-success"
                        disabled={!isPayer || isPaid}
                        title={
                          isPaid
                            ? "Already Paid"
                            : !isPayer
                            ? "You can't pay for this camp"
                            : "Pay Now"
                        }
                      >
                        <FaMoneyCheckAlt />
                      </button>

                      <button
                        onClick={() => handleDelete(camp._id)}
                        className="btn btn-xs btn-error"
                        disabled={!isAdmin}
                        title={isAdmin ? "Delete" : "Only admin can delete"}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {camps.map((camp, index) => {
          const isPayer = user?.email === camp.email;
          const isPaid = camp.payment_status === "paid";

          return (
            <div key={camp._id} className="card bg-base-100 shadow-md p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">#{index + 1}</h2>
                <span
                  className={`badge ${
                    isPaid ? "badge-success" : "badge-error"
                  }`}
                >
                  {isPaid ? "Paid" : "Unpaid"}
                </span>
              </div>
              <p>
                <strong>Participant:</strong> {camp.name || "N/A"}
              </p>
              <p>
                <strong>Camp:</strong> {camp.camp_name}
              </p>
              <p>
                <strong>Fees:</strong> ৳ {camp.fees}
              </p>
              <p>
                <strong>Location:</strong> {camp.location || "N/A"}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => onView(camp)}
                  className="btn btn-xs btn-info"
                >
                  <FaEye /> View
                </button>

                <button
                  onClick={() => onPay(camp._id)}
                  className="btn btn-xs btn-success"
                  disabled={!isPayer || isPaid}
                >
                  <FaMoneyCheckAlt /> Pay
                </button>

                <button
                  onClick={() => handleDelete(camp._id)}
                  className="btn btn-xs btn-error"
                  disabled={!isAdmin}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampTable;
