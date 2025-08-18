import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../AuthProvider/UseAuth';


const ForgotPasswordModel = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();

  const handleReset = async () => {
    if (!email) {
      Swal.fire('Error', 'Please enter your email', 'error');
      return;
    }

    try {
      await resetPassword(email);
      Swal.fire('Success', `Password reset link sent to ${email}`, 'success');
      setOpen(false);
      setEmail('');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <>
      <button
        type="button"
        className="link link-hover text-blue-600 text-sm"
        onClick={() => setOpen(true)}
      >
        Forgot password?
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 text-black rounded-lg shadow-lg w-80 relative">
            <h2 className="text-lg font-bold mb-4">Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordModel;
