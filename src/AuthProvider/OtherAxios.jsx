import axios from 'axios';
import React from 'react';

const axiosBelal=axios.create({
    baseURL:`https://medical-camp-server-sage.vercel.app`
})
const OtherAxios = () => {
    
    return axiosBelal
};

export default OtherAxios;