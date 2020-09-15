import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WorkState from './context/state';
export default () => {

    return (
        <div className="main-panel">
            <WorkState>
                <Sidebar/>
                <Header/>
            </WorkState>
        </div>
    )
}