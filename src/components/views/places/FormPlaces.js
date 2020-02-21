import React, {useState, useEffect, useContext} from 'react';
import axiosClient  from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const FormPlace = ({ destinyForm, history }) => {
    const authContext = useContext(AuthContext);
    const { userAuth } = authContext;
    const [id, setId] = useState('');

    const initialState = {
        name: '',
        code_site: '',
        city: '',
        address: '',
        deparment: '',
        structure: '',
        owner: '',
        structure: '',
        latitude: '',
        length: '',
        type_station: '',

    };
    const [place, setPlace] = useState([]);
    const [file, setFile] = useState(null);
    const changeState = e => {
        setPlace({
            ...place,
            [e.target.name]: e.target.value
        })
    }

    const getPlace = async (id) => {
        try {
            const searchPlace = await axiosClient.get(`/api/v1/place/${id}`);
            setPlace(searchPlace.data.place);
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
        const { pathname } = history.location;
        const idUrl = pathname.substring(pathname.lastIndexOf('lugar/') + 6, pathname.length);
        setId(idUrl);
        if(destinyForm !== 'register') {
            getPlace(idUrl);
        } else {
            setPlace(initialState);
        }
    }, []);
    const handleBtnCreate = async (e) => {
        e.preventDefault();
        if(name === "" || code_site === "" ||  address === "" ||  
        city === "" ||  structure === "" ||
        deparment === "" || owner === "" || latitude === "" ||
        length==="", type_station === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Por favor completa todos los campos'
              })
              return;
        }
        try {
            if(destinyForm === 'register') {
                await axiosClient.post(`/api/v1/place`, place);
                setPlace(initialState);
            } else {
                await axiosClient.put(`/api/v1/place/${id}`, place);
            }
            Swal.fire({
                icon: 'success',
                title: 'Creado exitosamente...',
                text: `El lugar fue ${destinyForm === 'register' ? 'creado' : 'actualizado'}`
              });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error.response.data.msg
              })
            console.log(error.response);
        }
    }
    const { name,
        code_site,
        address,
        city,
        structure,
        deparment,
        owner,
        latitude,
        length,
        type_station } = place;

    return (
        <div className="row">
            <div className="col-lg-12 col-md-12">
                <div className="card">
                    <div className="card-header card-header-tabs card-header-primary">
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                                <span className="nav-tabs-title">Registro</span>
                                <ul className="nav nav-tabs" data-tabs="tabs">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#profile" data-toggle="tab">
                                            <i className="material-icons">cloud</i> Individual
                                            <div className="ripple-container" />
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#settings" data-toggle="tab">
                                            <i className="material-icons">cloud</i> Masivo
                                            <div className="ripple-container" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="tab-content">
                            <div className="tab-pane active" id="profile">
                                <div className="card-body">
                                    <form>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Código Sitio</label>
                                                    <input
                                                        value={code_site} name="code_site"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={changeState}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
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
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label >Departamento</label>
                                                    <input
                                                        value={deparment} name="deparment"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={changeState}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label >Ciudad</label>
                                                    <div className="d-flex">
                                                        <input
                                                            value={city}
                                                            name={"city"}
                                                            type={ 'text'}
                                                            className="form-control"
                                                            onChange={changeState}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Dirección</label>
                                                    <input
                                                        value={address}
                                                        name="address"
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
                                                    <label >Estructura</label>
                                                    <div className="d-flex">
                                                        <input
                                                            value={structure}
                                                            name={"structure"}
                                                            type={ 'text'}
                                                            className="form-control"
                                                            onChange={changeState}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Propietario</label>
                                                    <div className="d-flex">
                                                        <input
                                                            value={owner}
                                                            name={"owner"}
                                                            type={ 'text'}
                                                            className="form-control"
                                                            onChange={changeState}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label >Latitud</label>
                                                    <input
                                                        value={latitude} name="latitude"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={changeState}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label >Longitud</label>
                                                    <div className="d-flex">
                                                        <input
                                                            value={length}
                                                            name={"length"}
                                                            type={ 'text'}
                                                            className="form-control"
                                                            onChange={changeState}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Tipo Estación</label>
                                                    <input
                                                        value={type_station}
                                                        name="type_station"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={changeState}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary pull-right"
                                            onClick={handleBtnCreate}
                                        >{ destinyForm === 'register' ? 'CREAR' : 'ACTUALIZAR' }</button>
                                        <div className="clearfix" />
                                    </form>
                                </div>
                            </div>
                            
                            <div className="tab-pane" id="settings">
                               <div className="row">
                                   <div className="col-md-8">

                                        <form>
                                            <div className="group-control">
                                                <label>Sube tu archivo excel</label>
                                                <input 
                                                    type="file" 
                                                    name="file"
                                                    onChange={(e) => {
                                                        setFile(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </form>
                                   </div>
                                   <div className="col-md-4">
                                   <button
                                            type="button"
                                            className="btn btn-primary pull-right"
                                            onClick={async () => {
                                                if(file === null) {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Error...',
                                                        text: "Por favor carga un archivo"
                                                      })
                                                      return;
                                                }
                                                const sendFile = await axiosClient.post('/api/v1/place/file', file);
                                            }}
                                        >ENVIAR</button>
                                   </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(FormPlace);