import React, {  useContext } from 'react';
import { AuthContext } from './AuthContext';



const useAuth = () => {
    return useContext(AuthContext)
};

export default useAuth;