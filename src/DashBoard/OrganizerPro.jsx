import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth"; // তোমার ফায়ারবেস auth hook

const OrganizerPro = () => {
  const { user, getToken,updateUserProfile } = useAuth();  // getToken: ফায়ারবেস থেকে idToken পেতে সাহায্য করবে
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`http://localhost:5000/users?email=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        reset(res.data);
      } catch (error) {
        console.warn("No existing profile found. Fill out to create.");
        setProfile(null);
        reset({});
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchProfile();
    }
  }, [user?.email, reset, getToken]);

const onSubmit = async (data) => {
  data.email = user.email;
  try {
    const token = await getToken();

    if (profile?._id) {
      // ব্যাকএন্ডে প্রোফাইল আপডেট
      const res = await axios.put(`http://localhost:5000/users/${profile._id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.modifiedCount > 0) {
        // Firebase ইউজার প্রোফাইল আপডেট
        await updateUserProfile({
          displayName: data.name,
          photoURL: data.image,
        });

        Swal.fire("Updated!", "Profile updated successfully!", "success");
        setProfile({ ...profile, ...data });
        reset(data);
      } else {
        Swal.fire("Info", "No changes were made.", "info");
      }
    } else {
      // নতুন প্রোফাইল তৈরি করার কোড
    }
  } catch (error) {
    Swal.fire("Error", "Something went wrong.", "error");
  }
};


  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white text-black mt-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Participant Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input input-bordered text-black w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email (readonly)</label>
          <input
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed text-gray-600"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Contact Number</label>
          <input
            {...register("contactNumber", { required: true })}
            type="text"
            className="input input-bordered text-black w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Profile Image URL</label>
          <input
            {...register("image")}
            type="text"
            placeholder="Image URL"
            className="input input-bordered text-black w-full"
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
