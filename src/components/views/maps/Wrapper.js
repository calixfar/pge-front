import React, { useEffect, useState, useContext, useRef, useCallback, useMemo } from 'react';
import Map from './map/map';
import Filter from './filter';
import { getLocations } from '../../../utils/sockets';
import Context from './context/context';
import { mapUserCoordWithMembersTeam, filterPlacesWithActiveWorks } from './utils';
import './styles.css';

const Wrapper = () => {

    let mapRef = useRef(null);

    
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
    
    const [ showPlaces, setShowPlaces ] = useState(true);
    const [ showPlacesWithWorks, setShowPlacesWithWorks ] = useState(false);

    // const [zoomValue, setZoomValue] = useState(6);


    const updateShowPlaces = useCallback((value) => {
        setShowPlaces( value );
    }, [places]);

    const updateShowPlacesWithWorks = useCallback((value) => {
        setShowPlacesWithWorks( value );
    }, [places])


    const centerMap = useCallback(( data ) => {
        
        if(  mapRef.current === null ) return;
        console.log(data);
        const {center, zoom} = data;
        mapRef.current.panTo(center);
        mapRef.current.setZoom(zoom);
        // setZoomValue(zoom);
        console.log('ref', mapRef.current.center.lat(), mapRef.current.center.lng());
    }, [])

    const updateMapRef = useCallback(( value ) => {
        mapRef.current = value;
    }, [])

    // const updateTeamLocations = useCallback((value) => {
    //     setTeamsLocations(value);
    // },[teams, geoLocations])


    const updateUserSelected = useCallback((value, isEventFilter) => {
        setUserSelected(value);
        updateShowInfoWindow('member',true);

        const { coords: { latitude, longitude } } = value;
        console.log('cetner', latitude, longitude);
        if( isEventFilter ) centerMap({
            center: {
                lat: latitude,
                lng: longitude
            },
            zoom: 16
        })
    }, [geoLocations , showInfoWindow]);

    

    const updatePlaceSelected = useCallback((value, isEventFilter) => {
        console.log(value);
        setPlaceSelected(value);
        updateShowInfoWindow('place', true);

        if( isEventFilter ) centerMap({
            center: {
                lat: parseFloat(value.latitude),
                lng: parseFloat(value.longitude)
            },
            zoom: 16
        })
    }, [places, placeSelected, showInfoWindow])

    const updateShowInfoWindow = useCallback((type, value) => {
        setShowInfoWindow({
            ...showInfoWindow,
            [type]: value
        });
    })
    

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

    const filterPlaces = useMemo(() => showPlacesWithWorks ? filterPlacesWithActiveWorks(places) : places, [places, showPlacesWithWorks]);
    console.log('filterPlaces', filterPlaces);
    return (
        <div className="content">
            <div className="container-fluid completeHeight">
                    <div className="row completeHeight">
                    <div className="col-md-8 colMap">
                        <Map 
                            updateMapRef={ updateMapRef }
                            teamsLocations={teamsLocations}
                            userSelected={userSelected}
                            updateUserSelected={ updateUserSelected }
                            showInfoWindow={ showInfoWindow }
                            places={ filterPlaces }
                            showPlaces={ showPlaces }
                            updatePlaceSelected={ updatePlaceSelected }
                            placeSelected={ placeSelected }
                            updateShowInfoWindow={ updateShowInfoWindow }
                            mapRef={ mapRef }
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
                            showPlacesWithWorks={ showPlacesWithWorks }
                            updateShowPlaces={ updateShowPlaces }
                            updateShowPlacesWithWorks={ updateShowPlacesWithWorks }
                            places={ filterPlaces }
                            updatePlaceSelected={ updatePlaceSelected }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wrapper;