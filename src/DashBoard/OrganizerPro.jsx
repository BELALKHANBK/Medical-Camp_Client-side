import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";

const OrganizerPro = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // ফেচ করো organizer profile (user email অনুযায়ী)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/organizer-profile?email=${user.email}`
        );
        setProfile(res.data);
        reset(res.data); // পুরানো ডেটা form এ বসাও
      } catch (error) {
        console.warn("No existing profile. Form is ready for new entry.");
        setProfile(null); // প্রোফাইল না থাকলে null রাখো
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchProfile();
    }
  }, [user?.email, reset]);

const onSubmit = async (data) => {
  data.email = user.email;

  try {
    if (profile?._id) {
      // 🔥 _id বাদ দিয়ে নতুন object বানাও
      const { _id, ...updateData } = data;

      const res = await axios.put(
        `http://localhost:5000/organizer-profile/${profile._id}`,
        updateData // ✅ শুধু update হওয়া ডেটা পাঠাও
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Profile updated successfully!", "success");
      } else {
        Swal.fire("Info", "No changes were made.", "info");
      }
    } else {
      // Create new profile
      const res = await axios.post(`http://localhost:5000/organizers`, data);
      if (res.data.insertedId) {
        Swal.fire("Created!", "Profile created successfully!", "success");
        setProfile(res.data); // নতুন প্রোফাইল সেট করো
      }
    }
  } catch (error) {
    Swal.fire("Error", "Something went wrong.", "error");
  }
};


  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white text-black mt-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Organizer Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-120 mt-8">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input input-bordered text-white w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email (readonly)</label>
          <input
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Contact Number</label>
          <input
            {...register("contactNumber", { required: true })}
            type="text"
            className="input input-bordered text-white w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Profile Image URL</label>
          <input
            {...register("image")}
            type="text"
            placeholder="Image URL"
            className="input input-bordered text-white w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          {profile ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default OrganizerPro;
