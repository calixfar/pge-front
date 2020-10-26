import React from 'react';
import './styles.css';
import { typesStatusWork } from '../../../../../../types/works';
export default ({
    onClickActionUser
}) => {
    const actions = [
        {
            id: '0011',
            value: typesStatusWork.Navegacion.value,
            iconClass: 'fab fa-telegram-plane',
            color: 'linear-gradient(60deg, #26c6da, #00acc1)',
            valueBack: true
        },
        {
            id: '0012',
            value: 'Editar',
            iconClass: 'far fa-edit',
            color: 'linear-gradient(60deg, #ffa726, #fb8c00)',
            valueBack: false
        },
        {
            id: '0013',
            value: typesStatusWork.Inicio_tarea.value,
            iconClass: 'fas fa-play',
            color: 'rgb(238, 227, 9)',
            valueBack: true
        },
        {
            id: '0014',
            value: 'Reason',
            iconClass: 'far fa-thumbs-down',
            color: 'linear-gradient(60deg, #ef5350, #e53935)',
            valueBack: true
        },
        {
            id: '0015',
            value: typesStatusWork.Pendiente.value,
            iconClass: 'far fa-thumbs-up',
            color: 'linear-gradient(60deg, #66bb6a, #43a047)',
            valueBack: true
        }
    ]
    return (
        <div className="containerActionsUser">
            <div className="contentActionsUser">
                {
                    actions.map(({id, value, iconClass, color}) => (
                        <button 
                            key={id} 
                            style={{background: color}}
                            className={ `btnAction ${ value === typesStatusWork.Pendiente.value ? 'btnSendWork' : '' }` }
                            onClick={ () => onClickActionUser(value) }
                        >
                            <i className={`${iconClass}`}></i>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}