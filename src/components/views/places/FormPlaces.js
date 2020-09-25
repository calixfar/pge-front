import React, {useState, useEffect, useContext, useRef } from 'react';
import axiosClient  from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import  XLSX  from 'xlsx';

const FormPlace = ({ destinyForm, history, getPlaces }) => {
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
        longitude: '',
        type_station: '',

    };

    const inputFileRef = useRef('') ;

    const [place, setPlace] = useState([]);
    const [file, setFile] = useState('');
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

    const validePropertyNamesExcel = (data) => {
        const propertyNames = ['code_site', 'name', 'address', 'city', 'department', 'structure', 'owner', 'latitude', 'longitude', 'type_station'];
        let inValide = false;
        for(let j in data) {
            const excelPropertyNames = Object.keys(data[j]);
            for(let i in propertyNames) {
                if(!excelPropertyNames.find(properyName => properyName === propertyNames[i])) {
                    let line =  parseInt(j) + 2;
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: `El archivo excel no cumple con los requisitos básicos, revisa la linea ${line}`
                      });
                    inValide = true;
                    break;
                }
            }
        }
        return inValide;

    }
    const valideCode = (code, tempPlaces) => {
        let valide = true;
        if(tempPlaces.length > 0) {
            for(let i in tempPlaces) {
                if(tempPlaces[i].code_site === code) {
                    valide = false;
                    break;
                }
            }
        }
        return valide;
    }
    const validateAllCodes = (places) => {
        let tempPlaces = [];
        let lineErrors = [];
        for(let i in places) {
            if(valideCode(places[i].code_site, tempPlaces)) {
                tempPlaces.push(places[i]);
            } else {
                let line = parseInt(i) + 2;
                lineErrors.push(line);
            }
        }
        let inValide = lineErrors.length > 0 ? true : false;

        if( inValide ) {
            let msg = `Los códigos de sitio de las siguientes líneas están repetidos en el archivo: ${lineErrors.toString()}`
            showSwalError(msg);
        }
        return  inValide;
    }

    const showSwalError = (msg) => {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: msg
          })
    }
    const sendMultiplePlace = async (places) => {
        try {
            const res = await axiosClient.post('/api/v1/places', places);
            Swal.fire({
                icon: 'success',
                title: 'Proceso éxitoso',
                text: res.data.msg
            });
            getPlaces();
        } catch (error) {
            showSwalError(error.response.data.msg)
        }
    }   
    const sendExcelFile = async () => {
        if(file === '') {

            showSwalError("Por favor carga un archivo");
            return;
        }
        // let sheet = XLSX.read(file, {type: 'array'});
        // const nameSheet = sheet.SheetNames[0];
        // let sheetJson = XLSX.utils.sheet_to_json(sheet.Sheets[nameSheet]);
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            console.log('entro reader')
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const places = XLSX.utils.sheet_to_json(ws);
            console.log('places', places);
            if( !places.length ) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'El archivo excel está vacio'
                  });
                  return;
            }
            if( validePropertyNamesExcel(places) ) return;
            if(validateAllCodes(places)) return;
            
            sendMultiplePlace(places);
            
        }
        reader.readAsBinaryString(file);
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
        longitude ==="", type_station === "") {
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
                // setPlace(initialState);
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
        longitude,
        type_station } = place;

    return (
        <div className="row">
            <div className="col-lg-12 col-md-12">
                <div className="card">
                    <div className="card-header card-header-tabs background-blue">
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
                                                            value={longitude}
                                                            name={"longitude"}
                                                            type={ 'text'}
                                                            className="form-control"
                                                            onChange={changeState}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group bmd-form-group">
                                                    <label className="bmd-label-static">Tipo Estación</label>
                                                    <select
                                                        value={type_station}
                                                        name="type_station"
                                                        type="text"
                                                        className="form-control"
                                                        onChange={changeState}
                                                    >
                                                        <option value="">Selecciona una opción</option>
                                                        <option value="Cosite">Cosite</option>
                                                        <option value="Propio">Propio</option>
                                                        <option value="Administrativo">Administrativo</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn background-blue pull-right"
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
                                                    ref={ inputFileRef }
                                                    onChange={(e) => {
                                                        setFile(e.target.files[0]);
                                                    }}
                                                />
                                            </div>
                                        </form>
                                   </div>
                                   <div className="col-md-4">
                                   <button
                                            type="button"
                                            className="btn background-blue pull-right"
                                            onClick={ sendExcelFile }
                                        >SUBIR</button>
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