import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";

const ManageRegister = () => {
  const { user, role, loading } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (role === "organizer") {
      axios
        .get("https://medical-camp-server-sage.vercel.app/registrations")
        .then((res) => setRegistrations(res.data))
        .catch((err) => console.error("Error loading data:", err));
    }
  }, [role]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this registration!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://medical-camp-server-sage.vercel.app/registrations/${id}`)
          .then(() => {
            setRegistrations((prev) => prev.filter((reg) => reg._id !== id));
            Swal.fire({
              icon: "success",
              title: "Cancelled",
              timer: 1500,
              showConfirmButton: false,
              toast: true,
              position: "top-end",
            });
          })
          .catch((err) => {
            console.error("Cancellation failed:", err);
            Swal.fire({
              icon: "error",
              title: "Cancellation Failed",
              text: "Something went wrong, please try again.",
            });
          });
      }
    });
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (role !== "organizer") {
    return (
      <div className="text-center text-red-600 mt-10 text-xl">
         You are not authorized to view this page.
      </div>
    );
  }

  // === Search filtering ===
  const filteredRegistrations = registrations.filter((reg) => {
    const term = searchTerm.toLowerCase();
    return (
      reg.participantName.toLowerCase().includes(term) ||
      reg.participantEmail.toLowerCase().includes(term) ||
      (reg.campName && reg.campName.toLowerCase().includes(term)) ||
      (reg.location && reg.location.toLowerCase().includes(term))
    );
  });

  // === Pagination calculations ===
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRegistrations = filteredRegistrations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // === Handle page change ===
  const goToPage = (pageNum) => {
    if (pageNum < 1) pageNum = 1;
    else if (pageNum > totalPages) pageNum = totalPages;
    setCurrentPage(pageNum);
  };

  return (
    <div className="p-4 max-w-full mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-700">
        All Camp Registrations
      </h2>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, email, camp or location..."
          className="input input-bordered w-full max-w-md  bg-gray-400 text-black md:text-white lg:text-white"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page on search
          }}
        />
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full table-auto border border-collapse border-gray-300">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="border px-2 py-1 text-xs">No.</th>
              <th className="border px-2 py-1 text-xs">Name</th>
              <th className="border px-2 py-1 text-xs">Email</th>
              <th className="border px-2 py-1 text-xs">Age</th>
              <th className="border px-2 py-1 text-xs">Phone</th>
              <th className="border px-2 py-1 text-xs">Camp</th>
              <th className="border px-2 py-1 text-xs">Location</th>
              <th className="border px-2 py-1 text-xs">Doctor</th>
              <th className="border px-2 py-1 text-xs">Fee</th>
              <th className="border px-2 py-1 text-xs">Payment</th>
              <th className="border px-2 py-1 text-xs">Status</th>
              <th className="border px-2 py-1 text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRegistrations.map((reg, index) => {
              const paidStatus = (reg.paymentStatus || reg.payment_status || "").toLowerCase();
              const isPaid = paidStatus === "paid";

              return (
                <tr key={reg._id} className="hover:bg-blue-500 text-xs">
                  <td className="border px-2 py-1 text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border px-2 py-1">{reg.participantName}</td>
                  <td className="border px-2 py-1">{reg.participantEmail}</td>
                  <td className="border px-2 py-1 text-center">{reg.age}</td>
                  <td className="border px-2 py-1">{reg.phone}</td>
                  <td className="border px-2 py-1">{reg.campName}</td>
                  <td className="border px-2 py-1">{reg.location}</td>
                  <td className="border px-2 py-1">{reg.doctor}</td>
                  <td className="border px-2 py-1 text-right">{reg.fees}৳</td>
                  <td className="border px-2 py-1">{reg.paymentStatus || "Unpaid"}</td>
                  <td className="border px-2 py-1">{reg.confirmationStatus || "Pending"}</td>
                  <td className="border px-2 py-1 text-center">
                    <button
                      disabled={isPaid}
                      onClick={() => handleCancel(reg._id)}
                      className={`font-semibold px-2 py-1 rounded text-xs ${
                        isPaid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-700 text-white"
                      }`}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-sm"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageRegister;
