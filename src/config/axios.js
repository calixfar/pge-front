import axios from 'axios';
console.log('url back', process.env.REACT_APP_BACKEND_URL_DEV)
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL_DEV
});

export default axiosClient;