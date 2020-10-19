import React, { useReducer } from 'react';
import Context from './context';
import {
    GET_TEAMS,
    UPDATE_SELECTED_MEMBERS,
    CLEAR_SELECTED_MEMBERS,
    GET_PLACES,
    UPDATE_SELECTED_PLACES,
    CLEAR_SELECTED_PLACES,
    GET_GEO_LOCATIONS
} from './types';
import reducer from './reducer';
import axiosClient from '../../../../config/axios';

const MapState = ({ children }) => {


    const initialState = {
        teams: null,
        selectedsMembersTeam: [],
        geoLocations: null
    }

    const [ state, dispatch ] = useReducer( reducer, initialState);

    const getTeams = async () => {
        try {
            const { data: { teams } } = await axiosClient.get('/api/v1/team');
            dispatch({
                type: GET_TEAMS,
                payload: teams
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    const clearSelectedMembers = () => {
        dispatch({
            type: CLEAR_SELECTED_MEMBERS
        })
    };
    const clearSelectedPlaces = () => {
        dispatch({
            type: CLEAR_SELECTED_PLACES
        })
    };

    const updateSelectedMembers = (value) => {
        dispatch({
            type: UPDATE_SELECTED_MEMBERS,
            payload: value
        });
    }

    const pushSelectedMembers = () => {}
    const deleteSelectedMembers = () => {}

    const getPlaces = async () => {
        try {
            const { data: { places } } = await axiosClient.get('/api/v1/place');
            dispatch({
                type: GET_PLACES,
                payload: places
            });
        } catch (error) {
            console.log(error.response);
        }
    }
    const updateSelectedPlaces = (value) => {
        dispatch({
            type: UPDATE_SELECTED_PLACES,
            payload: value
        });
    }

    const getGeoLocations = async () => {
        try {
            const { data } = await axiosClient.get('/api/v1/map-coords');
            console.log('map-coords', data);
            const { usersCoords } = data;
            updateGeoLocations(usersCoords);
        } catch (error) {
            console.log(error.response);
        }
    }

    const updateGeoLocations = (value) => {
        console.log('value', value);
        dispatch({
            type: GET_GEO_LOCATIONS,
            payload: value
        });
    }

    return (
        <Context.Provider
            value={{
                teams: state.teams,
                selectedsMembersTeam: state.selectedsMembersTeam,
                geoLocations: state.geoLocations,
                getTeams,
                clearSelectedMembers,
                getGeoLocations,
                updateGeoLocations,
                getPlaces,
                updateSelectedPlaces,
                clearSelectedPlaces
            }}
        >
            { children }
        </Context.Provider>
    )
};

export default MapState;