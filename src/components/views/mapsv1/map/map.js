import React, { memo } from 'react';
// import SideBar from '../employee/components/Sidebar';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow
} from '@react-google-maps/api';
import { stateByEnable } from '../utils';
import MarkersMembers from './components/MarkersMembers';
const Map = ({
    updateMapRef,
    teamsLocations,
    places,
    userSelected,
    updateUserSelected,
    showInfoWindow,
    updateShowInfoWindow,
    onZoomChange,
    sizeMarkerPlace,
    showPlaces,
    updatePlaceSelected,
    placeSelected
}) => {

    console.log('teamsLocations', teamsLocations);
    console.log('places', places);
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

    const onClickMarkerMember = ( member ) => {
        updateUserSelected(member);
        updateShowInfoWindow('member', true);
    }
    const onClickMarkerPlace = ( place ) => {
        updatePlaceSelected(place);
    }

    const closeInfoWindow = (type) => {
        updateShowInfoWindow(type, false)
    }
    const resLoadMap = useLoadScript({
        googleMapsApiKey: 'AIzaSyCJZb0uQ_fXU53JfJQxYYCgKUJeSZSGTTQ'
    });
    const { isLoaded, loadError } = resLoadMap;
    if( loadError ) return <div>Error al cargar el mapa</div>
    if( !isLoaded ) return <div>Cargando...</div>

    // 3.9301794,-77.2987238,6z/data=!4m5!3m4!1s0x8e15a43aae1594a3:0x9a0d9a04eff2a340!8m2!3d4.570868!4d-74.297333?hl=es
    // https://www.google.com/maps/place/Colombia/@5.0035534,-76.5296808,6z/data=!4m5!3m4!1s0x8e15a43aae1594a3:0x9a0d9a04eff2a340!8m2!3d4.570868!4d-74.297333?hl=es


    const getOptionsIcon = ( urlIcon, isMap, selected ) => {
        const optionsIcon = {
            url: urlIcon
        }
        optionsIcon.scaledSize = {width: 30, height: 40};                               
        optionsIcon.origin = {x: 0, y: 0};                           
        optionsIcon.anchor = {x: 25, y: 25}
        if( isMap ) {
            optionsIcon.scaledSize = sizeMarkerPlace;                               
            optionsIcon.origin = {x: 0, y: 0};                           
            optionsIcon.anchor = {x: 5, y: 5}
        }

        if( selected ) {
            optionsIcon.scaledSize = {
                width: 40, height: 50
            }
        };
        return { ...optionsIcon }
    };

    const renderedMarketsPlaces = ()  => (
        <>
            {
                places.map((place) => {
                    const { _id, latitude, longitude } = place;
                    if( !latitude && !longitude ) return;
                    return (
                        <Marker
                            key={ _id }
                            position={{
                                lat: parseFloat(latitude),
                                lng: parseFloat(longitude)
                            }}
                            icon={getOptionsIcon(`/arquivos/marketUnknow.png`, true, false)}
                            onClick={ () => onClickMarkerPlace(place) }
                        />
                    )
                })
            }
        </>
    )



    // const renderedMarketsMembers = () => {
    //     console.log('render');
    //     const teamsLocationsValues = Object.values(teamsLocations);
        
    //     const Markers = memo(( {data} ) => {

    //     console.log('render memo');
    //         return (
                
    //         )
    //     })
    //     return <Markers data={teamsLocationsValues}/>;
    // }

    const renderedInfoWindowMember = () => {
        const { coords: { latitude, longitude }, name, teamName, phone, enable } = userSelected;
        return (
            <InfoWindow 
                position={{ 
                    lat: latitude,
                    lng: longitude
                }}
                onCloseClick={ () => closeInfoWindow('member') }
            >
                <div>
                    <h2 style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>{name}</h2>
                    <p style={{margin: '10px 0 0 0'}}>Equipo: { teamName }</p>
                    <p style={{margin: '10px 0 0 0'}}>Teléfono: { phone }</p>
                    <p style={{margin: '10px 0 0 0'}}>Estado: { stateByEnable(enable, 'map') }</p>
                    <p style={{margin: '10px 0 0 0'}}>Latitud: { latitude }</p>
                    <p style={{margin: '10px 0 0 0'}}>Longitud: { longitude }</p>
                    
                </div>
            </InfoWindow>
        )
    }
    const renderedInfoWindowPlace = () => {
        const { latitude, longitude, name, code_site, owner, zone } = placeSelected;
        console.log('placeSelected', placeSelected);
        return (
            <InfoWindow 
                position={{ 
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude)
                }}
                onCloseClick={ () => closeInfoWindow('place') }
            >
                <div>
                    <h2 style={{textAlign: 'center', fontSize: '16px', fontWeight: 'bold'}}>{name}</h2>
                    <p style={{margin: '10px 0 0 0'}}>Código sitio: { code_site }</p>
                    <p style={{margin: '10px 0 0 0'}}>Zona: { zone }</p>
                    <p style={{margin: '10px 0 0 0'}}>Propietario: { owner }</p>
                    <p style={{margin: '10px 0 0 0'}}>Latitud: { latitude }</p>
                    <p style={{margin: '10px 0 0 0'}}>Longitud: { longitude }</p>
                    
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
                onZoomChanged={ onZoomChange }
                mapContainerStyle={mapContainerStyle}
                zoom={6}
                center={initialCenter}
                options={options}
            >
                <MarkersMembers
                    data={teamsLocations}
                    userSelected={userSelected}
                    getOptionsIcon={getOptionsIcon}
                    onClickMarkerMember={onClickMarkerMember}
                />
                { teamsLocations !== null && 
                    <> 
                    {/* { renderedMarketsMembers() } */}
                    
                    { showPlaces && places && renderedMarketsPlaces() }
                    { userSelected && showInfoWindow.member && renderedInfoWindowMember() }
                    { placeSelected && showInfoWindow.place && renderedInfoWindowPlace() }
                    </> 
                }
            </GoogleMap>
        </div>
    )
}
export default memo(Map);