export const mapUserCoordWithMembersTeam = (teams, usersCoords) => {
    const temp = {};

    /*
        ENABLE TYPES BASED IN TRAFFIC LIGHT OF THREE STEPS

        1 => NO DATA
        2 => DATA FROM SOCKET
        3 =>  DATA FROM BD
    */ 

    teams.forEach( (team) => {
          team.members.forEach(({ user }) => {
            const { _id, name, last_name, phone, latitude, longitude } = user;
            const enable = usersCoords[_id] ? 2 : latitude !== '' && longitude !== '' ? 3 : 1,
            coords = enable === 2 ? usersCoords[_id].coords : enable === 3 ? {
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
        case 2:
            value = isDestinyMap ?  'ON' : 'stateEnableOn'
            break;
        case 3:
            value = isDestinyMap ? 'OFF' : 'stateEnableOff'
            break;
        default:
            value = isDestinyMap ? 'DESCONOCIDO' : 'stateEnableUnknow'            
            break;
    }
    return value; 
}