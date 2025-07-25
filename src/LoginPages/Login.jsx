import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../AuthProvider/UseAuth';
import SignInGoogle from './SignInGoogle';
import { Helmet } from 'react-helmet-async';
import groovyWalkAnimation from '../../src/assets/image/TemanASN Home Mobile.json';
import Lottie from 'lottie-react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import '../app.css'; // custom input styles

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = data => {
    signIn(data.email, data.password)
      .then(async result => {
        const user = result.user;
        const idToken = await user.getIdToken();
        localStorage.setItem("accessToken", idToken);
        localStorage.setItem("userEmail", user.email);

        await Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome to MedCampMS.',
          timer: 2000,
          showConfirmButton: false,
        });

        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="hero bg-base-100 min-h-screen px-4 py-6 sm:py-10">
      <Helmet>
        <title>Login Page | MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
      </Helmet>

      <div className="hero-content flex flex-col-reverse lg:flex-row items-center gap-6 w-full max-w-6xl mx-auto">

        {/* login Form Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div
            className="card bg-base-100 w-full max-w-sm 
            shadow border border-gray-200 
            hover:shadow-xl hover:border-blue-500 
            hover:scale-[1.02] transition-all duration-300"
          >
            <div className='mt-4'>
              <h1 className="text-2xl text-center font-bold">Welcome Back</h1>
              <p className='text-center'>Login with MedCampMS</p>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="custom-input"
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-500">Email is required</p>}

                <label className="label mt-4">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register('password', { required: true, minLength: 6 })}
                    placeholder="Password"
                    className="custom-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3 right-3 text-gray-600"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.password?.type === "minLength" && (
                  <p className='text-red-600' role="alert">Password must be at least 6 characters</p>
                )}

                <div className="mt-2">
                  <a className="link link-hover text-blue-600 text-sm">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 
                  text-white font-semibold py-3 px-4 
                  rounded-lg transition duration-300 shadow-md"
                >
                  Login
                </button>
              </form>

              <p className='text-center mt-3 text-sm'>
                Don’t have an account? <Link to='/register' className='underline text-blue-600'>Register</Link>
              </p>

              <h1 className='text-center mt-4'>Or</h1>
              <SignInGoogle />
            </div>
          </div>
        </div>

        {/*  Lottie Animation Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Lottie
            animationData={groovyWalkAnimation}
            loop={true}
            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
