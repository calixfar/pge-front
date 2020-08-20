<<<<<<< HEAD
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/auth';

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO :
        case LOGIN_EXITOSO :
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                auth: true,
                msg: null,
                loading: false,
                token: action.payload.token
            }
        case OBTENER_USUARIO :
            return {
                ...state,
                loading: false,
                usuario: action.payload,
                auth: true
            }            
        case LOGIN_ERROR :
        case REGISTRO_ERROR :  
        case CERRAR_SESION:          
                localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                auth: false,
                loading: false,
                msg: action.payload
            }
        default:
            return state;
    }
=======
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/auth';

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO :
        case LOGIN_EXITOSO :
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                auth: true,
                msg: null,
                loading: false,
                token: action.payload.token
            }
        case OBTENER_USUARIO :
            return {
                ...state,
                loading: false,
                usuario: action.payload,
                auth: true
            }            
        case LOGIN_ERROR :
        case REGISTRO_ERROR :  
        case CERRAR_SESION:          
                localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                auth: false,
                loading: false,
                msg: action.payload
            }
        default:
            return state;
    }
>>>>>>> 96bda403bd0744c487407eb683fc5a3d26245378
}