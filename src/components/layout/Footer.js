<<<<<<< HEAD
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Footer = () => {

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
        <footer className="footer">
            <div className="container-fluid">
                <nav className="float-left">
                    <ul>
                        <li>
                            <a href="https://www.creative-tim.com">
                                Creative Tim
                            </a>
                        </li>
                        <li>
                            <a href="https://creative-tim.com/presentation">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="http://blog.creative-tim.com">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="https://www.creative-tim.com/license">
                                Licenses
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="copyright float-right">
                    ©
      , made with <i className="material-icons">favorite</i> by
      <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a> for a better web.
    </div>
            </div>
        </footer>

    )
}

=======
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Footer = () => {

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
        <footer className="footer">
            <div className="container-fluid">
                <nav className="float-left">
                    <ul>
                        <li>
                            <a href="https://www.creative-tim.com">
                                Creative Tim
                            </a>
                        </li>
                        <li>
                            <a href="https://creative-tim.com/presentation">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="http://blog.creative-tim.com">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="https://www.creative-tim.com/license">
                                Licenses
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="copyright float-right">
                    ©
      , made with <i className="material-icons">favorite</i> by
      <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a> for a better web.
    </div>
            </div>
        </footer>

    )
}

>>>>>>> 96bda403bd0744c487407eb683fc5a3d26245378
export default Footer;