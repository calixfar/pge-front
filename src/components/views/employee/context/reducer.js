import {
    GET_WORKS,
    UPDATE_WORK,
    CHANGE_STATUS_WORK,
    INITIALIZED_WORK,
    RESET_SELECTED_WORK,
    GET_WORK_ACTIVITIES
} from './types';

export default (state, action) => {
    switch( action.type ) {
        case GET_WORKS :
            return {
                ...state,
                works: action.payload,
                loading: false
            }
        case INITIALIZED_WORK :
            return {
                ...state,
                initialized_work: action.payload
            }
        case RESET_SELECTED_WORK :
            return {
                ...state,
                initialized_work: null
            }
        case GET_WORK_ACTIVITIES :
            return {
                ...state,
                work_activities: action.payload
            }
        default :
            return state;
    }
}