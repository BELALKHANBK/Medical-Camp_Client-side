import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router';  // তোমার যদি react-router-dom হয়, তবে 'react-router-dom' করো
import useAuth from '../AuthProvider/UseAuth';
import OtherAxios from '../AuthProvider/OtherAxios';

const SignInGoogle = () => {
  const { signInWithGoogle, user } = useAuth();
  const location = useLocation();
  const AxiosBelal = OtherAxios();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleGoogle = () => {
    signInWithGoogle()
      .then(async (result) => {
        console.log("User created:", result.user);

        navigate(from, { replace: true });

        /////user role/////////
        const userInfo = {
          email: user.email,
          role: 'user',
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        const userRes = await AxiosBelal.post('/users', userInfo);
        console.log('user update info', userRes.data);
        ////////////
        navigate(from);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleGoogle}
        className="btn flex items-center gap-2 px-4 py-2 text-sm font-semibold
                   bg-white border border-gray-300 rounded-md text-black shadow hover:bg-gray-100
                   transition duration-300"
      >
        <FcGoogle className="text-xl" />
        Register With Google
      </button>
    </div>
  );
};

export default SignInGoogle;
