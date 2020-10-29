import React, { useContext, useEffect, useState } from 'react';
import Context from '../../../../../context/context';
import ItemActivity from './ItemActivity';
import '../../styles.css';
const ContentActivities = ({ workId, commentary }) => {

    const initialMsg = {
        value: '',
        type: ''
    }
    const { work_activities, getActivitiesByWork, changeSatusActivity, changeStatusWork } = useContext(Context);
    const [reason, setReason] = useState(commentary);
    const [msg, setMsg] = useState(initialMsg);

    const changeMsg = (value) => {
        if( value === '' ) return;
        setMsg(value);
        setTimeout(() => {
            setMsg(initialMsg);
        }, 3000)
    }

    useEffect(() => {
        getActivitiesByWork(workId)
    }, [])

    const onChangeStatusActivity = async (id, value) => {
        const res = await changeSatusActivity(id, {
            status: value,
            commentary
        });
        changeMsg({
            value: res.msg,
            type: res.status ? 'success' : 'error'
        })
    }

    if( !work_activities ) return <></>;

    const onClicSendCommentary = async () => {
        if( reason === '' ) {
            changeMsg({
                value: 'Por favor escribe un comentario',
                type: 'error'
            });
            return;
        }
        const res = await changeStatusWork(workId, { commentary: reason });
        changeMsg({
            value: res.msg,
            type: res.status ? 'success' : 'error'
        })
    }

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
                    <textarea 
                        class="form-control"
                        rows="5"
                        value={reason}
                        onChange={ ({ target }) => setReason(target.value) }
                    ></textarea>
                </div>
            { reason !== '' &&
                <button 
                className="btnReportProblem background-blue"
                onClick={onClicSendCommentary}
                >{ commentary !== '' ? 'Actualizar' : 'Enviar' } Comentario</button>
            
            }
                <p 
                    className={`textMsg ${ msg.value !== '' ? `showMsg ${msg.type === 'success' ? 'textSucess' : 'textError'}` : '' }`}
                    style={{color: `${msg.type === 'success' ? 'green' : 'red'}`}}
                    > { msg.value } </p>
            </div>
        </div>
    )
}

export default ContentActivities;