import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../AuthProvider/UseAuth';


const SignInGoogle = () => {
    const {signInWithGoogle}=useAuth()
    const location=useLocation()
    const navigate=useNavigate()
    const from=location.state?.from || '/'
    const handleGoogle=()=>{
        signInWithGoogle()
          .then((result) => {
        console.log("User created:", result.user);
navigate(from)
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
    }
    return (
        <div>
           
           <button onClick={handleGoogle} className='btn ml-20'><FcGoogle />Register With Google</button>
        </div>
    );
};

export default SignInGoogle;