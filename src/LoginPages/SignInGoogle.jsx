import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../AuthProvider/UseAuth';
import OtherAxios from '../AuthProvider/OtherAxios';


const SignInGoogle = () => {
    const {signInWithGoogle,user}=useAuth()
    const location=useLocation()
    const AxiosBelal=OtherAxios()
    const navigate=useNavigate()
    const from=location.state?.from || '/'


    const handleGoogle= ()=>{
        signInWithGoogle()
          .then(async(result) => {
        console.log("User created:", result.user);

 navigate(from, { replace: true })
      /////user role/////////
      const userInfo={
        email:user.email,
        role:'user',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      }

     const userRes=await AxiosBelal.post('/users',userInfo)
     console.log('user updat info',userRes.data)
      
      ////////////



       navigate(from)
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
    }
    return (
        <div>
           
           <button onClick={handleGoogle} className='btn ml-10 md:ml-44 lg:ml-20'><FcGoogle />Register With Google</button>
        </div>
    );
};

export default SignInGoogle;