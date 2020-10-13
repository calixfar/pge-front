import React, { useReducer } from 'react';
import axiosClient from '../../config/axios';
import Reducer from './Reducer';
import NotificationContext from './Context';
import {
    GET_NOTIFICATIONS,
    ERROR_GET_NOTIFICATIONS
} from '../../types/notifications';

const NotificationState = ({ children }) => {
    const initialState = {
        notifications: null,
        loading: true,
        msg: null
    }

    const [state, dispatch] = useReducer(Reducer, initialState);

    const getNotifications = async () => {
        try {

            const { data: { notifications }} = await axiosClient.get('/api/v1/notification');

            dispatch({
                type: GET_NOTIFICATIONS,
                payload: notifications
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_GET_NOTIFICATIONS,
                payload: error.response.data.message
            });
        }
    }

    return (
        <NotificationContext.Provider 
            value={{
                notifications: state.notifications,
                loading: state.loading,
                msg: state.msg,
                getNotifications
            }}
        >
            { children }
        </NotificationContext.Provider>
    )
}

export default NotificationState;