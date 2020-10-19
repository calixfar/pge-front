import React, { useEffect, useState, useContext, useRef } from 'react';
import Map from './map/map';
import Filter from './filter';
import { getLocations } from '../../../utils/sockets';
import Context from './context/context';
import { mapUserCoordWithMembersTeam } from './utils';


const Wrapper = () => {

    let mapRef = useRef(null);
    const { 
        geoLocations, 
        getGeoLocations, 
        updateGeoLocations, 
        teams,
        getTeams } = useContext(Context);
    
    const [teamsLocations, setTeamsLocations] = useState(null);
    const [userSelected, setUserSelected] = useState(null);
    const [showInfoWindow, setShowInfoWindow] = useState(false);


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

    const updateShowInfoWindow = (value) => {
        setShowInfoWindow(value);
    }

    useEffect(() => {
        // console.log('entro effect', usuario);
        // if( !geoLocations && usuario ) {
        getTeams();
        getGeoLocations();
        getLocations(updateGeoLocations);

        // }
    }, []);

    useEffect(() => {

        if(geoLocations !== null && teams !== null) {
            console.log('in wrapper', teams, geoLocations);
            setTeamsLocations(mapUserCoordWithMembersTeam(teams, geoLocations));
        }

    }, [teams, geoLocations]);
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    {
                        teamsLocations &&
                        <>
                            <div className="col-md-8">
                                <Map 
                                    updateMapRef={updateMapRef}
                                    teamsLocations={teamsLocations}
                                    userSelected={userSelected}
                                    updateUserSelected={ updateUserSelected }
                                    showInfoWindow={ showInfoWindow }
                                    updateShowInfoWindow={ updateShowInfoWindow }
                                />
                            </div>
                            <div className="col-md-4">
                                <Filter
                                    teamsLocations={ teamsLocations }
                                    userSelected={userSelected}
                                    updateUserSelected={ updateUserSelected }
                                    showInfoWindow={ showInfoWindow }
                                    updateShowInfoWindow={ updateShowInfoWindow }
                                />
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Wrapper;