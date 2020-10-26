import React, { useContext, useEffect } from 'react';
import Context from '../../../../../context/context';
import ItemActivity from './ItemActivity';
const ContentActivities = ({ workId }) => {

    const { work_activities, getActivitiesByWork } = useContext(Context);

    useEffect(() => {
        getActivitiesByWork(workId)
    }, [])

    const onChangeStatusActivity = (value) => {
        console.log(value);
    }

    if( !work_activities ) return <></>;

    const renderedActivities = () => {
        return work_activities.map((workActivity) => {
            return (
                <ItemActivity  
                    key={workActivity._id} 
                    {...workActivity}
                    onChangeStatusActivity={ onChangeStatusActivity }
                />
            )
        })
    }


    return (
        <div className="containerSendWork">
            <h3 className="containerSendWorkTitle">Actividades</h3>
            <div className="contentSendWork">
                <div className="contentActivities">
                    {/* <span className="contentActivitiesNote">*Marca solo las actividades que hayas completado</span> */}
                    <div className="listActivities">
                        { renderedActivities() }
                    </div>
                </div>
                <div class="form-group bmd-form-group">
                    <label class="bmd-label-floating"> Comentario</label>
                    <textarea class="form-control" rows="5"></textarea>
                </div>
            </div>
        </div>
    )
}

export default ContentActivities;