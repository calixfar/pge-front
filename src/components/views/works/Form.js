import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import DataListInput from "react-datalist-input";
import WorkContext from './context/WorkContext';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { typesStatusWork } from '../../../types/works';

const FormWork = ({ work }) => {

    const workContext = useContext(WorkContext);
    const { getTeams, 
        teams, 
        getPlaces, 
        places, 
        registerWork, 
        updateWork,
        getTypesWork,
        typesWork } = workContext;


    const isInitialWork = work && Object.values(work).length > 0; 
    console.log('isInitialWork', work);

    const initialState = isInitialWork ? work : {
        place: '',
        address: '',
        latitude: '',
        longitude: '',
        team: '',
        responsable: '',
        id_base_station: '',
        execution_date: '',
        type: '',
        priority: '',
        commentary: ''
    };
    const [state, setState] = useState(initialState);
    const [members, setMembers] = useState(null);
    const [permitSearchMembers, setPermitSearchMembers] = useState(true);

    const handleBtnForm = async () => {
        if(!valideVacieState())  {
            Swal.fire({
                title: 'Campos vacíos...',
                text: 'Los campos no pueden estar vacíos',
                icon: 'warning'
            });
            return;
        }
        const copyState = state;
        copyState.execution_date = new Date(state.execution_date);
        if( isInitialWork ) {
            updateWork(copyState);
            return;
        }
        let result = await registerWork(copyState);
        if( result ) setState(initialState);
    }
    const valideVacieState = () => {
        let valide = true;
        let values = Object.values(state);
        let keys = Object.keys(state);
        for(let i in values) {
            if( keys[i] !== 'commentary' && values[i] === '' ) {
                valide = false;
                break;
            }
        }
        return valide;
    }
    const changeState= ({ target : { value, name } }) => setState({
        ...state,
        [name]: value
    });

    const changePlace = ({ key }) => {
        console.log(key);
        const initialInfoPlace = {};
        if( !key  )  initialInfoPlace = {
            address: '',
            longitude: '',
            latitude: '',
            place: ''            
        }
        else {
            const searchPlace = places.find(({_id}) => _id === key);
            if( searchPlace )
            initialInfoPlace.address = searchPlace.address;
            initialInfoPlace.longitude = searchPlace.longitude;
            initialInfoPlace.latitude = searchPlace.latitude;
            initialInfoPlace.place = searchPlace._id;
        }
        setState({
            ...state,
            ...initialInfoPlace
        });
    }
    const changeTeam = (e) => {
        const { target : { value } } = e;
        if( !value ) {
            setMembers(null);
        }
        else {
            console.log('teams', teams);
            const team = teams.find(({_id}) => _id === value);
            console.log('team', team);
            setMembers(team.members.filter(({ user: { type_user } }) => type_user === 'EMPLOYEE') );
        }
        changeState(e);
        
    }
    useEffect(() => {
        getTeams();
        getPlaces();
        getTypesWork();
    }, []);

    useEffect(() => {
        if( permitSearchMembers && isInitialWork && teams.length ) {
            const team = teams.find(({_id}) => _id === work.team);
            setMembers(team.members.filter(({ user: { type_user } }) => type_user === 'EMPLOYEE') );
            setPermitSearchMembers(false);
        }
    })

    const optionsPlaces = useMemo(() => places.map(({_id, name}) => ({
        label: name,
        key: _id
    })), [places]);

    const { 
        place,
        address,
        latitude,
        longitude,
        team,
        responsable,
        id_base_station,
        execution_date,
        type,
        priority,
        commentary } = state;

        const color = isInitialWork ? typesStatusWork[state.status_work].color: '#1b458f';
    return (
        <div className="row">
            <div className={`col-md-12`}>
                <div className="card">
                    <div className="card-header" style={{background: color}}>
                    <div className="row">
                        <div className="col-md-6">
                            <h4 className="card-title">{ 'Registrar tarea' }</h4>
                        </div>
                        {
                            isInitialWork &&
                            <div className="col-md-6 justify-content-center row">
                                <h4 className="card-title">Estado: { typesStatusWork[state.status_work].text }</h4>
                            </div>
                        }
                    </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row mt-2 align-items-center">
                                <div className="col-md-3">
                                    <div className="form-group" style={{marginTop: '-10px'}}>
                                        <label>Nombre Sitio</label>
                                        {/* <select 
                                            className="form-control"
                                            name="place"
                                            onChange={ changePlace }
                                            value={ place }
                                        >
                                            <option value="">Selecciona un lugar</option>
                                            { places.map(({_id, name}) => (
                                                <option key={_id} value={_id}>{ name }</option>
                                            )) }
                                        </select> */}
                                        {
                                            places &&

                                            <DataListInput
                                                placeholder=""
                                                items={optionsPlaces}
                                                inputClassName="selectPlaces"
                                                onSelect={changePlace}
                                                initialValue={isInitialWork ? work.name : ''}
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group mt-40">
                                        <label >Dirección</label>
                                        <input
                                            value={address} 
                                            name="address"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group mt-40">
                                        <label >Latitud</label>
                                        <input
                                            value={latitude} 
                                            name="latitude"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group mt-40">
                                        <label >Longitud</label>
                                        <input
                                            value={longitude} 
                                            name="longitude"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label >Equipo</label>
                                        <select
                                            value={team}
                                            className="form-control"
                                            name="team"
                                            onChange={changeTeam}
                                        >
                                            <option value="">Seleccione una opción</option>
                                            { teams.map(({_id, name}) => (
                                                <option key={ _id } value={ _id }>{ name }</option>
                                            )) }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label >Responsable</label>
                                        <select
                                            value={responsable}
                                            name="responsable"
                                            type="text"
                                            className="form-control"
                                            onChange={changeState}
                                        >
                                            <option value="">{ members ? !members.length ? 'No hay miembros para este equipo' : 'Selecciona un miembro'  : 'Selecciona un Equipo' }</option>
                                            { members !== null && members.map(({user}) => (
                                                <option key={ user._id } value={ user._id }>{ user.name }</option>
                                            )) }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2 align-items-center">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label >Id Estación base</label>
                                        <input
                                            value={id_base_station} 
                                            name="id_base_station"
                                            type="text"
                                            className="form-control"
                                            onChange={changeState}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label >Fecha de Ejecución</label>
                                        <input
                                            value={execution_date} 
                                            name="execution_date"
                                            type="datetime-local"
                                            className="form-control"
                                            onChange={changeState}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group bmd-form-group">
                                        <label className="bmd-label-static">Tipo de tarea</label>
                                        <select
                                            value={type} 
                                            name="type"
                                            type="text"
                                            className="form-control"
                                            onChange={changeState}
                                        >
                                            <option value="">Selecciona una opción</option>
                                            {
                                                typesWork.map(( typeWork ) => (
                                                    <option 
                                                        key={ typeWork._id }
                                                        value={ typeWork._id }
                                                >{ typeWork.type }</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group bmd-form-group">
                                        <label className="bmd-label-static">Prioridad</label>
                                        <select
                                            value={priority} 
                                            name="priority"
                                            type="text"
                                            className="form-control"
                                            onChange={changeState}
                                        >
                                            <option value="">Selecciona la prioridad</option>
                                            <option value="BAJA">BAJA</option>
                                            <option value="MEDIA">MEDIA</option>
                                            <option value="ALTA">ALTA</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <div className="for-group">
                                        <label>Comentario Field Manager</label>
                                        <input 
                                            className="form-control"
                                            name="commentary"
                                            value={ commentary }
                                            onChange={ changeState }
                                        />
                                    </div>
                                </div>
                                {
                                    isInitialWork &&
                                    <div className="col-md-12">
                                        <div className="for-group">
                                            <label>Comentario Lider cuadrilla</label>
                                            <input 
                                                className="form-control"
                                                name="commentary"
                                                value={ isInitialWork ? work.commentaryEmployee : ''  }
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="row d-flex justify-content-center mt-3">
                                <button
                                    type="button"
                                    className="btn pull-right"
                                    onClick={handleBtnForm}
                                    style={{background: color}}
                                >{isInitialWork ? 'ACTUALIZAR' : 'REGISTRAR'}</button>
                                <div className="clearfix" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(FormWork);