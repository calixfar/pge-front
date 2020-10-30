import React, { useReducer } from 'react';
import Context from './context';
import reducer from './reducer';
import axiosClient from '../../../../config/axios';
import { getCountEmployees } from '../utils';
import {
    GET_COUNT_WORKS,
    UPDATE_FILTER_ZONE,
    GET_WORKS_USERS
} from './types';

const DashboardState = ({ children }) => {

    const initialState = {
        filterZone: 'ALL',
        countWorks: null,
        msg: null,
        worksUsers: null,
        loading: true
    }

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const getCountWorks = async () => {
        try {
            const res = await axiosClient.get(`/api/v1/work-count/${state.filterZone}`);
            console.log('object', res);
            dispatch({
                type: GET_COUNT_WORKS,
                payload: res.data
            })
        } catch (error) {
            return;
        }
    }
    const getWorksUsers = async () => {
        try {
            const res = await axiosClient.get(`/api/v1/user-count`);
            console.log('object', res);
            dispatch({
                type: GET_WORKS_USERS,
                payload: getCountEmployees(res.data.worksUsers)
            })
        } catch (error) {
            return;
        }
    }

    const changeFilterZone = (value) => {
        dispatch({
           type: UPDATE_FILTER_ZONE,
           payload: value 
        })
    }

    return (
        <Context.Provider
            value={{
                filterZone: state.filterZone,
                countWorks: state.countWorks,
                worksUsers: state.worksUsers,
                msg: state.msg,
                loading: state.loading,
                getCountWorks,
                getWorksUsers,
                changeFilterZone
            }}
        >
            { children }
        </Context.Provider>
    )
}
export default DashboardState;



