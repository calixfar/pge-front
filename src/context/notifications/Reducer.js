import {
    GET_NOTIFICATIONS,
    ERROR_GET_NOTIFICATIONS
} from '../../types/notifications';

export default (state, action) => {
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload,
                loading: false,
                msg: null
            }
        case ERROR_GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: null,
                loading: false,
                msg: action.payload
            }
        default:
            return state;
    }
}