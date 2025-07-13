import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPersonCheck } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../firebase.config';
import useAuth from '../AuthProvider/UseAuth';
import SignInGoogle from './SignInGoogle';
import OtherAxios from '../AuthProvider/OtherAxios';
//import axios from 'axios';

const storage = getStorage(app);

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const axiosBelal = OtherAxios(); // Another axios instance for user role API
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  const location=useLocation()
  const from = location.state?.from || '/';

  const handleImageUpLoad = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
   /*  const formdata = new FormData();
    formdata.append('image', file);
    const imageURl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
    const res = await axios.post(imageURl, formdata);
    console.log('Image URL from imgbb:', res.data.data.url); */
  };

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // Upload image if provided
      let photoURL = '';
      if (imageFile) {
        const storageRef = ref(storage, `profileImages/${Date.now()}-${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update Firebase profile
      await updateUserProfile(user, {
        displayName: name,
        photoURL: photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
      });

      // Prepare user info for backend
      const userInfo = {
        email,
        name,
        role: 'participant',
        photo: photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };

      // POST user info to backend
      const userRes = await axiosBelal.post('/users', userInfo);
      console.log('User inserted:', userRes.data);

      // ✅ GET the user data from backend after insertion
      const getUserRes = await axiosBelal.get(`/users?email=${email}`);
      console.log('User fetched from server:', getUserRes.data);

      // Navigate after success
      navigate(from, { replace: true });
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left"></div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className='items-center text-center mt-4'>
            <h1 className='text-2xl font-extrabold'>Create an Account</h1>
            <p>Register with Profast</p>
          </div>
          <h1 className='ml-6 opacity-10 border w-8 h-8 items-center rounded-4xl'>
            <BsPersonCheck size={28} />
          </h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="label">Name</label>
              <input type="text" {...register('name', { required: true })} className="input" placeholder="Name" />

              <label className="label">Photo</label>
              <input type="file" accept="image/*" onChange={handleImageUpLoad} className="input" />

              <label className="label">Email</label>
              <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
              {errors.email && <p className='text-red-600'>Email is required</p>}

              <label className="label">Password</label>
              <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
              {errors.password?.type === "required" && <p className='text-red-600'>Password is required</p>}
              {errors.password?.type === "minLength" && <p className='text-red-600'>Password must be 6 characters or longer</p>}

              <button className="btn btn-primary w-full mt-4">Register</button>
            </form>

            <p className='text-center'>Already have an account? <Link to='/login' className='underline'>Login</Link></p>
            <h1 className='text-center'>Or</h1>
            <SignInGoogle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
