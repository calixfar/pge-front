import React, {useContext, useEffect, useState} from 'react';
import axiosClient  from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormPlace from './FormPlaces';

const Places = () => {
    const authContext = useContext(AuthContext);
    const {userAuth} = authContext;
    const [places, setPlaces] = useState([]);
    const getPlaces = async (req, res) => {
        const searchPlaces = await axiosClient.get('/api/v1/place');
        setPlaces(searchPlaces.data.places);
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
                <FormPlace destinyForm="register"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title ">Lista de lugares</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className=" text-primary">
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
                                                    Ciudad
                                                </th>
                                                <th>
                                                    Propietario
                                                </th>
                                                <th>
                                                    Opciones
                                                </th>
                                            </tr></thead>
                                        <tbody>
                                            {
                                                places.map(({ _id, name, city, code_site, owner }, index) => (
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
                                                            { city }
                                                        </td>
                                                        <td>
                                                            { owner }
                                                        </td>
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
                                                        </td>
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