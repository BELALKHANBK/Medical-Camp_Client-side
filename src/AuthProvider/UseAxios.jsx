import axios from 'axios';
import { useEffect } from 'react';
import { getIdToken, getAuth, onAuthStateChanged } from 'firebase/auth';

// Create a base axios instance
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend URL if deployed
});

const useAxiosSecure = () => {
  useEffect(() => {
    const auth = getAuth();

    // Set up Axios interceptor
    const interceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser;
        if (user) {
          try {
            const token = await getIdToken(user);
            config.headers.Authorization = `Bearer ${token}`;
            console.log('✅ Token attached to request:', token); // Debug log
          } catch (error) {
            console.error('❌ Failed to get token:', error);
          }
        } else {
          console.warn('⚠️ No user is currently logged in.');
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Clean up on unmount
    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
