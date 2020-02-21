import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
const SideBar = () => {
    const authContext = useContext(AuthContext);
    const { userAuth, usuario } = authContext;
    useEffect(() => {
        userAuth();
    }, []);
    if(usuario === null) {
        return(
            <div></div>
        )
    }
    return (
        <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            <div className="logo"><a href="http://www.creative-tim.com" className="simple-text logo-normal">
               <img className="w-25" src="/arquivos/pge_logo.png"/> 
        </a></div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className="nav-item active  ">
                        <a className="nav-link" href="./dashboard.html">
                            <i className="material-icons">dashboard</i>
                            <p>Home</p>
                        </a>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/usuarios">
                            <i className="material-icons">person</i>
                            <p>Usuarios</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/equipos">
                            <i className="material-icons">content_paste</i>
                            <p>Equipos</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/lugares">
                            <i className="material-icons">library_books</i>
                            <p>Lugares</p>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link" href="./map.html">
                            <i className="material-icons">location_ons</i>
                            <p>Maps</p>
                        </a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link" href="./notifications.html">
                            <i className="material-icons">notifications</i>
                            <p>Notificationes</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default SideBar;