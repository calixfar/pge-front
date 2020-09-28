import React, {useContext, useEffect, useState} from 'react';
import axiosClient  from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormPlace from './FormPlaces';
import Search from '../../general/Search';

const Places = () => {
    const authContext = useContext(AuthContext);
    const {userAuth, usuario} = authContext;

    let type_user;
    if( usuario !== null ) {
        type_user = usuario.type_user; 
    }

    const [places, setPlaces] = useState([]);
    const getPlaces = async () => {
        const searchPlaces = await axiosClient.get('/api/v1/place');
        setPlaces(searchPlaces.data.places);
    }

    const getPlacesBySearch = async (search) => {
        try {
            const res = await axiosClient.get(`/api/v1/place-search/${search}`);
            setPlaces(res.data.places);
        } catch (error) {
            return;
        }
    }

    useEffect( () => {
        getPlaces();
        console.log(places)
        userAuth();
    }, []);
    const handleDeletePlace = async (id) => {
        Swal.fire({
            title: 'Seguro desea realizar esta acción?',
            text: `Deseas eliminar este sitio?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then( async (result) => {
            if (result.value) {
                const deletePlace = await axiosClient.delete(`/api/v1/place/${id}`);
                getPlaces();
                console.log(deletePlace) 
              Swal.fire(
                'Eliminado!',
                'Se elimino con exitó',
                'success'
              )
            }
          })
        
    }
    return(
        <div className="content">
            <div className="container-fluid">
            { usuario !== null && type_user === "ADMIN" ?  
                    <FormPlace destinyForm="register" getPlaces={ getPlaces }/> : ''
            }
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header background-blue">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title ">Lista de lugares</h4>
                                    </div>
                                    <Search fetchBySearch={ getPlacesBySearch } />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="">
                                            <tr>
                                                <th>
                                                    ID
                                                </th>
                                                <th>
                                                    Código Sitio
                                                </th>
                                                <th>
                                                    Nombre
                                                </th>
                                                <th>
                                                    Zona
                                                </th>
                                                <th>
                                                    Propietario
                                                </th>
                                                {
                                                    usuario !== null && type_user === "ADMIN" ? 
                                                    <th>
                                                        Opciones
                                                    </th> : ''
                                                }
                                            </tr></thead>
                                        <tbody>
                                            {
                                                places.map(({ _id, name, zone, code_site, owner }, index) => (
                                                    <tr key={_id}>
                                                        <td>
                                                            { index + 1}
                                                        </td>
                                                        <td>
                                                            { code_site } 
                                                        </td>
                                                        <td>
                                                            { name } 
                                                        </td>
                                                        <td>
                                                            { zone }
                                                        </td>
                                                        <td>
                                                            { owner }
                                                        </td>
                                                        {
                                                            usuario !== null && type_user === "ADMIN" ? 
                                                            <td className="td-actions text-left">
                                                                <Link to={`/lugar/${_id}`} type="button" rel="tooltip" title="Editar lugar" className="btn btn-primary btn-link btn-sm">
                                                                    <i className="material-icons">edit</i>
                                                                </Link>
                                                                <button 
                                                                    type="button" 
                                                                    rel="tooltip" 
                                                                    title="Eliminar lugar" 
                                                                    className="btn btn-danger btn-link btn-sm"
                                                                    onClick={() => handleDeletePlace(_id)}
                                                                >
                                                                    <i className="material-icons">close</i>
                                                                </button>
                                                            </td> : ''
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Places;