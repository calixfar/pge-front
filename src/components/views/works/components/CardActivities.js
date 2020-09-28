import React, { useContext, useEffect } from 'react';
import Context from '../context/WorkContext';
import ItemActivity from './ItemActivity';

const CardActivities = ({ workId }) => {

    const { activitiesByWork, getActivitiesByWork } = useContext(Context);

    const renderedActivities = () => {
        if( !activitiesByWork ) return <></>;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        return activitiesByWork.map(( workActivity ) => (
            <ItemActivity  key={workActivity._id} {...workActivity}/>
        ))
    }

    useEffect(() => {
        getActivitiesByWork(workId);
    }, []);

    return (
        <div className="col-lg-6 col-md-12">
            <div className="card">
                <div className="card-header card-header-tabs background-blue">
                    <h4 class="card-title">Lista Actividades</h4>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div className="tab-pane active" id="profile">
                            <table className="table">
                                <tbody>
                                    {
                                        renderedActivities()
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default CardActivities;