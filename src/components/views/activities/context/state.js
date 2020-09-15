import React, { useReducer } from 'react';
import axiosClient from '../../../../config/axios';
import reducer from './reducer';
import context from './context';
import {
    GET_ACTIVITIES, CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY
} from './types';

export default ({ children }) => {

    const initialState = {
        activities: null,
        loading: false,
        msg: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const getActivities = async () => {
        try {
            console.log('get activities');
            const res = await axiosClient.get('/api/v1/activity');
            console.log(res);
            dispatch({
                type: GET_ACTIVITIES,
                payload: res.data.activities
            })
        } catch (error) {
            console.log(error.response);
        }
    }
    const createActivity = async (data) => {
        try {
            const res = await axiosClient.post('/api/v1/activity', data);
            dispatch({
                type: CREATE_ACTIVITY,
                payload: res.data.msg
            })
            getActivities();
        } catch (error) {
            console.log(error.response);
        }
    }
    const updateActivity = async (id, data) => {
        try {
            const res = await axiosClient.put(`/api/v1/activity/${id}`, data);
            dispatch({
                type: UPDATE_ACTIVITY,
                payload: res.data.msg
            })
            getActivities();
        } catch (error) {
            console.log(error.response);
        }
    }
    const deleteActivity = async (id) => {
        try {
            const res = await axiosClient.delete(`/api/v1/activity/${id}`);
            dispatch({
                type: DELETE_ACTIVITY,
                payload: res.data.msg
            })
            getActivities();
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <context.Provider
            value={{
                activities: state.activities,
                loading: state.loading,
                msg: state.msg,
                getActivities,
                createActivity,
                updateActivity,
                deleteActivity
            }}
        >
            {children}
        </context.Provider>
    )
}