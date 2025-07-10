import React from 'react';
import useAuth from '../AuthProvider/UseAuth';
import useAxoiseSecure from '../AuthProvider/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import CampTable from './CampTable';
import { useNavigate } from 'react-router';

const ManageRegister = () => {
  const { user } = useAuth();
  const axiosSe = useAxoiseSecure();
  const navigate=useNavigate()

  // ⬇️ useQuery থেকে refetch নিয়ে নিন
const { data: campss = [],  refetch } = useQuery({
  queryKey: ['my-camps', user?.email],
  queryFn: async () => {
    if(!user?.email) return [];  // safety check (optional)
    const res = await axiosSe.get(`http://localhost:5000/camps`);
    return res.data;
  },
  enabled: !!user?.email,  // ইউজার লগইন না থাকলে চালাবে না
});

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This camp will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSe.delete(`/delete-camp/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0 || res.data.message === "Camp deleted successfully") {
              Swal.fire("Deleted!", "Camp has been deleted.", "success");
              refetch(); //এই লাইন টা delete এর পর fresh data আনবে
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete camp.", "error");
          });
      }
    });
  };

  const handlePay = (id) => {
  /*   Swal.fire("Payment Page", `Redirecting to pay for camp: ${camp.name}`, "info"); */
 navigate(`/dashboard/payment/${id}`)
};

  const handleView = (camp) => {
    Swal.fire("View Camp", `${camp.description}`, "info");
  };



  const handleDetails = (id) => {
    Swal.fire("Details", `Redirecting to /camp-details/${id}`, "info");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Manage Camps</h2>
      <CampTable
        camps={campss}
        onDelete={handleDelete}
        onPay={handlePay}
        onView={handleView}
        onDetails={handleDetails}
       
      />
    </div>
  );
};

export default ManageRegister;
