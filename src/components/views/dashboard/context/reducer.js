import {
    GET_COUNT_WORKS,
    UPDATE_FILTER_ZONE,
    GET_WORKS_USERS
} from './types';

export default ( state, action ) => {
    switch (action.type) {
        case GET_COUNT_WORKS:
            return {
                ...state,
                countWorks: action.payload,
                loading: false
            }
        case GET_WORKS_USERS:
            return {
                ...state,
                worksUsers: action.payload,
                loading: false
            }
        case UPDATE_FILTER_ZONE:
            return {
                ...state,
                filterZone: action.payload
            }
        default:
            return state;
    }
}