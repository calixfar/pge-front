import React, { useReducer } from 'react';
import axiosClient from '../../../../config/axios';
import reducer from './reducer';
import context from './context';
import {
    GET_TYPES_WORK, CREATE_TYPE_WORK, UPDATE_TYPE_WORK, DELETE_TYPE_WORK,
    GET_ACTIVITIES, CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY
} from './types';

export default ({ children }) => {

    const initialState = {
        typesWork: null,
        activities: null,
        loading: false,
        msg: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const getTypesWorks = async () => {
        try {
            const res = await axiosClient.get('/api/v1/type-work');
            console.log(res);
            dispatch({
                type: GET_TYPES_WORK,
                payload: res.data.typesWork
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const getActivities = async (typeWorkId) => {
        try {
            console.log('get activities');
            const res = await axiosClient.get(`/api/v1/activity/${typeWorkId}`);
            console.log(res);
            return res.data.activities
            // dispatch({
            //     type: GET_ACTIVITIES,
            //     payload: res.data.activities
            // })

        } catch (error) {
            console.log(error.response);
        }
    }
    const createActivity = async (data) => {
        try {
            const res = await axiosClient.post('/api/v1/activity', data);
            return { status: true, msg: res.data.msg }
        } catch (error) {
            console.log(error.response);
            return { status: false, msg: error.response.data.message }
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
                typesWork: state.typesWork,
                activities: state.activities,
                loading: state.loading,
                msg: state.msg,
                getTypesWorks,
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