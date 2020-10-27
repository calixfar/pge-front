import React, { useEffect, useState, useContext, useRef } from 'react';
import Map from './map/map';
import Filter from './filter';
import { getLocations } from '../../../utils/sockets';
import Context from './context/context';
import { mapUserCoordWithMembersTeam } from './utils';
import './styles.css';

const Wrapper = () => {

    let mapRef = useRef(null);

    const initialSizeMarkerPlace = {
        width: 4,
        height: 7
    };
    const { 
        geoLocations, 
        getGeoLocations, 
        updateGeoLocations, 
        teams,
        places,
        getPlaces,
        getTeams } = useContext(Context);
    
    const [teamsLocations, setTeamsLocations] = useState(null);
    const [userSelected, setUserSelected] = useState(null);
    const [placeSelected, setPlaceSelected] = useState(null);
    const [showInfoWindow, setShowInfoWindow] = useState({
        member: false,
        place: false
    });
    const [ sizeMarkerPlace, setSizeMarketPlace ] = useState(initialSizeMarkerPlace)
    const [ showPlaces, setShowPlaces ] = useState(true);


    const updateShowPlaces = (value) => {
        setShowPlaces( value );
    }

    const centerMap = () => {
        
        if(  mapRef.current === null ) return;
        let center = {
            lat: 3.9301794,
            lng: -77.2987238
        }
        let zoom = 7;
        // if( selectedShop !== null ) {
        //     const { pickupPoint: {  address: { location: { latitude, longitude } } } } : any = selectedShop;
        //     center.lat = latitude;
        //     center.lng = longitude;

        //     zoom = 14;
        // };
        mapRef.current.panTo(center);
        mapRef.current.setZoom(zoom);
    } 

    const updateMapRef = ( value ) => {
        mapRef.current = value;
    }

    const updateTeamLocations = (value) => {
        setTeamsLocations(value);
    }

    const updateUserSelected = (value) => {
        setUserSelected(value);
    }
    const updatePlaceSelected = (value) => {
        setPlaceSelected(value);
    }

    const updateShowInfoWindow = (type, value) => {
        setShowInfoWindow({
            ...showInfoWindow,
            [type]: value
        });
    }
    const onZoomChange = () => {
        const { current } = mapRef;
        if( !current ) return;
        const { zoom } = current;
        
        setSizeMarketPlace({
            width: zoom <= 10 ? initialSizeMarkerPlace.width : zoom,  
            height: zoom <= 10 ? initialSizeMarkerPlace.height : zoom + 5
        })


    }

    useEffect(() => {
        // console.log('entro effect', usuario);
        // if( !geoLocations && usuario ) {
        getTeams();
        getGeoLocations();
        getLocations(updateGeoLocations);
        getPlaces();

        // }
    }, []);

    useEffect(() => {

        if(geoLocations !== null && teams !== null) {
            setTeamsLocations(mapUserCoordWithMembersTeam(teams, geoLocations));
        }

    }, [teams, geoLocations]);
    return (
        <div className="content">
            <div className="container-fluid completeHeight">
                    <div className="row completeHeight">
                    <div className="col-md-8 colMap">
                        <Map 
                            updateMapRef={updateMapRef}
                            teamsLocations={teamsLocations}
                            userSelected={userSelected}
                            updateUserSelected={ updateUserSelected }
                            showInfoWindow={ showInfoWindow }
                            places={ places }
                            updateShowInfoWindow={ updateShowInfoWindow }
                            onZoomChange={ onZoomChange }
                            sizeMarkerPlace={ sizeMarkerPlace }
                            showPlaces={ showPlaces }
                            updatePlaceSelected={ updatePlaceSelected }
                            placeSelected={ placeSelected }
                        />
                    </div>
                    <div className="col-md-4 colFilters">
                        <Filter
                            teamsLocations={ teamsLocations }
                            userSelected={userSelected}
                            updateUserSelected={ updateUserSelected }
                            showInfoWindow={ showInfoWindow }
                            updateShowInfoWindow={ updateShowInfoWindow }
                            showPlaces={ showPlaces }
                            updateShowPlaces={ updateShowPlaces }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wrapper;