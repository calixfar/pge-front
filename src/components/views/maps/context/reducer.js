import {
    GET_TEAMS,
    UPDATE_SELECTED_MEMBERS,
    CLEAR_SELECTED_MEMBERS,
    GET_PLACES,
    UPDATE_SELECTED_PLACES,
    CLEAR_SELECTED_PLACES,
    GET_GEO_LOCATIONS
} from './types';

export default (state, action) => {
    switch (action.type) {
        case GET_TEAMS:
        case GET_PLACES:
            return {
                ...state,
                teams: action.payload
            }    
        case UPDATE_SELECTED_MEMBERS:
            return {
                ...state,
                selectedMembers: action.payload
            }    
        case CLEAR_SELECTED_MEMBERS:
            return {
                ...state,
                selectedMembers: []
            }    
        case UPDATE_SELECTED_PLACES:
            return {
                ...state,
                selectedPlaces: action.payload
            }    
        case CLEAR_SELECTED_PLACES:
            return {
                ...state,
                selectedPlaces: []
            }    
        case GET_GEO_LOCATIONS:
            return {
                ...state,
                geoLocations: action.payload
            }    
        default:
            return state;
    }
}