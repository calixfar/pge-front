import { ENABLE } from '../../../types/sockets';

export const mapUserCoordWithMembersTeam = (teams, usersCoords) => {
    const temp = {};

    /*
        ENABLE TYPES BASED IN TRAFFIC LIGHT OF THREE STEPS

        1 => NO DATA
        2 => DATA FROM SOCKET
        3 =>  DATA FROM BD
    */ 

    // CHANGE
    teams.forEach( (team) => {
          team.members.forEach(({ user }) => {
            const { _id, name, last_name, phone, latitude, longitude } = user;
            const isCoordsBd = latitude !== '' && longitude !== '';
            const enable = usersCoords[_id] ? usersCoords[_id].enable : isCoordsBd ? ENABLE.OFF : ENABLE.UNKNOWN,
            coords = usersCoords[_id] ? usersCoords[_id].coords : isCoordsBd ? {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            } : null
            temp[_id] = {
                id: _id,
                name: `${ name } ${last_name}`,
                phone,
                enable,
                coords,
                show: true,
                teamId: team._id,
                teamName: team.name
            }
          });
    });
    return temp;
}

export const stateByEnable = (enable, destiny) => {
    let value = '';
    const isDestinyMap = destiny === 'map' ? true : false;
    switch (enable) {
        case ENABLE.ON:
            value = isDestinyMap ?  'ON' : 'stateEnableOn'
            break;
        case ENABLE.OFF:
            value = isDestinyMap ? 'OFF' : 'stateEnableOff'
            break;
        default:
            value = isDestinyMap ? 'DESCONOCIDO' : 'stateEnableUnknow'            
            break;
    }
    return value; 
}