import axios from 'axios';
const port = process.env.PORT || 4000;
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL + `:${port}`
});

export default axiosClient;