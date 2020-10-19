import {
    GET_WORKS,
    UPDATE_WORK,
    CHANGE_STATUS_WORK,
    SELECTED_WORK,
    RESET_SELECTED_WORK
} from './types';

export default (state, action) => {
    switch( action.type ) {
        case GET_WORKS :
            return {
                ...state,
                works: action.payload,
                loading: false
            }
        case SELECTED_WORK :
            return {
                ...state,
                selected_work: action.payload
            }
        case RESET_SELECTED_WORK :
            return {
                ...state,
                selected_work: null
            }
        default :
            return state;
    }
}