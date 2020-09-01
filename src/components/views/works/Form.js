import React, { useState, useEffect, useContext } from 'react';
import WorkContext from './context/WorkContext';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const FormTeam = ({  }) => {
    const workContext = useContext(WorkContext);
    const { getTeams, teams, getPlaces, places, registerWork } = workContext;
    const initialState = {
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

    const handleBtnForm = () => {
        if(!valideVacieState())  {
            Swal.fire({
                title: 'Campos vacíos...',
                text: 'Los campos no pueden estar vacíos',
                icon: 'warning'
            });
            return;
        }
        const copyState = state;
        console.log(state.execution_date);
        copyState.execution_date = new Date(state.execution_date);
        console.log(copyState);
        registerWork(copyState);
        setState(initialState);
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

    const changePlace = ({target: { value }}) => {
        const initialInfoPlace = {};
        if( !value )  initialInfoPlace = {
            address: '',
            longitude: '',
            latitude: '',
            place: ''            
        }
        else {
            const searchPlace = places.find(({_id}) => _id === value);
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
            const team = teams.find(({_id}) => _id === value);
            setMembers(team.members.filter(({ user: { type_user } }) => type_user === 'EMPLOYEE') );
        }
        changeState(e);
        
    }
    useEffect(() => {
        getTeams();
        getPlaces();
    }, []);

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
    return (
        <div className="row">
            <div className={`col-md-12`}>
                <div className="card">
                    <div className="card-header card-header-success">
                    <h4 className="card-title">{ 'Registrar tarea' }</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row mt-2 align-items-center">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Nombre Sitio</label>
                                        <select 
                                            className="form-control"
                                            name="place"
                                            onChange={ changePlace }
                                            value={ place }
                                        >
                                            <option value="">Selecciona un lugar</option>
                                            { places.map(({_id, name}) => (
                                                <option key={_id} value={_id}>{ name }</option>
                                            )) }
                                        </select>
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
                                            <option value="implementacion">Implementación</option>
                                            <option value="integracion">Integración</option>
                                            <option value="toma_documentacion">Toma Documentación</option>
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
                                        <label>Comentarios</label>
                                        <input 
                                            className="form-control"
                                            name="commentary"
                                            value={ commentary }
                                            onChange={ changeState }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center mt-3">
                                <button
                                    type="button"
                                    className="btn btn-success pull-right"
                                    onClick={handleBtnForm}
                                >REGISTRAR</button>
                                <div className="clearfix" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(FormTeam);