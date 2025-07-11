import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../AuthProvider/UseAxios';
import useAuth from '../AuthProvider/UseAuth';
import Swal from 'sweetalert2';

const ParticipentProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    contact: '',
  });

  // Load user profile
  useEffect(() => {
    if (!user?.email) return;
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setProfile(res.data);
        setFormData({
          name: res.data.name || '',
          image: res.data.image || '',
          contact: res.data.contact || '',
        });
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to load profile', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user?.email, axiosSecure]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/users/update/${user.email}`, formData);
      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated!', 'Your profile has been updated.', 'success');
        setProfile(prev => ({ ...prev, ...formData }));
        setEditing(false);
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to update profile', 'error');
    }
  };

  if (loading) return <p className="text-center mt-6">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 border rounded text-black shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Participant Profile</h2>

      {!editing ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={profile?.image || 'https://i.ibb.co/2dCMnkF/profile-placeholder.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full border"
            />
          </div>
          <p><strong>Name:</strong> {profile?.name}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          <p><strong>Contact:</strong> {profile?.contact || 'N/A'}</p>
          <div className="text-center">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Info
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Image URL:</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Contact Number:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ParticipentProfile;
