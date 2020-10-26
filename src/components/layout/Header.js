import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { actionBackgroundImage } from '../../utils/utils';
import { subscribeUser } from '../../utils/sockets';
const Header = () => {
    const authContext = useContext(AuthContext);
    const { userAuth, auth, usuario, cerrarSesion } = authContext;

    const [showSubMenu, setShowSubMenu] = useState(false);
    const [ sockerSubscribeEmit, setSockerSubscribeEmit ] = useState(false);
    
    const changeSubMenu = () => setShowSubMenu(!showSubMenu);
    useEffect(() => {
        // if( auth === null ) {
        //     console.log('enter ');
        //     userAuth();
        // }
    }, []);

    useEffect(() => {
        if( usuario ) {
            actionBackgroundImage('remove');
            if( !sockerSubscribeEmit )
            subscribeUser(usuario, () => setSockerSubscribeEmit(true) );
        }
    }, [usuario]);

    if(usuario === null) {
        return(
            <div></div>
        )
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div className="container-fluid">
                {/* <div className="navbar-wrapper">
                    <a className="navbar-brand" href="javascript:;">Dashboard</a>
                </div> */}
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
                        <li className="nav-item dropdown">
                            <button style={{border: 'none', cursor: 'pointer'}}  onClick={changeSubMenu} className="nav-link" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="material-icons">person</i>
                                <p className="d-lg-none d-md-block">
                                    Account
                                </p>
                            </button>
                            <div className={`dropdown-menu dropdown-menu-right ${showSubMenu ? 'show' : '' }`} aria-labelledby="navbarDropdownProfile">
                                {/* <a className="dropdown-item" href="#">Perfil</a>
                                <div className="dropdown-divider" /> */}
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