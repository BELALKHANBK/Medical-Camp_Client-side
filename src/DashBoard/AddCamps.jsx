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

  // ⬇️ Image Upload Function
  const uploadToImgBB = async () => {
    const apiKey = import.meta.env.VITE_image_key;
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data?.data?.display_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  // ⬇️ Form Submit Handler
  const onSubmit = async (data) => {
    if (role !== 'organizer') {
      Swal.fire('Error', 'Only organizers can add camps', 'error');
      return;
    }

    const imageUrl = await uploadToImgBB();
    if (!imageUrl) {
      Swal.fire("Error", "Image upload failed", "error");
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

    try {
      const res = await axios.post("/camps", campData);

      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success", "Camp added successfully", "success");
        reset();
        setImageFile(null);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add camp", "error");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl text-black text-center font-semibold mb-6">Add a New Medical Camp</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Organizer Name"
          required
          className="input input-bordered w-full"
        />
        <input
          {...register("camp_name")}
          placeholder="Camp Name"
          required
          className="input input-bordered w-full"
        />

        {/* File Upload Field */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
          className="file-input file-input-bordered w-full"
        />

        <input
          {...register("fees")}
          type="number"
          placeholder="Camp Fees"
          required
          className="input input-bordered w-full"
        />
        <input
          {...register("dateTime")}
          type="datetime-local"
          required
          className="input input-bordered w-full"
        />
        <input
          {...register("location")}
          placeholder="Location"
          required
          className="input input-bordered w-full"
        />
        <input
          {...register("doctor")}
          placeholder="Healthcare Professional Name"
          required
          className="input input-bordered w-full"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          required
          className="textarea textarea-bordered w-full"
          rows={4}
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Camp
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
