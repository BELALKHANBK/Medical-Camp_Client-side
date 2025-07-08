import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../AuthProvider/UseAuth";


const CampDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  // Camp details fetch
  const { data: camp, isLoading, refetch } = useQuery({
    queryKey: ["camp-details", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/camps/${id}`);
      return res.data;
    },
  });

  // Join Camp Submit
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const joinData = {
      campId: id,
      participantName: user?.displayName,
      participantEmail: user?.email,
      age: form.age.value,
      phone: form.phone.value,
      gender: form.gender.value,
      emergencyContact: form.emergency.value,
      campName: camp.name,
      fees: camp.fees,
      location: camp.location,
      doctor: camp.doctor,
    };

    try {
  const res = await axios.post("http://localhost:5000/join-camp", joinData);

    if (res.data.insertedId) {
    Swal.fire("Success!", "You have joined the camp!", "success");
   setShowModal(false);
   refetch(); // count update
}
    } catch {
      Swal.fire("Error", "Failed to join the camp.", "error");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      {/* Camp Details Card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden md:flex md:space-x-6">
        <div className="md:w-1/2">
          <img
            src={camp.image}
            alt={camp.name}
            className="w-full h-80 object-cover"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-blue-700">
              {camp.name}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Camp Fees:</strong> ${camp.fees}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Date & Time:</strong> {camp.dateTime}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {camp.location}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Healthcare Professional:</strong> {camp.doctor}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Participants:</strong> {camp.participantCount}
            </p>
            <p className="text-gray-600 mt-4">{camp.description}</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary mt-6 w-full"
          >
            Join Camp
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-lg p-6 rounded-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-red-500"
              aria-label="Close modal"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Join Camp Registration
            </h2>

            <form onSubmit={handleJoinSubmit} className="space-y-3">
              {/* Read-only Inputs */}
              <input
                value={camp.name}
                readOnly
                className="input input-bordered w-full"
                placeholder="Camp Name"
              />
              <input
                value={`$${camp.fees}`}
                readOnly
                className="input input-bordered w-full"
                placeholder="Camp Fees"
              />
              <input
                value={camp.location}
                readOnly
                className="input input-bordered w-full"
                placeholder="Location"
              />
              <input
                value={camp.doctor}
                readOnly
                className="input input-bordered w-full"
                placeholder="Healthcare Professional"
              />
              <input
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full"
                placeholder="Participant Name"
              />
              <input
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full"
                placeholder="Participant Email"
              />

              {/* Editable Inputs */}
              <input
                type="number"
                name="age"
                placeholder="Your Age"
                required
                className="input input-bordered w-full"
                min={1}
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
