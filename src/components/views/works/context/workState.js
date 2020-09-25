import React, { useReducer } from 'react';
import WorkContext from './WorkContext';
import workReducer from './workReducer';
import axiosClient from '../../../../config/axios';
import { showErrorAlert, showQuestionAlert, ShowSuccessMessage } from './alert';
import { 
    SUCCESS_REGISTRY,
    ERROR_OPERATION,
    GET_WORKS,
    GET_WORK,
    UPDATE_WORK,
    DELETE_WORK,
    GET_TEAMS,
    GET_PLACES
 } from './types';


 const WorkState = ({ children }) => {
     const initialState = {
         works: [],
         work: {},
         teams: [],
         places: [],
         form: {
            place: '',
            team: '',
            responsable: '',
            execution_date: '',
            id_base_station: '',
            priority: '',
            type: '',
            creator: ''
         },
         msg: null
     }

     const [state, dispatch] = useReducer(workReducer, initialState);

     const dispatchError = (error) => {
        const {msg} = error.response.data;
        dispatch({
            type: ERROR_OPERATION,
            payload: msg
        });
        showErrorAlert(msg);
     }

     const registerWork = (data) => {
         const callback = async () => {
             try {
                 const res = await axiosClient.post('/api/v1/work', data);
                 dispatch({
                     type: SUCCESS_REGISTRY,
                     payload: res.data.msg
                 });
                 getWorks();
                 ShowSuccessMessage();
             } catch (error) {
                dispatchError(error);
             }
         }
         callback();
     };
     const getWorks = async () => {
        try {
            const res = await axiosClient.get('/api/v1/work');
            console.log(res);
             dispatch({
                 type: GET_WORKS,
                 payload: res.data.works
             })
        } catch (error) {
            dispatchError(error);
        }
     };
     const getWork = async (id) => {
        try {
            const res = await axiosClient.get(`/api/v1/work/${id}`);
            console.log('work data', res.data.work);
            const data = formatDataForm(res.data.work);
             dispatch({
                 type: GET_WORK,
                 payload: data
             })
        } catch (error) {
            dispatchError(error);
        }
    };
    const updateWork = (id, data) => {
        const callback = async () => {
            try {
                const res = await axiosClient.put(`/api/v1/work/${id}`, data);
                 dispatch({
                     type: UPDATE_WORK,
                     payload: res.data.msg
                 })
            } catch (error) {
                dispatchError(error);
            }
        }
        showQuestionAlert(callback);
     };
     const deleteWork = (id) => {
         const callback = async () => {
             try {
                 const res = await axiosClient.delete(`/api/v1/work/${id}`);
                  dispatch({
                      type: DELETE_WORK,
                      payload: res.data.msg
                  })
                  getWorks();
             } catch (error) {
                dispatchError(error);
             }
         }
         showQuestionAlert(callback);
    };
    const getTeams = async () => {
        try {
            const res = await axiosClient.get('/api/v1/team');
            dispatch({
                type: GET_TEAMS,
                payload: res.data.teams
            })
        } catch (error) {
            console.log(error);
        }
    };
    const getPlaces = async () => {
        try {
            const res = await axiosClient.get('/api/v1/place');
            dispatch({
                type: GET_PLACES,
                payload: res.data.places
            })
        } catch (error) {
            console.log(error);
        }
    }
    const formatDataForm = (work) => {
        const { team, place: { _id, address, name, latitude, longitude }, responsable } = work;
        // "2020-09-26T08:36"
        const data = {
            ...work,
            team: team._id,
            responsable: responsable._id,
            place: _id,
            execution_date: work.execution_date.substr(0, work.execution_date.lastIndexOf(':')),
            address, name, latitude, longitude
        }
        return data;
    }
    return(
        <WorkContext.Provider
            value={{
                works: state.works,
                work: state.work,
                teams: state.teams,
                places: state.places,
                msg: state.msg,
                registerWork,
                getWorks,
                getWork,
                updateWork,
                deleteWork,
                getTeams,
                getPlaces
            }}
        >
            { children }
        </WorkContext.Provider>
    )
 };

 export default WorkState;