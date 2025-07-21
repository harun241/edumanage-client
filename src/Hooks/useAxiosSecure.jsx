import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: `https://edumanage-server-rho.vercel.app`
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;