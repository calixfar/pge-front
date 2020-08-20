<<<<<<< HEAD
import React from 'react';
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
import PrivateRoute from '../privateRoute';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
const MainPanel = () => {
    return (
        <div>
            <Router>
                <Sidebar/>
                <div className="main-panel">
                        <Header/>
                            <Switch>
                                <Route exact path="/" component={Login}/>
                                <PrivateRoute exact path="/home" component={Content}/>
                                <PrivateRoute path="/usuarios" component={Users}/>
                                <PrivateRoute path="/usuario/:id" component={User}/>
                                <PrivateRoute path="/equipos" component={Teams}/>
                                <PrivateRoute path="/equipo/:id" component={TeamUpdate}/>
                                <PrivateRoute path="/lugares" component={Places}/>
                                <PrivateRoute path="/lugar/:id" component={Place}/>
                                <PrivateRoute path="/mapa" component={Map}/>
                                <WorkState>
                                    <PrivateRoute path="/tareas" component={Works}/>
                                </WorkState>

                                {/* <Route path="/usuario/:id" component={User}/> */}
                                <Route component={Login}/>
                            </Switch>
                        <Footer/>
                </div>
            </Router>
        </div>
    )
}

=======
import React from 'react';
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
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
const MainPanel = () => {
    return (
        <div>
            <Router>
                <Sidebar/>
                <div className="main-panel">
                        <Header/>
                            <Switch>
                                <Route exact path="/" component={Login}/>
                                <Route exact path="/home" component={Content}/>
                                <Route path="/usuarios" component={Users}/>
                                <Route path="/usuario/:id" component={User}/>
                                <Route path="/equipos" component={Teams}/>
                                <Route path="/equipo/:id" component={TeamUpdate}/>
                                <Route path="/lugares" component={Places}/>
                                <Route path="/lugar/:id" component={Place}/>

                                {/* <Route path="/usuario/:id" component={User}/> */}
                                <Route component={Login}/>
                            </Switch>
                        <Footer/>
                </div>
            </Router>
        </div>
    )
}

>>>>>>> 96bda403bd0744c487407eb683fc5a3d26245378
export default MainPanel;