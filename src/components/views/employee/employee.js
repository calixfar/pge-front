import React from 'react';
import SidebarWorks from './components/SidebarWorks';
import Header from './components/Header';
import WorkState from './context/state';
export default () => {

    return (
        <div className="main-panel">
            <WorkState>
                <SidebarWorks/>
                <Header/>
            </WorkState>
        </div>
    )
}