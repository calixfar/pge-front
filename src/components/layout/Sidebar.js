import React, { useEffect, useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
const SideBar = () => {
    const authContext = useContext(AuthContext);
    const { usuario } = authContext;
    const [navActive, setNavActive] = useState('home');

    const changeActive = (navItem) => setNavActive(navItem);
    if(usuario === null) {
        return(
            <div></div>
        )
    }

    return (
        <div className="sidebar" data-color="" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            <div className="logo"><Link to="/home" className="simple-text logo-normal">
               <img className="w-100" src="/arquivos/logo_fic.png"/> 
        </Link></div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className={`nav-item ${navActive === 'home' ? 'background-blue' : ''}`} onClick={ () => changeActive('home')  }>
                        <Link className="nav-link" to="/home">
                            <i className="material-icons">dashboard</i>
                            <p>Home</p>
                        </Link>
                    </li>
                    <li style={{display: `${usuario.type_user != 'ADMIN' ? 'none' : 'block'}`}} className={`nav-item ${navActive === 'equipos' ? 'background-blue' : ''}`} onClick={ () => changeActive('equipos')  }>
                        <Link className="nav-link" to="/equipos">
                            <i className="material-icons">groups</i>
                            <p>Grupos de trabajo</p>
                        </Link>
                    </li>
                    <li className={`nav-item ${navActive === 'usuarios' ? 'background-blue' : ''}`} onClick={ () => changeActive('usuarios')  }>
                        <Link className="nav-link" to="/usuarios">
                            <i className="material-icons">person</i>
                            <p>Usuarios</p>
                        </Link>
                    </li>
                    <li className={`nav-item ${navActive === 'tareas' ? 'background-blue' : ''}`} onClick={ () => changeActive('tareas')  }>
                        <Link className="nav-link" to="/tareas">
                            <i className="material-icons">library_books</i>
                            <p>Tareas</p>
                        </Link>
                    </li>
                    <li className={`nav-item ${navActive === 'lugares' ? 'background-blue' : ''}`} onClick={ () => changeActive('lugares')  }>
                        <Link className="nav-link" to="/lugares">
                            <i className="material-icons">location_ons</i>
                            <p>Lugares</p>
                        </Link>
                    </li>
                    <li className={`nav-item ${navActive === 'mapa' ? 'background-blue' : ''}`} onClick={ () => changeActive('mapa')  }>
                        <Link className="nav-link" to="./mapa">
                            <i className="material-icons">map</i>
                            <p>Mapa</p>
                        </Link>
                    </li>
                    <li className={`nav-item ${navActive === 'actividades' ? 'background-blue' : ''}`} onClick={ () => changeActive('actividades')  }>
                        <Link className="nav-link" to="/actividades">
                            <i className="material-icons">list</i>
                            <p>Actividades</p>
                        </Link>
                    </li>
                    {/* <li className={`nav-item ${navActive === 'notificaciones' ? 'background-blue' : ''}`} onClick={ () => changeActive('notificaciones')  }>
                        <Link className="nav-link" to="/notificaciones">
                            <i className="material-icons">notifications_active</i>
                            <p>Notificationes</p>
                        </Link>
                    </li> */}
                    {/* <li className={`nav-item ${navActive === 'notificaciones' ? 'background-blue' : ''}`} onClick={ () => changeActive('notificaciones')  }>
                        <a className="nav-link" href="./notifications.html">
                            <i className="material-icons">notifications</i>
                            <p>Notificationes</p>
                        </a>
                    </li> */}
                </ul>
                <img className="w-100" src="/arquivos/logo_pgc.png"/> 
            </div>
        </div>
    )

}

export default SideBar;