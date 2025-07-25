import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth";
import useAxiosSecure from "../AuthProvider/UseAxios";
import { useState } from "react";

const AddCamp = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user, role } = useAuth();
  const axios = useAxiosSecure();

  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Image Upload Function
  const uploadToImgBB = async () => {
    const apiKey = import.meta.env.VITE_image_key;
    const formData = new FormData();

    formData.append("image", imageFile);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // FormData এর ভিতর কি আছে দেখাবে
    }

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      console.log("Image upload fetch status:", res.status);
      if (!res.ok) {
        console.error("Image upload failed with status", res.status);
        return null;
      }

      const data = await res.json();
      console.log("Image upload response data:", data);

      if (data.success && data.data && data.data.display_url) {
        return data.data.display_url;
      } else {
        console.error("Image upload unsuccessful or no display_url", data);
        return null;
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      return null;
    }
  };

  // Form Submit Handler
  const onSubmit = async (data) => {
    if (role !== "organizer") {
      Swal.fire("Error", "Only organizers can add camps", "error");
      return;
    }

    if (!imageFile) {
      Swal.fire("Error", "Please upload an image", "error");
      return;
    }

    try {
      setIsLoading(true);

      const imageUrl = await uploadToImgBB();
      if (!imageUrl) {
        Swal.fire("Error", "Image upload failed", "error");
        setIsLoading(false);
        return;
      }

      const campData = {
        name: data.name,
        camp_name: data.camp_name,
        image: imageUrl,
        fees: Number(data.fees),
        dateTime: data.dateTime,
        location: data.location,
        doctor: data.doctor,
        participantCount: 0,
        description: data.description,
        created_user: user.email,
        payment_status: "unpaid",
      };

      const res = await axios.post("/camps", campData);

      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success", "Camp added successfully", "success");
        reset();
        setImageFile(null);
      } else {
        Swal.fire("Error", "Failed to add camp", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add camp", "error");
      console.error("Error adding camp:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // যদি user organizer না হয় তাহলে মেসেজ দেখাবে
  if (role !== "organizer") {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10 text-center text-red-600 text-xl font-semibold">
        You are not authorized to add a camp.
      </div>
    );
  }

  // role organizer হলে form দেখাবে
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow text-black md:text-white lg:text-white rounded mt-10">
      <h2 className="text-2xl text-black text-center font-semibold mb-6">
        Add a New Medical Camp
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="text-sm font-medium text-gray-700">Name:</label>
        <input
          {...register("name")}
          placeholder="Organizer Name"
          required
          className="input input-bordered placeholder-blue-700 text-black md:text-white lg:text-white w-full"
        />

        <label className="text-sm font-medium text-gray-700">Camp Name:</label>
        <input
          {...register("camp_name")}
          placeholder="Camp Name"
          required
          className="input input-bordered placeholder-blue-700 text-black md:text-white lg:text-white w-full"
        />

        <label className="text-sm font-medium text-gray-700">Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
          className="file-input file-input-bordered placeholder-blue-700 text-black md:text-white lg:text-white w-full"
        />

        <label className="text-sm font-medium text-gray-700">Fees:</label>
        <input
          {...register("fees")}
          type="number"
          placeholder="Camp Fees"
          required
          className="input input-bordered placeholder-blue-700 text-black md:text-white lg:text-white w-full"
        />

        <label className="text-sm font-medium text-gray-700">Date:</label>
        <input
          {...register("dateTime")}
          type="datetime-local"
          required
          className="input input-bordered placeholder-blue-700 text-black md:text-white lg:text-white w-full"
        />

        <label className="text-sm font-medium text-gray-700">Location:</label>
        <input
          {...register("location")}
          placeholder="Location"
          required
          className="input input-bordered placeholder-blue-700 text-black md:text-white lg:text-white w-full"
        />

        <label className="text-sm font-medium text-gray-700">Professional:</label>
        <input
          {...register("doctor")}
          placeholder="Healthcare Professional Name"
          required
          className="input input-bordered placeholder-blue-700 text-black md:text-white lg:text-white w-full"
        />

        <label className="text-sm font-medium text-gray-700">Description:</label>
        <textarea
          {...register("description")}
          placeholder="Description"
          required
          className="textarea textarea-bordered placeholder-blue-700 text-black md:text-white lg:text-white w-full"
          rows={4}
        />

        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
          {isLoading ? (
          <span className="loading loading-spinner text-error"></span>
          ) : (
            "Add Camp"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
