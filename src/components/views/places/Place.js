<<<<<<< HEAD
import React from 'react';
import { withRouter } from 'react-router-dom';
import FormPlace from './FormPlaces';


const Place = ({ history }) => {
    return(
        <div className="content">
            <div className="container-fluid">
                <FormPlace destinyForm="update"/>
            </div>

        </div>
    )
}

=======
import React from 'react';
import { withRouter } from 'react-router-dom';
import FormPlace from './FormPlaces';


const Place = ({ history }) => {
    return(
        <div className="content">
            <div className="container-fluid">
                <FormPlace destinyForm="update"/>
            </div>

        </div>
    )
}

>>>>>>> 96bda403bd0744c487407eb683fc5a3d26245378
export default withRouter(Place);