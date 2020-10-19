import {
    SUBSCRIBE_USER,
    UPDATE_LOCATION,
    GET_LOCATIONS
} from '../types/sockets';
import socketIOClient from "socket.io-client";

const url = `REACT_APP_BACKEND_URL_${process.env.REACT_APP_ENV === 'develop' ? 'DEV' : 'PROD' }`
const socket = socketIOClient(process.env[url], {transports: ['websocket']});

export const subscribeUser = ( user, callback ) => {
    socket.emit(SUBSCRIBE_USER, { 
        userId: user._id,
        userType: user.type_user,
        userTeamLead: user.team_lead || null
    });
    if( callback ) callback();
}

export const updateLocations = ( data, callback ) => {
    socket.emit(UPDATE_LOCATION, data);
    if( callback ) callback();
    
}
export const getLocations = ( callback ) => {
    socket.on(GET_LOCATIONS, (data) => {
        console.log('data locations', data, callback);
        
        const { userCoords } = data;

        if( callback ) callback(userCoords);
    });
    
}
// export const updateLocations = ( data, callback ) => {
//     const succes = (res) => {
//         console.log('coords', res);
//         const { coords } = res;
//         socket.emit(UPDATE_LOCATION, {
//             ...data,
//             coords
//         });
//         if( callback ) callback(coords);

//     }
//     const error = (err) => {
//         console.log(err);
//     }

//     const options = {
//         enableHighAccuracy: false,
//         timeout: 10000,
//         maximumAge: 0 
//     }
//     navigator.geolocation.watchPosition(succes, error, options)
    
// }