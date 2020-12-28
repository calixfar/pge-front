import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../../context/auth/authContext' ;
import { actionBackgroundImage } from '../../../../utils/utils';
import { updateLocations } from '../../../../utils/sockets';
import { getCoords } from '../../../../utils/location';
const Header = () => {
    const authContext = useContext(AuthContext);
    const { userAuth, auth, usuario, cerrarSesion } = authContext;

    const [showSubMenu, setShowSubMenu] = useState(false);
    const changeSubMenu = () => setShowSubMenu(!showSubMenu);
    const [ coords, setCoords ] = useState(null);
    const [ coordsLocal, setCoordsLocal ] = useState(null);
    

    useEffect(() => {
        if( auth === null ) {
            userAuth();
        }
        
    }, []);

    const updateCoords = () => {
        if( coords  && coords.latitude === coordsLocal.latitude && coords.longitude === coordsLocal.longitude  ) return;
        setCoords(coordsLocal);


    }

    useEffect(() => {
        if( usuario && !coords  ) {
            actionBackgroundImage('remove');
            getCoords((value) => setCoordsLocal(value));
            // setInterval(() => {
            //     // (value) => setCoords(value)
            //     getCoords(callbackGetCoords);
            // }, 10000);
        }
        
    }, [usuario]);

    useEffect(() => {
        updateCoords();
    }, [coordsLocal])

    useEffect(() => {

        if( coords ) {
            const { latitude, longitude } = coords;
            console.log('latitude', latitude);
            updateLocations({
                userId: usuario._id,
                teamId: usuario.team_id,
                coords: {
                    latitude, longitude
                }
            })
        }
    }, [coords]);


    if(usuario === null) {
        return(
            <div></div>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div className="container-fluid">
                <div className="navbar-wrapper">
    <a className="navbar-brand" href="javascript:;">{ usuario.name }</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="navbar-toggler-icon icon-bar" />
                    <span className="navbar-toggler-icon icon-bar" />
                    <span className="navbar-toggler-icon icon-bar" />
                </button>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        <li className="na-item">
                            <p className="navbar-brand mt-3" >{usuario.name}</p>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons">notifications</i>
                                <span className="notification">5</span>
                                <p className="d-lg-none d-md-block">
                                    Some Actions
                                </p>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Mike John responded to your email</a>
                                <a className="dropdown-item" href="#">You have 5 new tasks</a>
                                <a className="dropdown-item" href="#">You're now friend with Andrew</a>
                                <a className="dropdown-item" href="#">Another Notification</a>
                                <a className="dropdown-item" href="#">Another One</a>
                            </div>
                        </li> */}
                        <li className="nav-item dropdown">
                            <button style={{border: 'none', cursor: 'pointer'}}  onClick={changeSubMenu} className="nav-link" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons">person</i>
                                <p className="d-lg-none d-md-block">
                                    Account
            </p>
                            </button>
                            <div className={`dropdown-menu dropdown-menu-right ${showSubMenu ? 'show' : '' }`} aria-labelledby="navbarDropdownProfile">
                                <a className="dropdown-item" href="#">Perfil</a>
                                <div className="dropdown-divider" />
                                <button 
                                    className="dropdown-item"
                                    onClick={cerrarSesion}
                                >Cerrar Sesión</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Header;