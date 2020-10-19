import React from 'react';
// import SideBar from '../employee/components/Sidebar';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import { stateByEnable } from '../utils';
const Map = ({
    updateMapRef,
    teamsLocations,
    userSelected,
    updateUserSelected,
    showInfoWindow,
    updateShowInfoWindow
}) => {

    const mapContainerStyle = {
        width: '100%',
        height: '100%'
    }
    // -0.7675451,-80.3310071
    const initialCenter = {
        lat: 5.0035534,
        lng:-77.2987238
    }
    const options = {
        disableDefaultUI: true,
        zoomControl: true
    }

    const onClickMarker = ( member ) => {
        updateUserSelected(member);
        updateShowInfoWindow(true);
    }
    const resLoadMap = useLoadScript({
        googleMapsApiKey: 'AIzaSyCJZb0uQ_fXU53JfJQxYYCgKUJeSZSGTTQ'
    });
    const { isLoaded, loadError } = resLoadMap;
    if( loadError ) return <div>Error al cargar el mapa</div>
    if( !isLoaded ) return <div>Cargando...</div>

    // 3.9301794,-77.2987238,6z/data=!4m5!3m4!1s0x8e15a43aae1594a3:0x9a0d9a04eff2a340!8m2!3d4.570868!4d-74.297333?hl=es
    // https://www.google.com/maps/place/Colombia/@5.0035534,-76.5296808,6z/data=!4m5!3m4!1s0x8e15a43aae1594a3:0x9a0d9a04eff2a340!8m2!3d4.570868!4d-74.297333?hl=es

    const renderedMarkets = () => {

        const teamsLocationsValues = Object.values(teamsLocations);
        return (
            <>
                {
                    teamsLocationsValues.map(( member ) => {
                        const { id, coords, show } = member;
                        if( !coords || !show ) return;
                        const defaultIcon = `/arquivos/market${ userSelected && userSelected.id === id ? 'Selected' : 'Default' }.png`;
                        const optionsIcon = {
                            url: defaultIcon,
                            scaledSize: {width: 40, height: 50},                               
                            origin: {x: 0, y: 0},                               
                            anchor: {x: 25, y: 25}
                        }
                        if( userSelected && userSelected.id === id ) {
                            optionsIcon.scaledSize = {
                                width: 50, height: 60
                            }
                        };
                        return (
                            <Marker
                                key={id}
                                position={{lat: coords.latitude, lng: coords.longitude}}
                                icon={optionsIcon}
                                onClick={ () => onClickMarker(member) }
                            />
                        )
                    })
                }
            </>
        )
    }

    const renderedInfoWindow = () => {
        const { coords: { latitude, longitude }, name, teamName, phone, enable } = userSelected;
        return (
            <InfoWindow 
                position={{ 
                    lat: latitude,
                    lng: longitude
                }}
                onCloseClick={ () => updateShowInfoWindow(false) }
            >
                <div>
                    <h2 style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>{name}</h2>
                    <p style={{margin: '10px 0 0 0'}}>Equipo: { teamName }</p>
                    <p style={{margin: '10px 0 0 0'}}>Teléfono: { phone }</p>
                    <p style={{margin: '10px 0 0 0'}}>Estado: { stateByEnable(enable, 'map') }</p>
                </div>
            </InfoWindow>
        )
    }

    return (
        <div style={{height: '100%'}} className={ `containerMap` }>
            <GoogleMap
                onLoad={( map ) => {
                    updateMapRef(map)
                }}
                mapContainerStyle={mapContainerStyle}
                zoom={6}
                center={initialCenter}
                options={options}
            >
                { renderedMarkets() }
                { userSelected && showInfoWindow && renderedInfoWindow() }
            </GoogleMap>
        </div>
    )
}
export default Map;