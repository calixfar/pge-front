import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const PageView = () => {
    const location = useLocation();

    useEffect(() => {
        console.log('location', location);
        ReactGA.pageview(location.pathname + location.search);
    }, [location.pathname]);

    // useEffect(() => {
    //     // const history = createBrowserHistory();
    //     // Initialize google analytics page view tracking
    //     // const trackingId = "UA-1234567890-1"; // Replace with your Google Analytics tracking ID
    //     const trackingId = "UA-185807888-1"; // Replace with your Google Analytics tracking ID
    //     ReactGA.initialize(trackingId);
      
    // }, []);
    return (
        <></>
    )
}

export default PageView;