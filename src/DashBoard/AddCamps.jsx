
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../AuthProvider/UseAuth"; // ✅ Update path if needed
import useAxiosSecure from "../AuthProvider/UseAxios";

const AddCamp = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user,role } = useAuth();
const axios=useAxiosSecure()
  const onSubmit = async (data) => {
   /*  if (!user?.email) {
      Swal.fire("Error", "You must be logged in to add a camp", "error");
      return;
    } */


// ধরো user.role আছে তোমার auth context এ
if (role !== 'organizer') {
  Swal.fire('Error', 'Only organizers can add camps', 'error');
  return;
}

    try {
      const campData = {
        name: data.name, // participant name
        camp_name: data.camp_name, // ✅ new field
        image: data.image,
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
          placeholder="Participant Name"
          required
          className="input input-bordered w-full"
        />
        <input
          {...register("camp_name")} // ✅ fixed name
          placeholder="Camp Name"
          required
          className="input input-bordered w-full"
        />
        <input
          {...register("image")}
          placeholder="Image URL"
          required
          className="input input-bordered w-full"
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
