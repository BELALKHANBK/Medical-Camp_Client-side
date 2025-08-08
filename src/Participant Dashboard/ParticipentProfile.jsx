import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";
import { Helmet } from "react-helmet-async";

const ParticipentProfile = () => {
  const { user, getToken, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`https://medical-camp-server-sage.vercel.app/users?email=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (error) {
        console.warn("No existing profile found. Fill out to create.");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchProfile();
  }, [user?.email, getToken]);

  useEffect(() => {
    if (profile) {
      reset(profile);
    } else {
      reset({
        name: user.displayName || "",
        email: user.email || "",
        contactNumber: "",
        image: user.photoURL || "",
      });
    }
  }, [profile, reset, user]);

  const onSubmit = async (data) => {
    data.email = user.email;

    try {
      const token = await getToken();

      if (profile?._id) {
        const res = await axios.put(`https://medical-camp-server-sage.vercel.app/users/${profile._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.modifiedCount > 0) {
          await updateUserProfile({
            displayName: data.name,
            photoURL: data.image,
          });

          Swal.fire("Updated!", "Profile updated successfully!", "success");
          setProfile({ ...profile, ...data });
          setModalOpen(false);
        } else {
          Swal.fire("Info", "No changes were made.", "info");
        }
      } else {
        const res = await axios.post(`https://medical-camp-server-sage.vercel.app/users`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.insertedId) {
          await updateUserProfile({
            displayName: data.name,
            photoURL: data.image,
          });

          Swal.fire("Created!", "Profile created successfully!", "success");
          setProfile(data);
          setModalOpen(false);
        } else {
          Swal.fire("Error", "Failed to create profile.", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong.", "error");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="max-w-[90%] md:max-w-xl lg:max-w-2xl mx-auto p-6 bg-white text-black mt-32 rounded shadow relative">
      <Helmet>
        <title>Organizer Profile | MedCampMS</title>
        <meta
          name="description"
          content="Welcome to MedCampMS - Your trusted medical camp management system."
        />
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-center">Participent Profile</h2>

      {profile ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <img
              src={user.photoURL}
              alt={profile.name || user.displayName}
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-gray-600">
                Contact: {profile.contactNumber || "N/A"}
              </p>
              <p>Role: {profile.role}</p>
            </div>
          </div>
          <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-700">
          <p>No profile data found.</p>
          <button onClick={() => setModalOpen(true)} className="btn btn-primary mt-4">
            Create Profile
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-2xl font-bold hover:text-red-600"
              aria-label="Close Modal"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-700">
              {profile ? "Edit Profile" : "Create Profile"}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
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
                  {...register("contactNumber", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9\-+ ]+$/,
                      message: "Invalid contact number",
                    },
                  })}
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.contactNumber ? "input-error" : ""
                  }`}
                />
                {errors.contactNumber && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold">Profile Image URL</label>
                <input
                  {...register("image")}
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered w-full"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                {profile ? "Update Profile" : "Create Profile"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipentProfile;
