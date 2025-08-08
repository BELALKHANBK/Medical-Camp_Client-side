import axios from 'axios';
import { useEffect } from 'react';
import { getIdToken, getAuth } from 'firebase/auth';

const axiosSecure = axios.create({
  baseURL: 'https://medical-camp-server-sage.vercel.app',
});

const useAxiosSecure = () => {
  useEffect(() => {
    const auth = getAuth();

    const interceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const user = auth.currentUser;
        if (user) {
          try {
            const token = await getIdToken(user);
            config.headers.Authorization = `Bearer ${token}`;
            // console.log(' Token attached to request:', token);
          } catch (error) {
            console.error(' Failed to get token:', error);
          }
        } else {
          // User not logged in, no Authorization header added
          // console.warn(' No user logged in');
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
