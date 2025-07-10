import axios from 'axios';
import useAuth from './UseAuth';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`
});

const useAxoiseSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // যদি user বা accessToken না থাকে, তাহলে token যোগ করো না
        if (user && user.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor when component unmounts or user changes
    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxoiseSecure;
