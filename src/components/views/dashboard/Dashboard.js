import React from 'react';
import FilterZones from './components/FilterZones';
import ListSummaryStatusWork from './components/ListSummaryStatusWork';
const Dashboard = () => {

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <FilterZones/>
                    </div>
                    <div className="col-md-8">
                        <ListSummaryStatusWork/>
                        <div className="row">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;