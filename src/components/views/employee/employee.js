import React from 'react';
import SidebarWorks from './components/SidebarWorks';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EmployeeState from './context/state';
export default () => {

    return (
        <div className="main-panel">
            <EmployeeState>
                <SidebarWorks/>
                <Header/>
                <Dashboard/>
            </EmployeeState>
        </div>
    )
}