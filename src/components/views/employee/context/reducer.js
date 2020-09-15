import {
    GET_WORKS,
    UPDATE_WORK,
    CHANGE_STATUS_WORK
} from './types';

export default (state, action) => {
    switch( action.type ) {
        case GET_WORKS :
            return {
                ...state,
                works: action.payload,
                loading: false
            }
        default :
            return state;
    }
}