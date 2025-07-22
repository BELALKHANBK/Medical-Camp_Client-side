import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxoiseSecure from "../AuthProvider/UseAxios";
import SearchBar from "../pagination/SearchBar";
import Pagination from "../pagination/Pagination";
import { Helmet } from "react-helmet-async";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCamp, setEditingCamp] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const axios = useAxoiseSecure();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const res = await axios.get("https://medical-camp-server-sage.vercel.app/camps");
      setCamps(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to load camps", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this camp?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://medical-camp-server-sage.vercel.app/delete-camp/${id}`);
        Swal.fire("Deleted!", "Camp has been deleted.", "success");
        fetchCamps();
      } catch (error) {
        Swal.fire("Error", "Failed to delete camp", "error");
      }
    }
  };

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

  const cancelEditing = () => {
    setEditingCamp(null);
    reset();
  };

  const onUpdateSubmit = async (data) => {
    try {
      const id = editingCamp._id;
      const updatedCamp = {
        ...data,
        fees: Number(data.fees),
      };

      const res = await axios.put(`https://medical-camp-server-sage.vercel.app/update-camp/${id}`, updatedCamp);

      if (res.data.modifiedCount > 0 || res.data.acknowledged) {
        Swal.fire("Success", "Camp updated successfully", "success");
        setEditingCamp(null);
        fetchCamps();
      } else {
        Swal.fire("Info", "No changes were made", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update camp", "error");
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg font-semibold">Loading camps...</p>;

  const filteredCamps = camps.filter((camp) =>
    `${camp.name} ${camp.dateTime} ${camp.doctor}`.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCamps.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
       <Helmet>
        <title>ManageCamps| MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
     </Helmet>
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">Manage Medical Camps</h2>

      <div className="mb-6">
        <SearchBar
          placeholder="🔍 Search by Camp name, Date or Doctor..."
          searchText={searchText}
          setSearchText={(text) => {
            setSearchText(text);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* 🌐 Desktop Table */}
      <div className="hidden md:block overflow-x-auto text-black bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Doctor</th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No camps found.
                </td>
              </tr>
            ) : (
              currentItems.map((camp) => (
                <tr key={camp._id} className="hover:bg-gray-600 transition">
                  <td className="px-6 py-4">{camp.name}</td>
                  <td className="px-6 py-4">{new Date(camp.dateTime).toLocaleString()}</td>
                  <td className="px-6 py-4">{camp.location}</td>
                  <td className="px-6 py-4">{camp.doctor}</td>
                  <td className="px-6 py-4 flex justify-center gap-3 flex-wrap">
                    <button
                      onClick={() => startEditing(camp)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      ✏️ Update
                    </button>
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Card View */}
      <div className="md:hidden">
        {currentItems.map((camp) => (
          <div key={camp._id} className="bg-white rounded-lg shadow p-4 mb-4 text-sm text-gray-800">
            <h4 className="text-lg font-bold text-blue-600">{camp.name}</h4>
            <p><strong>Date:</strong> {new Date(camp.dateTime).toLocaleString()}</p>
            <p><strong>Location:</strong> {camp.location}</p>
            <p><strong>Doctor:</strong> {camp.doctor}</p>
            <div className="flex justify-start gap-2 mt-3 flex-wrap">
              <button
                onClick={() => startEditing(camp)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                ✏️ Update
              </button>
              <button
                onClick={() => handleDelete(camp._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔢 Pagination */}
      <div className="mt-8">
        <Pagination
          totalItems={filteredCamps.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* ✏️ Edit Modal */}
      {editingCamp && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-40 z-50  flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl  relative">
           {/*  <button
              type="button"
              onClick={cancelEditing}
              className="absolute top-6 right-4 text-3xl text-red-600 hover:text-red-800 font-bold z-50"
              aria-label="Close"
            >
              &times;
            </button> */}

            <h3 className="text-2xl font-semibold mb-6 text-blue-600">
              Update Camp: {editingCamp.name}
            </h3>

            <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
              <input {...register("name")} placeholder="Camp Name" className="input input-bordered w-full" />
              <input {...register("image")} placeholder="Image URL" className="input input-bordered w-full" />
              <input
                {...register("fees")}
                type="number"
                placeholder="Camp Fees"
                className="input input-bordered w-full"
              />
              <input
                {...register("dateTime")}
                type="datetime-local"
                className="input input-bordered w-full"
              />
              <input {...register("location")} placeholder="Location" className="input input-bordered w-full" />
              <input
                {...register("doctor")}
                placeholder="Healthcare Professional"
                className="input input-bordered w-full"
              />
              <textarea
                {...register("description")}
                placeholder="Camp Description"
                rows="4"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <div className="flex justify-end gap-4 mt-4">
                <button type="submit" className="btn btn-success">Save</button>
                <button type="button" onClick={cancelEditing} className="btn ">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
