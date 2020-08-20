<<<<<<< HEAD
import axiosClient  from './axios';

const tokenAuth = token => {
    if(token) {
        axiosClient.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axiosClient.defaults.headers.common['x-auth-token'];
    }
}

=======
import axiosClient  from './axios';

const tokenAuth = token => {
    if(token) {
        axiosClient.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axiosClient.defaults.headers.common['x-auth-token'];
    }
}

>>>>>>> 96bda403bd0744c487407eb683fc5a3d26245378
export default tokenAuth;