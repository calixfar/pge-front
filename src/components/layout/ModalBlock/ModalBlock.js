import React, { useState, useEffect } from 'react';
import './styles.css';

const ModalBlock = () => {
    const initialState = {
        show: true,
        timer: 5
    }
    const [state, setstate] = useState(initialState);

    const { show, timer } = state;

    const textBtn = timer === 0 ? 'CERRAR' : `Podrá cerrar este aviso en ${timer}`;

    const onClick = () => {
        if(timer !== 0) return;

        setstate({
            ...state,
            show: false
        });
    }

    useEffect(() => {
        if( timer === 0 ) return;
        const interval = setInterval(() => {
            setstate({
                ...state,
                timer: timer - 1
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <>
            <div className={`containerModalBlock background-blue ${show ? 'show' : '' }`}>
                <h3 className="containerModalBlockTitle">Por favor, revise sus facturas</h3>
                <div className="contentModalBlock">
                    <p className="containerModalBlockText">La plataforma entrará en mantenimiento, comunícate con el equipo de software</p>
                    <button
                        className='containerModalBlockBtn btn background-blue'
                        onClick={ onClick }
                    >{ textBtn }</button>
                </div>
            </div>        
            <div className={`overlay ${show ? 'show' : '' }`}></div>
        </>
    );
}

export default ModalBlock;