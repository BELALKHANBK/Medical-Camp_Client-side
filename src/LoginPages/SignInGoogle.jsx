
import { useNavigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../../../../Lost and Found Website/Lost_and_Found_Website/src/AuthContext';



const SignInGoogle = () => {
  const { signInWithGoogle } =useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const from = new URLSearchParams(location.search).get('redirect') || '/';

  const signInGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire('Login Successful!', 'Welcome back!', 'success');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire('Login Failed', error.message, 'error');
      });
  };

  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={signInGoogle}
        className="btn bg-white  w-full text-black border-[#e5e5e5]"
      >
        
        <FcGoogle />Register with Google
      </button>
    </div>
  );
};

export default SignInGoogle;
