import React, { useReducer, useContext } from 'react';
import {
    GET_WORKS,
    UPDATE_WORK,
    CHANGE_STATUS_WORK,
    SELECTED_WORK,
    RESET_SELECTED_WORK
} from './types';
import Context from './context';
import reducer from './reducer';
import AuthContext from '../../../../context/auth/authContext';
import axiosClient from '../../../../config/axios';

export default  ({ children }) => {

    const authContext = useContext(AuthContext);

    const { usuario } = authContext;

    const initialState = {
        works: null,
        date: new Date(),
        loading: true,
        selected_work: null
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
            type: SELECTED_WORK,
            payload: work
        })
    };
    const resetSelectedWork = () => {
        dispatch({
            type: RESET_SELECTED_WORK
        })
    };

    return (
        <Context.Provider
            value={{
                works: state.works,
                date: state.date,
                loading: state.loading,
                selected_work: state.selected_work,
                getWorks,
                selectWork,
                resetSelectedWork
            }}
        >
            {children }
        </Context.Provider>
    )
}