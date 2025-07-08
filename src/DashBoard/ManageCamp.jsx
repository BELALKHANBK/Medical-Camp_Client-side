import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCamp, setEditingCamp] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // Load all camps on component mount
  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const res = await axios.get("http://localhost:5000/camps");
      setCamps(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to load camps", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete camp handler
  const handleDelete = async (id) => {
    console.log(id)
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this camp?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
       const res= await axios.delete(`http://localhost:5000/delete-camp/${id}`);
        console.log('delete',res.data)
        Swal.fire("Deleted!", "Camp has been deleted.", "success");
        fetchCamps(); // Refresh camp list
      } catch (error) {
        Swal.fire("Error", "Failed to delete camp", "error");
        console.error(error);
      }
    }
  };

  // Start editing: fill form with camp data
  const startEditing = (camp) => {
    setEditingCamp(camp);
    reset({
      name: camp.name,
      image: camp.image,
      fees: camp.fees,
      dateTime: camp.dateTime,
      location: camp.location,
      doctor: camp.doctor,
      description: camp.description,
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingCamp(null);
    reset();
  };

  // Submit updated camp data
  const onUpdateSubmit = async (data) => {
    try {
      const id = editingCamp._id;
      const updatedCamp = {
        ...data,
        fees: Number(data.fees),
      };

      const res = await axios.put(`http://localhost:5000/update-camp/${id}`, updatedCamp);

      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        Swal.fire("Success", "Camp updated successfully", "success");
        setEditingCamp(null);
        fetchCamps();
      } else {
        Swal.fire("Info", "No changes were made", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update camp", "error");
      console.error(error);
    }
  };

  if (loading) return <p>Loading camps...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 rounded shadow mt-10">
      <h2 className="text-3xl font-bold mb-6">Manage Medical Camps</h2>

      {/* Camps Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Date & Time</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Healthcare Professional</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {camps.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No camps found.
              </td>
            </tr>
          ) : (
            camps.map((camp) => (
              <tr key={camp._id}>
                <td className="border border-gray-300 px-4 py-2">{camp.name}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(camp.dateTime).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{camp.location}</td>
                <td className="border border-gray-300 px-4 py-2">{camp.doctor}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button onClick={() => startEditing(camp)} className="btn btn-sm btn-warning">
                    Update
                  </button>
                  <button onClick={() => handleDelete(camp._id)} className="btn btn-sm btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Update Camp Modal */}
      {editingCamp && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full relative">
            <h3 className="text-xl font-semibold mb-4">Update Camp: {editingCamp.name}</h3>
            <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
              <input
                {...register("name", { required: true })}
                placeholder="Camp Name"
                className="input input-bordered w-full"
              />
              <input
                {...register("image", { required: true })}
                placeholder="Image URL"
                className="input input-bordered w-full"
              />
              <input
                {...register("fees", { required: true, valueAsNumber: true })}
                type="number"
                placeholder="Camp Fees"
                className="input input-bordered w-full"
              />
              <input
                {...register("dateTime", { required: true })}
                type="datetime-local"
                className="input input-bordered w-full"
              />
              <input
                {...register("location", { required: true })}
                placeholder="Location"
                className="input input-bordered w-full"
              />
              <input
                {...register("doctor", { required: true })}
                placeholder="Healthcare Professional Name"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("description", { required: true })}
                placeholder="Description"
                rows={4}
                className="textarea textarea-bordered w-full"
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <button type="button" onClick={cancelEditing} className="btn btn-outline">
                  Cancel
                </button>
              </div>
            </form>
            {/* Close modal button */}
            <button
              onClick={cancelEditing}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
