import React, { useState, useContext } from 'react';
import './styles/BlankActivity.css';
import Context from '../context/context';
export default () => {
    
    const { createTypeWork } = useContext(Context);
    const [type, setType] = useState('');

    const onClickCreate = () => {
        if( type === '' ) return;
        createTypeWork({ type });
        setType('');
    }

    return (
        <div className="col-lg-6 col-md-12 containerFormNewActivity">
            <div className="containerStandarFormNewActivity">
                <div className="containerIconFormNewActivity">
                    <i class="far fa-flag"></i>
                </div>
                <h4 className="FormNewActivityTitle">Agregar un tipo de tarea</h4>
            </div>
            <div className="contentFormNewActivity">
                <div className="form-group">
                    <label >Tipo de trabajo</label>
                    <input
                        value={type} 
                        name="type"
                        type="text"
                        onChange={ ({target: { value }}) => setType(value) }
                        className="form-control"
                    />
                </div>
                <div className="containerFormNewActivityBtn">
                    <button
                        type="button"
                        className="btn btn-primary pull-center formNewActivityBtn"
                        onClick={onClickCreate}
                    >CREAR</button>
                </div>
            </div>
        </div>
    )
}