import React from 'react';
import ActivityState from './context/state';
import Activities from './Activities';
export default () => {
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <ActivityState>
                        <Activities/>
                    </ActivityState>
                </div>
            </div>
        </div>

    )
}