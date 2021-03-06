import { 
    SUCCESS_REGISTRY,
    GET_WORKS,
    GET_WORK,
    UPDATE_WORK,
    DELETE_WORK,
    GET_TEAMS,
    GET_PLACES,
    ERROR_OPERATION,
    GET_TYPES_WORK,
    GET__WORK_ACTIVITIES
 } from './types';

 export default (state, action) => {
    switch (action.type) {
        case SUCCESS_REGISTRY:
        case ERROR_OPERATION: 
        case UPDATE_WORK:
        case DELETE_WORK:
            return {
                ...state,
                msg: action.payload
            }
        case GET_WORKS :
            return {
                ...state,
                msg: '',
                works: action.payload,
                work: {},
                activitiesByWork: []
            }
        case GET_WORK :
            return {
                ...state,
                msg: '',
                work: action.payload
            }
        case GET_TEAMS:
            return {
                ...state,
                msg: '',
                teams: action.payload
            }
        case GET_PLACES: {
            return {
                ...state,
                places: action.payload
            }
        }
        case GET_TYPES_WORK: {
            return {
                ...state,
                typesWork: action.payload
            }
        }
        case GET__WORK_ACTIVITIES: {
            return {
                ...state,
                activitiesByWork: action.payload
            }
        }
        default:
            return state;
    }
 }