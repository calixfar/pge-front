import React, { memo } from 'react';
import { Marker } from '@react-google-maps/api';

const MarkersMembers = ({ data, userSelected, getOptionsIcon, onClickMarkerMember }) => {

    console.log('enter render martketsmembers');
    return (
        <>
            {
                data !== null ?
                Object.values(data).map(( member ) => {
                    const { id, coords, show } = member;
                    if( !coords || !show ) return null;
                    const defaultIcon = `/arquivos/market${ userSelected && userSelected.id === id ? 'Selected' : 'Default' }.png`;
                    return (
                        <Marker
                            key={ id }
                            position={{lat: coords.latitude, lng: coords.longitude}}
                            icon={getOptionsIcon(defaultIcon, false, userSelected && userSelected.id === id)}
                            onClick={ () => onClickMarkerMember(member) }
                        />
                    )
                }) : <></>
            }
        </>
    );
};

export default memo(MarkersMembers);