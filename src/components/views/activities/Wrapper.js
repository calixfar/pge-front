import React from 'react';
import ActivityState from './context/state';
import TypesWork from './TypesWork';
export default () => {
    return (
        <div className="content">
            <div className="container-fluid">
                <ActivityState>
                    <TypesWork/>
                </ActivityState>
                
            </div>
        </div>

    )
}