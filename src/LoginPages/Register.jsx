import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonCheck } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { getIdToken } from 'firebase/auth';
import useAuth from '../AuthProvider/UseAuth';
import SignInGoogle from './SignInGoogle';
import OtherAxios from '../AuthProvider/OtherAxios';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const axiosBelal = OtherAxios();
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  // ছবি সিলেক্ট করার জন্য হ্যান্ডলার
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // ImgBB তে ছবি আপলোডের ফাংশন
  const uploadToImgBB = async () => {
    if (!imageFile) {
      alert("Please select an image.");  // ছবি না দিলে ইউজারকে বলবে
      return null;  // থেমে যাবে
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const apiKey = import.meta.env.VITE_image_key;  // .env থেকে নিয়ে আসবে

      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
      return res.data.data.display_url; // ছবি URL রিটার্ন করবে
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed, please try again.");
      return null;
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const onSubmit = async (data) => {
    try {
      // প্রথমে ছবি আপলোড করো
      const imageUrl = await uploadToImgBB();

      if (!imageUrl) {
        // ছবি না থাকলে বা আপলোড ব্যর্থ হলে থেমে যাবে এখানে
        return;
      }

      const { name, email, password } = data;

      // ইউজার তৈরি করো Firebase Auth দিয়ে
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // Firebase প্রোফাইল আপডেট করো নাম ও ছবি দিয়ে
    await updateUserProfile({
  displayName: name,
  photoURL: imageUrl,
});

      // JWT Token নিয়ে লোকাল স্টোরেজে রাখো
      const token = await getIdToken(user);
      localStorage.setItem('access-token', token);

      // তোমার ব্যাকএন্ডে ইউজার ডাটা পাঠাও
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

      // সফল হলে অন্য পেজে নেভিগেট করো
      navigate(from, { replace: true });

    } catch (error) {
      console.error("Error during registration:", error.message);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className=''>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className='items-center text-center mt-4'>
              <h1 className='text-2xl font-extrabold'>Create an Account</h1>
              <p>Register with Medical camp</p>
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
                  className="input"
                  placeholder="Name"
                />
                {errors.name && <p className="text-red-600">Name is required</p>}

                <label className="label">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input"
                  required
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="input"
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-600">Email is required</p>}

                <label className="label">Password</label>
                <input
                  type="password"
                  {...register('password', { required: true, minLength: 6 })}
                  className="input"
                  placeholder="Password"
                />
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

              <p className='text-center'>
                Already have an account?{' '}
                <Link to='/login' className='underline'>
                  Login
                </Link>
              </p>
              <h1 className='text-center'>Or</h1>
              <SignInGoogle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
