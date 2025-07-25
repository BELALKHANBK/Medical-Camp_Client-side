import axios from 'axios';
import React from 'react';

const axiosBelal=axios.create({
    baseURL:`http://localhost:5000`
})
const OtherAxios = () => {
    
    return axiosBelal
};

export default OtherAxios;