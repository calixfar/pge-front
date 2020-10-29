import React, { useState } from 'react';
import ListReasons from './ListReasons';
import '../../styles.css';
const ContentReportProblem = ({ sendReportProblem }) => {

    const initialMsg = {
        value: '',
        type: ''
    }
    const [ reason, setReason ] = useState('');
    const [showOtherReason, setShowOtherReason] = useState(false);
    const [msg, setMsg] = useState(initialMsg);

    const changeMsg = (value) => {
        if( value === '' ) return;
        setMsg(value);
        setTimeout(() => {
            setMsg(initialMsg);
        }, 3000)
    }

    const changeReason = ( value ) => {
        console.log(value);
        if( value !== 'Otro' ) {
            setReason(value);
            setShowOtherReason(false);
        }
        else {
            setReason('');
            setShowOtherReason(true);
        }
    }

    const onClickReport = () => {
        if( reason === '' ) changeMsg({
            type: 'error',
            value: 'Debes seleccionar una opción o escribir un motivo'
        });
        sendReportProblem(reason);
    }

    return (
        <div className="containerReportProblem">
            <h3 className="containerReportProblemTitle">Seleccione el motivo</h3>
            <ListReasons
                commentary={reason}
                showOtherReason={showOtherReason}
                onChangeReason={changeReason}
            />
            <div class={`form-group bmd-form-group otherReason ${showOtherReason ? 'showOtherReason' : ''}`}>
                <label class="bmd-label-floating"> Motivo</label>
                <textarea 
                    class="form-control" 
                    rows="5"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                ></textarea>
            </div>

            <button 
                className="btnReportProblem background-blue"
                onClick={onClickReport}
            >Enviar</button>
            <p className={`textMsg ${ msg.value !== '' ? `showMsg ${msg.type === 'success' ? 'textSucess' : 'textError'}` : '' }`}> { msg.value } </p>
        </div>  
    );
};

export default ContentReportProblem;