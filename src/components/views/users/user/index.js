import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../../config/axios';
import AuthContext from '../../../../context/auth/authContext';
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2';
import Works from './Works';

const User = ({ history }) => {

    const authContext = useContext(AuthContext);
    const { userAuth } = authContext;
    const [user, setUser] = useState({});
    const [id, setId] = useState('');
    const [teams, setTeams] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const changeState = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const getTeams = async () => {
        try {
            const searchTeams = await axiosClient.get('/api/v1/team');
            setTeams(searchTeams.data.teams);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error.response.data.msg
              })
            console.log(error.response);
        }
    }
    useEffect(() => {
        console.log(history)
        const { pathname } = history.location;
        setId(pathname.substring(pathname.lastIndexOf('usuario/') + 8, pathname.length));
        console.log(id);
        const getUser = async (req, res) => {
            const searchUser = await axiosClient.get(`/api/v1/user/${pathname.substring(pathname.lastIndexOf('usuario/') + 8, pathname.length)}`);
            setUser(searchUser.data.user);
        }
        getUser();
        getTeams();
        userAuth();
    }, []);
    const handleBtnUpdate = async (e) => {
        e.preventDefault();
        const updateUser = await axiosClient.put(`/api/v1/user/${id}`, user);
        history.push('/usuarios');
        console.log(updateUser);
    }
    const changeShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const { name, last_name, phone, type_user, password, email, team_id } = user;
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header background-blue">
                                <h4 className="card-title">Editar Perfil de { name } {last_name} </h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Nombres</label>
                                                <input 
                                                    value={name} name="name" 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={changeState}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Apellidos</label>
                                                <input 
                                                    value={last_name} name="last_name" 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={changeState}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label >Email</label>
                                                <input 
                                                    value={email} name="email" 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={changeState}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label >Password</label>
                                                <div className="d-flex">
                                                    <input 
                                                        value={password} 
                                                        type={showPassword ? 'text': 'password'}
                                                        className="form-control"
                                                        name={"password"}
                                                        onChange={changeState}
                                                    />
                                                    <i 
                                                        className="material-icons"
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: '#ccc',
                                                            position: 'relative',
                                                            left: '-15px',
                                                            top: '2px'
                                                        }}
                                                        onClick={changeShowPassword}
                                                        >remove_red_eye</i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Teléfono</label>
                                                <input 
                                                    value={phone} 
                                                    name="phone" 
                                                    type="text" 
                                                    className="form-control" 
                                                    onChange={changeState}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Tipo de Usuario</label>
                                                <select 
                                                    value={type_user} 
                                                    className="form-control" 
                                                    name="type_user"
                                                    onChange={changeState}
                                                >
                                                    <option value="ADMIN">ADMIN</option>
                                                    <option value="FIELD_MANAGER">FIELD MANAGER</option>
                                                    <option value="EMPLOYEE">LIDER / TRANSPORTADOR</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Equipo</label>
                                                <select 
                                                    value={team_id} 
                                                    className="form-control" 
                                                    name="team_id"
                                                    onChange={changeState}
                                                    onClick={getTeams}
                                                >
                                                    <option value="">Seleccione una opción</option>
                                                    { teams.map(({_id, name}) => (
                                                        <option key={_id} value={_id}>{ name }</option>
                                                    )) }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        type="button" 
                                        className="btn background-blue pull-right"
                                        onClick={handleBtnUpdate}
                                    >Actualizar</button>
                                    <div className="clearfix" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                { user.type_user === 'EMPLOYEE' && <Works works={ user.works }/>} 
            </div>
        </div>

    )
}

export default withRouter(User);