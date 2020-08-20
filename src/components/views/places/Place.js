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

export default withRouter(Place);