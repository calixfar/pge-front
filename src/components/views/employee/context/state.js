import React, { useReducer, useContext } from 'react';
import {
    GET_WORKS,
    UPDATE_WORK,
    CHANGE_STATUS_WORK
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
        loading: true
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

    return (
        <Context.Provider
            value={{
                works: state.works,
                date: state.date,
                loading: state.loading,
                getWorks
            }}
        >
            {children }
        </Context.Provider>
    )
}