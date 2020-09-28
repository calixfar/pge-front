import React, { useReducer } from 'react';
import Context from './context';
import reducer from './reducer';
import axiosClient from '../../../../config/axios';
import {
    GET_COUNT_WORKS,
    UPDATE_FILTER_ZONE
} from './types';

export default ({ children }) => {

    const initialState = {
        filterZone: 'ALL',
        countWorks: null,
        msg: null,
        loading: true
    }

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const getCountWorks = async () => {
        try {
            const res = await axiosClient.get(`/api/v1/work-count/${state.filterZone}`);
            console.log('object', res);
            dispatch({
                type: GET_COUNT_WORKS,
                payload: res.data.countWorks
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
                msg: state.msg,
                loading: state.loading,
                getCountWorks,
                changeFilterZone
            }}
        >
            { children }
        </Context.Provider>
    )
}



