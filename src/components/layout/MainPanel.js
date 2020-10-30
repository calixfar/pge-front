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
import Work from '../views/works/Work';
import WorkState from '../views/works/context/workState';
import Map from '../views/maps';
import MapState from '../views/maps/context/state';
import Activities from '../views/activities';
import Dashboard from '../views/dashboard';
import PrivateRoute from '../privateRoute';
import AuthContext  from '../../context/auth/authContext';
import DashboardState  from '../views/dashboard/context/state';
import NotificationState from '../../context/notifications/State';
import Notifications from '../views/notifications';
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
                <NotificationState>
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
                                            <DashboardState>
                                                <PrivateRoute exact path="/home" component={Dashboard}/>
                                            </DashboardState>
                                            <PrivateRoute path="/usuarios" component={Users}/>
                                            <PrivateRoute path="/usuario/:id" component={User}/>
                                            <PrivateRoute path="/equipos" component={Teams}/>
                                            <PrivateRoute path="/equipo/:id" component={TeamUpdate}/>
                                            <PrivateRoute path="/lugares" component={Places}/>
                                            <PrivateRoute path="/lugar/:id" component={Place}/>
                                            <MapState>
                                                <PrivateRoute path="/mapa" component={Map}/>
                                            </MapState>
                                            <PrivateRoute path="/actividades" component={Activities}/>
                                            <WorkState>
                                                <PrivateRoute path="/tareas" component={Works}/>
                                                <PrivateRoute path="/tarea/:id" component={Work}/>
                                            </WorkState>
                                            <PrivateRoute path="/notificaciones" component={ Notifications } />
                                        </>  
                                    <Route component={Login}/>
                                </Switch>
                            {/* <Footer/> */}
                        </div>
                    }
                </NotificationState>
            </Router>
        </>
    )
}

export default MainPanel;