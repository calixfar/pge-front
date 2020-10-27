import React, { useReducer, useContext } from 'react';
import {
    GET_WORKS,
    UPDATE_WORK,
    CHANGE_STATUS_WORK,
    INITIALIZED_WORK,
    RESET_SELECTED_WORK,
    GET_WORK_ACTIVITIES
} from './types';
import Context from './context';
import reducer from './reducer';
import AuthContext from '../../../../context/auth/authContext';
import axiosClient from '../../../../config/axios';

const EmployeeState = ({ children }) => {

    const authContext = useContext(AuthContext);

    const { usuario } = authContext;

    const initialState = {
        works: null,
        date: new Date(),
        loading: true,
        initialized_work: null,
        work_activities: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const getWorks = async () => {
        try {
            const response = await axiosClient.get('/api/v1/work');
            console.log(response);
            dispatch({
                type: GET_WORKS,
                payload: response.data.works
            });
        } catch (error) {
            console.log(error);
        }
    }

    const selectWork = (work) => {
        dispatch({
            type: INITIALIZED_WORK,
            payload: work
        })
    };
    const resetSelectedWork = () => {
        dispatch({
            type: RESET_SELECTED_WORK
        })
    };

    const getActivitiesByWork = async (workId) => {
        try {
            console.log('entro work search', workId);
            const res = await axiosClient.get(`/api/v1/work-activity/${workId}`);
            dispatch({
                type: GET_WORK_ACTIVITIES,
                payload: res.data.activities
            })

        } catch (error) {
            console.log(error.response);
        }
    }

    const changeStatusWork = async (workId, data) => {
        try {
            const res = await axiosClient.put(`/api/v1/work-status/${workId}`, data);
            getWorks();
            return {
                status: true,
                msg: res.data.msg
            };
        } catch (error) {
            console.log(error.response);
            return {
                status: false,
                msg: error.response.data.msg
            };
        }
    }

    return (
        <Context.Provider
            value={{
                works: state.works,
                date: state.date,
                loading: state.loading,
                initialized_work: state.initialized_work,
                work_activities: state.work_activities,
                getWorks,
                selectWork,
                resetSelectedWork,
                getActivitiesByWork,
                changeStatusWork
            }}
        >
            {children }
        </Context.Provider>
    )
}
export default EmployeeState;