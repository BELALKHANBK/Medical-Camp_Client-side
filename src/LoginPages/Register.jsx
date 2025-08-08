import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonCheck } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { getIdToken } from 'firebase/auth';
import useAuth from '../AuthProvider/UseAuth';
import SignInGoogle from './SignInGoogle';
import OtherAxios from '../AuthProvider/OtherAxios';
import { Helmet } from 'react-helmet-async';
import groovyWalkAnimation from '../../src/assets/image/TemanASN Home Mobile.json';
import Lottie from 'lottie-react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import '../app.css'; // ✅ Custom CSS import
import Swal from 'sweetalert2';
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const axiosBelal = OtherAxios();
  const [imageFile, setImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadToImgBB = async () => {
    if (!imageFile) {
      alert("Please select an image.");
      return null;
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const apiKey = import.meta.env.VITE_image_key;
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
      return res.data.data.display_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed, please try again.");
      return null;
    }
  };


  // onSubmit function এর মধ্যে error ও success handling

  const onSubmit = async (data) => {
    try {
      const imageUrl = await uploadToImgBB();
      if (!imageUrl) return;

      const { name, email, password } = data;

      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      await updateUserProfile({
        displayName: name,
        photoURL: imageUrl,
      });

      const token = await getIdToken(user);
      localStorage.setItem('access-token', token);

      const userInfo = {
        email,
        name,
        role: 'participant',
        photo: imageUrl,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };

      const userRes = await axiosBelal.post('/users', userInfo);
      console.log('User saved:', userRes.data);

      // Success alert
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Welcome to MedCampMS.',
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });

    } catch (error) {
      console.error("Error during registration:", error.message);

      // Error alert
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="">
      <Helmet>
        <title>Register Page | MedCampMS</title>
        <meta name="description" content="Welcome to MedCampMS - Your trusted medical camp management system." />
      </Helmet>

      <div className="hero bg-base-100 min-h-screen">
        <div className=" hero-content flex flex-col-reverse md:flex-row items-center justify-between w-full px-4 lg:px-16 py-10 gap-10">

          {/* Form Section */}
          <div
            className="card bg-base-100 w-full max-w-md shrink-0 
          shadow border border-gray-200 
          hover:shadow-2xl hover:border-blue-500 
          hover:scale-[1.02] transition-all duration-300"
          >
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl mx-auto">
              <div className="text-center mt-4">
                <h1 className="text-2xl font-extrabold">Create an Account</h1>
                <p>Register with MedCampMS</p>
              </div>

              <h1 className='ml-6 opacity-10 border w-8 h-8 items-center rounded-4xl'>
                <BsPersonCheck size={28} />
              </h1>

              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className="custom-input"
                    placeholder="Name"
                  />
                  {errors.name && <p className="text-red-600">Name is required</p>}

                  <label className="label">Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="custom-input"
                    required
                  />

                  <label className="label">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    className="custom-input"
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-red-600">Email is required</p>}

                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register('password', { required: true, minLength: 6 })}
                      className="custom-input pr-10"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-3 right-3 text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters or longer
                    </p>
                  )}

                  <button className="btn btn-primary w-full mt-4">Register</button>
                </form>

                <p className='text-center mt-4'>
                  Already have an account?{' '}
                  <Link to='/login' className='underline text-blue-600'>
                    Login
                  </Link>
                </p>

                <h1 className="text-center mt-2">Or</h1>
                <SignInGoogle />
              </div>
            </div>
          </div>

          {/* Lottie Animation Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Lottie
              animationData={groovyWalkAnimation}
              loop={true}
              className="w-[250px] sm:w-[300px] md:w-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
