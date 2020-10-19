import React from 'react';
import './styles.css';
export default () => {
    const actions = [
        {
            id: '0011',
            value: 'Navegacion',
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
            value: 'Culminada',
            iconClass: 'far fa-thumbs-up',
            color: 'linear-gradient(60deg, #66bb6a, #43a047)',
            valueBack: true
        },
        {
            id: '0014',
            value: 'Problema',
            iconClass: 'far fa-thumbs-down',
            color: 'linear-gradient(60deg, #ef5350, #e53935)',
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
                            className="btnAction"
                        >
                            <i className={`${iconClass}`}></i>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}