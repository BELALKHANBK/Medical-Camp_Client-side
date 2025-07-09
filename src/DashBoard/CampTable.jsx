import React from "react";
import { FaEye, FaTrash, FaMoneyCheckAlt } from "react-icons/fa";

const CampTable = ({ camps, onDelete, onPay, onView, onDetails }) => {
  return (
    <div className="mt-6">
      {/* ✅ Table for medium and larger devices */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Participant Name</th>
              <th>Camp Name</th>
              <th>Camp Fees</th>
              <th>Location</th>
              <th>Status</th>
              <th>Confirmation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={camp._id}>
                <td>{index + 1}</td>
                <td>{camp.name || <span className="text-gray-400">N/A</span>}</td>
                <td>{camp.camp_name}</td>
                <td>$ {camp.fees}</td>
                <td>{camp.location || <span className="text-gray-400">N/A</span>}</td>
                <td>
                  {camp.payment_status === "paid" ? (
                    <span className="badge badge-success">Paid</span>
                  ) : (
                    <span className="badge badge-error">Unpaid</span>
                  )}
                </td>
            {/*     <td>
                  {camp.payment_status === "paid" ? (
                    <span className="badge badge-success">Confirmed</span>
                  ) : (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td> */}
                <td>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onView(camp)} className="btn btn-xs btn-info" title="View">
                      <FaEye />
                    </button>
                    <div className="tooltip" data-tip="Pay Now">
                      <button onClick={() => onPay(camp._id)} className="btn btn-xs btn-success">
                        <FaMoneyCheckAlt />
                      </button>
                    </div>
                    <button
                      onClick={() => onDelete(camp._id)}
                      className="btn btn-xs btn-error"
                      title="Delete"
                      disabled={camp.isPaid === true}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Card view for small screens */}
      <div className="block md:hidden space-y-4">
        {camps.map((camp, index) => (
          <div key={camp._id} className="card bg-base-100 shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">#{index + 1}</h2>
              <span className={`badge text-white ${camp.payment_status === "paid" ? 'badge-success' : 'badge-error'}`}>
                {camp.payment_status === "paid" ? "Paid" : "Unpaid"}
              </span>
            </div>
            <p><strong>Participant:</strong> {camp.name || "N/A"}</p>
            <p><strong>Camp Name:</strong> {camp.camp_name}</p>
            <p><strong>Fees:</strong> ৳ {camp.fees}</p>
            <p><strong>Location:</strong> {camp.location || "N/A"}</p>
           
            <div className="flex flex-wrap gap-2 mt-3">
              <button onClick={() => onView(camp)} className="btn btn-xs btn-info">
                <FaEye /> View
              </button>
              <div className="tooltip" data-tip="Pay Now">
                <button onClick={() => onPay(camp._id)} className="btn btn-xs btn-success">
                  <FaMoneyCheckAlt />
                </button>
              </div>
              <button
                onClick={() => onDelete(camp._id)}
                className="btn btn-xs btn-error"
                disabled={camp.isPaid}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampTable;
