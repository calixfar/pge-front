import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default () => {

    return (
        <div className="main-panel">
            <Sidebar/>
            <Header/>
        </div>
    )
}