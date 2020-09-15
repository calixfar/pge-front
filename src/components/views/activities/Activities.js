import React, { useContext, useEffect } from 'react';
import Activity from './components/Activity';
import BlankActivity from './components/BlankActivity';
import Context from './context/context';

export default () => {

    const { activities, getActivities } = useContext(Context);
    console.log(activities);
    const renderedWorks = () => {
        if( activities == null ) return <div></div>;
        else if ( activities == [] ) return <div><p>No hay actividades creadas</p></div>
        return <div className="row">
            {
                activities.map((activity) => (
                       <Activity key={activity._id} {...activity}/>
                ))

            }
            <BlankActivity/>
        </div>
    }

    useEffect(() => {
        if( activities == null ) getActivities();
    }, [])
    return (
        <div>
            {
                renderedWorks()   
            }
        </div>
    )
}