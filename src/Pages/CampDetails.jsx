import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../AuthProvider/UseAuth";
import useAxiosSecure from "../AuthProvider/UseAxios";
import { Helmet } from "react-helmet-async";

const CampDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const axios = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch camp details
  const { data: camp, isLoading, refetch } = useQuery({
    queryKey: ["camp-details", id],
    queryFn: async () => {
      const res = await axios.get(`https://medical-camp-server-sage.vercel.app/camps/${id}`);
      return res.data;
    },
  });

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const joinData = {
      campId: id,
      participantName: user?.displayName || "Anonymous",
      participantEmail: user?.email,
      age: form.age.value,
      phone: form.phone.value,
      gender: form.gender.value,
      emergencyContact: form.emergency.value,
      campName: camp?.name || "",
      fees: camp?.fees || 0,
      location: camp?.location || "",
      doctor: camp?.doctor || "",
      payment_status: "unpaid",
    };

    try {
      const res = await axios.post("/join-camp", joinData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "You have joined the camp!", "success");
        setShowModal(false);
        navigate('/availecamp');
        refetch();
      }
    } catch (error) {
      console.error("Join error:", error);
      Swal.fire("Error", "Failed to join the camp.", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!camp) return <p className="text-center mt-10">Camp not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 md:px-10 mt-10 md:mt-20">
      <Helmet>
        <title>Camp Details | MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
      </Helmet>

      {/* Camp Details */}
      <div className="bg-white text-black shadow-lg rounded-xl overflow-hidden md:flex md:space-x-6">
        <div className="md:w-1/2">
          <img
            src={camp?.image || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={camp?.name || "Camp"}
            className="w-full h-60 sm:h-72 md:h-80 object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-blue-700">{camp?.name || "No Name"}</h2>
            <p><strong>Camp Fees:</strong> ${camp?.fees ?? "N/A"}</p>
            <p><strong>Date & Time:</strong> {camp?.dateTime ?? "N/A"}</p>
            <p><strong>Location:</strong> {camp?.location ?? "N/A"}</p>
            <p><strong>Healthcare Professional:</strong> {camp?.doctor ?? "N/A"}</p>
            <p><strong>Participants:</strong> {camp?.participantCount ?? 0}</p>
            <p className="mt-4 text-gray-600">{camp?.description ?? "No description available."}</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary mt-6 w-full"
          >
            Join Camp
          </button>
        </div>
      </div>

      {/* Join Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50 px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-lg p-6 sm:p-8 rounded-xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-red-500"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Join Camp Registration</h2>

            <form onSubmit={handleJoinSubmit} className="space-y-3">
              <input value={camp?.name || ""} readOnly className="input input-bordered w-full" />
              <input value={`$${camp?.fees || 0}`} readOnly className="input input-bordered w-full" />
              <input value={camp?.location || ""} readOnly className="input input-bordered w-full" />
              <input value={camp?.doctor || ""} readOnly className="input input-bordered w-full" />
              <input value={user?.displayName || ""} readOnly className="input input-bordered w-full" />
              <input value={user?.email || ""} readOnly className="input input-bordered w-full" />

              <input
                type="number"
                name="age"
                placeholder="Your Age"
                required
                min={1}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                className="input input-bordered w-full"
              />
              <select
                name="gender"
                required
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="text"
                name="emergency"
                placeholder="Emergency Contact"
                required
                className="input input-bordered w-full"
              />

              <button type="submit" className="btn btn-primary w-full mt-2">
                Confirm Join
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampDetails;
