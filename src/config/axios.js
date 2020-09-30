import axios from 'axios';

let property = `REACT_APP_BACKEND_URL_${process.env.REACT_APP_ENV === 'develop' ? 'DEV' : 'PROD' }`
const axiosClient = axios.create({
    baseURL: process.env[property]
});
// process.env.NODE_ENV !== "production"
export default axiosClient;