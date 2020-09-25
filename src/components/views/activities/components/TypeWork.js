import React, { useState } from 'react';
import Activities from './Activities';
// import Context from '../context/context';

export default ({ _id, type }) => {

    // const onClickNewActivity = () => {
    //     if( valueNewItem === '' ) return;
        
    // }
    return (
        <div className="col-lg-6 col-md-12">
            <div className="card">
                <div className="card-header card-header-tabs background-blue">
                <h4 class="card-title">{ type }</h4>
                </div>
                <div className="card-body">
                    <Activities typeWorkId={_id}/>
                </div>
            </div>
        </div>
    )
}