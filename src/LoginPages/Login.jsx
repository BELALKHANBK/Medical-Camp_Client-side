import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../AuthProvider/UseAuth';
import SignInGoogle from './SignInGoogle';


const Login = () => {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const{signIn} =useAuth()

  const location=useLocation()
  const navigate=useNavigate()
  const from=location.state?.from || '/'
  
  const onSubmit=data=>{
  signIn(data.email, data.password)
  .then(result=>{
    console.log(result)
    navigate(from, { replace: true });
  })
  .catch(error=>{
    console.log(error)
  })
  }
    return (
        <div className="hero bg-base-200 min-h-screen">
 
  <div className="hero-content flex-col lg:flex-row-reverse">
   
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className='mt-4'>
         <h1 className="text-2xl text-center font-bold">Welcome Back</h1>
          <p className='text-center'>Login with Profast</p>

    </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" {...register('password',{required:true, minLength:6})} className="input" placeholder="Password" />

    {errors.password?.type === "minLength" && (
        <p className='text-red-600' role="alert">Password must be 6 chrecter is longer</p>
      )}

          <div><a className="link link-hover">Forgot password?</a></div>

          <button className="btn btn-primary mt-4 w-full ">Login</button>
        </form>
   <p className='text-center'>Don’t have any account? <Link to='/register' className='underline text-center'>Register</Link></p>
   <h1 className='text-center'>Or</h1>
     <SignInGoogle/>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;