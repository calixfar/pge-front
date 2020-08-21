import axios from 'axios';
console.log(process.env.REACT_APP_BACKEND_URL_PROD);
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL_PROD
});

export default axiosClient;