export const getCoords = (  callback ) => {
    const succes = (res) => {
        console.log('coords', res);
        const { coords } = res;
        if( callback ) callback(coords);

    }
    const error = (err) => {
        console.log(err);
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0 
    }
    navigator.geolocation.watchPosition(succes, error, options)
    
}