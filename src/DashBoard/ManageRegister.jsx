import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";
import useAxiosSecure from "../AuthProvider/UseAxios";

const ManageRegister = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const axiosSecure = useAxiosSecure();

  // ধরলাম user object এ role আছে, যদি না থাকে তাহলে সেটাপ দিতে হবে
  const isOrganizer = user?.role === "organizer";

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/joine?email=${user.email}`)
        .then((res) => setRegistrations(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

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
    // যদি ইউজার organizer না হয়, cancel করতে না দেয়া এবং alert দেখাও
    if (!isOrganizer) {
      Swal.fire(
        "Not Allowed",
        "Only organizers can cancel registrations.",
        "warning"
      );
      return;
    }

    // Paid & Confirmed হলে cancel করো না (button তো disable আছে)
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
          .delete(`/joine/cancel/${id}`)  // তোমার backend অনুযায়ী URL ঠিকঠাক সেট করো
          .then((res) => {
            if (res.data.message === "Registration cancelled successfully") {
              Swal.fire("Cancelled!", "Registration removed.", "success");
              setRegistrations((prev) =>
                prev.filter((item) => item._id !== id)
              );
            }
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to cancel registration.", "error");
          });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Registered Camps</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
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
            {registrations.length > 0 ? (
              registrations.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.campName}</td>
                  <td>{item.fees}</td>
                  <td>{item.participantName}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.paymentStatus === "Paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {item.confirmationStatus === "Confirmed" ? (
                      <span className="badge badge-success">Confirmed</span>
                    ) : (
                      <button
                        onClick={() => handleConfirm(item._id)}
                        className="btn btn-sm btn-warning"
                      >
                        Pending
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      disabled={
                        item.paymentStatus === "Paid" &&
                        item.confirmationStatus === "Confirmed"
                      }
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
    </div>
  );
};

export default ManageRegister;
