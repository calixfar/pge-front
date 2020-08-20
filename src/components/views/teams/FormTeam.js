import React, { useState, useEffect, useContext } from 'react';
import axiosClient from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const FormTeam = ({destinyForm, history, setFieldManager, getFieldManager, getTeams}) => {
    const authContext = useContext(AuthContext);
    const { userAuth } = authContext;
    const initialState = {
        name: '',
        field_manager: null
    };
    const [team, setTeam] = useState({});
    const [usersField, setUsersField] = useState([]);
    const [id, setId] = useState('');


    const changeState = e => {
        if(e.target.name === "field_manager" && e.target.value === "") {
            setTeam({
                ...team,
                field_manager: null
            })
            return;
        }
        setTeam({
            ...team,
            [e.target.name]: e.target.value
        })
    }
    const getTeam = async (idTeam) => {
        try {
            console.log('entro');
            const searchTeam = await axiosClient.get(`/api/v1/team/${idTeam}`);
            console.log('object', searchTeam)
            setFieldManager(searchTeam.data.team.field_manager);
            setTeam(searchTeam.data.team);
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error.response.data.msg
            })
            console.log(error.response);
        }
    }
    const getFieldsManager = async () => {
        try {
            const searchUsersField = await axiosClient.get(`/api/v1/usersField`);
            setUsersField(searchUsersField.data.users);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error.response.data.msg
            })
            console.log(error.response);
        }
    }
    const handleBtnForm = async () => {
        if(name === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'El nombre no puede estar vacío'
              })
              return;
        }
        try {
            if(destinyForm === 'register') {
                await axiosClient.post(`/api/v1/team`, team);
                getTeams();
                setTeam(initialState);
            } else {
                await axiosClient.put(`/api/v1/team/${id}`, team);
            }
            Swal.fire({
                icon: 'success',
                title:  `${destinyForm === 'register' ? 'Registrado' : 'Actualizado'} Exitosamente`,
                text: destinyForm === 'register' ? 'El equipo fue creado' : 'El equipo fue actualizado'
              });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error.response.data.msg
              })
        }
    }
    useEffect(() => {
        console.log(history, 'form');
        userAuth();
        if (destinyForm === 'register') {
            setTeam(initialState);
        } else {
            const { pathname } = history.location;
            const idUrl = pathname.substring(pathname.lastIndexOf('equipo/') + 7, pathname.length);
            setId(idUrl);
            getTeam(idUrl);
            getFieldsManager(team.field_manager);
        }
    }, [id]);
    const { name, field_manager } = team;
    return (
        <div className="row">
            <div className={`col-md-12`}>
                <div className="card">
                    <div className="card-header card-header-success">
                        <h4 className="card-title">{destinyForm === "register" ? 'Registrar Equipo' : 'Actualizar Equipo'} </h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label >Nombre</label>
                                        <input
                                            value={name} name="name"
                                            type="text"
                                            className="form-control"
                                            onChange={changeState}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label >FIELDS MANAGERS</label>
                                        <select
                                            value={ field_manager === null ? '' : field_manager }
                                            className="form-control"
                                            name="field_manager"
                                            onChange={(e) => {
                                                changeState(e);
                                                if(destinyForm !== 'register'){
                                                    getFieldManager(e.target.value !== '' ? e.target.value : null);
                                                }
                                            }}
                                            onClick={getFieldsManager}
                                        >
                                            <option value="">Seleccione una opción</option>
                                            {usersField.map(({ _id, name }) => (
                                                <option key={_id} value={_id}>{name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center mt-3">
                                <button
                                    type="button"
                                    className="btn btn-success pull-right"
                                    onClick={handleBtnForm}
                                >{destinyForm === "register" ? 'REGISTRAR' : 'ACTUALIZAR'}</button>
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