import React, {useState, useEffect, useContext} from 'react';
import axiosClient  from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import Swal from 'sweetalert2';

const RegisterUser = () => {
    const authContext = useContext(AuthContext);
    const { userAuth } = authContext;
    const initialState = {
        name: '',
        last_name: '',
        password: '',
        email: '',
        type_user: '',
        phone: '',
        team_id: ''
    };
    const [user, setUser] = useState(initialState);
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
        userAuth();
        getTeams();
    }, []);
    const handleBtnCreate = async (e) => {
        e.preventDefault();
        if(name === "" || last_name === "" ||  phone === "" ||  
        type_user === "" ||  password === "" ||  email === "" ||
        team_id === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Por favor completa todos los campos'
              })
        }
        try {
            await axiosClient.post(`/api/v1/user`, user);
            Swal.fire({
                icon: 'success',
                title: 'Creado exitosamente...',
                text: 'El usuario fue creado'
              });
              setUser(initialState);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error.response.data.msg
              })
            console.log(error.response);
        }
    }
    const changeShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const { name, last_name, phone, type_user, password, email, team_id } = user;
    return(
        <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Crear Usuario </h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row mt-2">
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
                                    <div className="row mt-2">
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
                                                        name={"password"}
                                                        type={showPassword ? 'text': 'password'}
                                                        className="form-control" 
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
                                                    <option value="">Seleccione una opción</option>
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
                                        className="btn btn-primary pull-right"
                                        onClick={handleBtnCreate}
                                    >Crear</button>
                                    <div className="clearfix" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default RegisterUser;