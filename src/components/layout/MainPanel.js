import React, { useContext, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import Login from '../login/Login';
import Users from '../views/users/Users';
import User from '../views/users/user';
import Teams from '../views/teams/Teams';
import TeamUpdate from '../views/teams/TeamUpdate';
import Places from '../views/places/Places';
import Place from '../views/places/Place';
import Works from '../views/works/Works';
import WorkState from '../views/works/context/workState';
import Map from '../views/maps';
import Activities from '../views/activities';
import PrivateRoute from '../privateRoute';
import AuthContext  from '../../context/auth/authContext';

import ViewEmpolyee from '../views/employee/employee';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
const MainPanel = () => {

    const authContext = useContext(AuthContext);
    
    const { usuario, userAuth } = authContext;
    useEffect(() => {
        console.log('entro effect');
        userAuth();
    }, []);
    return (
        <>
            <Router>
                {
                    usuario !==  null && usuario.type_user === 'EMPLOYEE' ? 
                    <div>
                        <ViewEmpolyee/>
                    </div> :
                    <div className="main-panel">
                        <Sidebar/>
                        <Header/>
                            <Switch>
                                    <>
                                        <Route exact path="/" component={Login}/>
                                        <PrivateRoute exact path="/home" component={Content}/>
                                        <PrivateRoute path="/usuarios" component={Users}/>
                                        <PrivateRoute path="/usuario/:id" component={User}/>
                                        <PrivateRoute path="/equipos" component={Teams}/>
                                        <PrivateRoute path="/equipo/:id" component={TeamUpdate}/>
                                        <PrivateRoute path="/lugares" component={Places}/>
                                        <PrivateRoute path="/lugar/:id" component={Place}/>
                                        <PrivateRoute path="/mapa" component={Map}/>
                                        <PrivateRoute path="/actividades" component={Activities}/>
                                        <WorkState>
                                            <PrivateRoute path="/tareas" component={Works}/>
                                        </WorkState>
                                    </>  
                                <Route component={Login}/>
                            </Switch>
                        <Footer/>
                    </div>
                }
            </Router>
        </>
    )
}

export default MainPanel;