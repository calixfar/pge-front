import {
    GET_ACTIVITIES, CREATE_ACTIVITY, UPDATE_ACTIVITY, DELETE_ACTIVITY
} from './types';

export default  ( state, action ) => {
    switch (action.type) {
        case GET_ACTIVITIES: 
            return {
                ...state,
                activities: action.payload,
                loading: false
            }
        case CREATE_ACTIVITY:
        case UPDATE_ACTIVITY:
        case DELETE_ACTIVITY:
            return {
                ...state,
                msg: action.payload
            }
        default :
            return state;
    }
}
