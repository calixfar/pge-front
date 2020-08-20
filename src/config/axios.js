<<<<<<< HEAD
import axios from 'axios';
console.log('url back', process.env.REACT_APP_BACKEND_URL_DEV)
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL_DEV
});

=======
import axios from 'axios';
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

>>>>>>> 96bda403bd0744c487407eb683fc5a3d26245378
export default axiosClient;