import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../context/auth/authContext' ;
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
        <div className="sidebar" data-color="green" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            <div className="logo"><Link to="/home" className="simple-text logo-normal">
               <img className="w-25" src="/arquivos/pge_logo.png"/> 
        </Link></div>
            <div className="sidebar-wrapper">
                
            </div>
        </div>
    )

}

export default SideBar;