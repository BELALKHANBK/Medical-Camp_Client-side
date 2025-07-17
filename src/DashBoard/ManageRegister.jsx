import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";
import useAxiosSecure from "../AuthProvider/UseAxios";

const ManageRegister = () => {
  const { user, role } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const axiosSecure = useAxiosSecure();

  const isOrganizer = role === "organizer";

  useEffect(() => {
    if (!user?.email || !role) return;

    axiosSecure
      .get(`//${user.email}`)
      .then((res) => {
        setRegistrations(res.data);
      })
      .catch((err) => console.error("Error fetching self-joined camps:", err));

    if (isOrganizer) {
      axiosSecure
        .get(`/joine?email=${user.email}&role=${role}`)
        .then((res) => {
          setRegistrations((prev) => {
            const newData = res.data.filter(
              (item) => !prev.some((prevItem) => prevItem._id === item._id)
            );
            return [...prev, ...newData];
          });
        })
        .catch((err) => console.error("Organizer managed camps fetch error:", err));
    }
  }, [user, role, axiosSecure, isOrganizer]);

  const handleConfirm = (id) => {
    axiosSecure
      .patch(`/joine/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Confirmed!", "Participant status updated.", "success");
          setRegistrations((prev) =>
            prev.map((reg) =>
              reg._id === id ? { ...reg, confirmationStatus: "Confirmed" } : reg
            )
          );
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to update status.", "error");
      });
  };

  const handleCancel = (id, isPaid, isConfirmed) => {
    if (!isOrganizer) {
      Swal.fire("Not Allowed", "Only organizers can cancel registrations.", "warning");
      return;
    }

    if (isPaid && isConfirmed) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/joine/cancel/${id}`)
          .then((res) => {
            if (res.data.message === "Registration cancelled successfully") {
              Swal.fire("Cancelled!", "Registration removed.", "success");
              setRegistrations((prev) => prev.filter((item) => item._id !== id));
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to cancel registration.", "error");
          });
      }
    });
  };

  const filtered = registrations.filter((reg) =>
    reg.campName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Registered Camps</h2>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Camp Name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-bordered w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
        />
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Camp Name</th>
              <th>Fees</th>
              <th>Participant Name</th>
              <th>Payment</th>
              <th>Confirmation</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item._id} className="text-center">
                  <td>{startIndex + index + 1}</td>
                  <td>{item.campName}</td>
                  <td>${item.fees}</td>
                  <td>{item.participantName}</td>
                  <td>
                    <span
                      className={`badge ${item.paymentStatus === "Paid" ? "badge-success" : "badge-error"
                        }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {item.confirmationStatus === "Confirmed" ? (
                      <span className="badge badge-success">Confirmed</span>
                    ) : isOrganizer ? (
                      <button
                        onClick={() => handleConfirm(item._id)}
                        className="btn btn-sm btn-warning"
                      >
                        Pending
                      </button>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td>
                    <button
                      disabled={item.paymentStatus === "Paid" && item.confirmationStatus === "Confirmed"}
                      onClick={() =>
                        handleCancel(
                          item._id,
                          item.paymentStatus === "Paid",
                          item.confirmationStatus === "Confirmed"
                        )
                      }
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-red-500">
                  No Registered Camps Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div>
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-sm"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-sm"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRegister;
