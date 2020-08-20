import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/auth';


const AuthState = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        usuario: null,
        msg: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registerUser = async (datos) => {
        console.log(datos);
        try {
            const response = await axiosClient.post('/api/v1/user', datos);
            console.log(response);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data
            });
            userAuth();
        } catch (error) {
            console.log(error.response);
            const alerta = {msg: error.response.data.message};
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const userAuth = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const response = await axiosClient.get('/api/v1/auth');
            console.log(response);
            dispatch({
                type: OBTENER_USUARIO,
                payload: response.data.user
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const loginUser = async data => {
        try {
            console.log(data, axiosClient)
            const response = await axiosClient.post('/api/v1/auth', data);
            console.log(response);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: response.data
            });
            userAuth();
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = error.response.data.msg;
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                usuario: state.usuario,
                msg: state.msg,
                loading: state.loading,
                registerUser,
                loginUser,
                userAuth,
                cerrarSesion
            }}
        >{children}</AuthContext.Provider>
    )
};

export default AuthState;