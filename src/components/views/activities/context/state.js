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
            dispatch({
                type: GET_TYPES_WORK,
                payload: res.data.typesWork
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const createTypeWork = async ( data ) => {
        try {
            const res = await axiosClient.post('/api/v1/type-work', data);
            console.log(res);
            getTypesWorks();

        } catch (error) {
            console.log(error.response);
        }
    }

    const getActivities = async (typeWorkId) => {
        try {
            const res = await axiosClient.get(`/api/v1/activity/${typeWorkId}`);
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
            console.log(`/api/v1/activity/${id}`);
            const res = await axiosClient.put(`/api/v1/activity/${id}`, data);
            return { status: true, msg: res.data.msg }
        } catch (error) {
            console.log(error.response);
        }
    }
    const deleteActivity = async (id) => {
        try {
            const res = await axiosClient.delete(`/api/v1/activity/${id}`);
            return { status: true, msg: res.data.msg }
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
                createTypeWork,
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