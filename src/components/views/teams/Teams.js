<<<<<<< HEAD
import React, { useEffect, useContext, useState } from 'react';
import axiosClient from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import { Link } from 'react-router-dom';
import FormTeam from './FormTeam';
import Swal from 'sweetalert2';

const Teams = () => {
    const authContext = useContext(AuthContext);
    const { userAuth, usuario } = authContext; 
    let type_user;
    if( usuario !== null ) {
        type_user = usuario.type_user; 
    }
    const [teams, setTeams] = useState([]);
    const getTeams = async () => {
        const searchTeams = await axiosClient.get('/api/v1/team');
        setTeams(searchTeams.data.teams);
    }
    useEffect(() => {
        getTeams();
        userAuth();
    }, []);
    return (
        <div className="content">
            <div className="container-fluid">
                { usuario !== null && type_user === "ADMIN" ?
                    <FormTeam getTeams={getTeams} destinyForm="register"/> : ''  
                }
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-success">
                                <h4 className="card-title ">Lista de equipos</h4>
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
                                                    Nombre
                                                </th>
                                                <th>
                                                    Field Manager
                                                </th>
                                                <th>
                                                    Cantidad miembros
                                                </th>
                                                <th>
                                                    Opciones
                                                </th>
                                            </tr></thead>
                                        <tbody>
                                            {
                                                teams.map(({ _id, name, field_manager, members }, index) => (
                                                    <tr key={_id}>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {name} 
                                                        </td>
                                                        <td>
                                                            {field_manager !== null ? field_manager.name : 'No registrado'}
                                                        </td>
                                                        <td>
                                                            {members.length}
                                                        </td>
                                                        <td className="td-actions text-left">
                                                            <Link to={`/equipo/${_id}`} type="button" rel="tooltip" title="Editar usuario" className="btn btn-primary btn-link btn-sm">
                                                                <i className="material-icons">edit</i>
                                                            </Link>
                                                            {/* <button
                                                                type="button"
                                                                rel="tooltip"
                                                                title="Eliminar usuario"
                                                                className="btn btn-danger btn-link btn-sm"
                                                                onClick={() => handleDeleteUser(_id, name)}
                                                            >
                                                                <i className="material-icons">close</i>
                                                            </button> */}
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

=======
import React, { useEffect, useContext, useState } from 'react';
import axiosClient from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import { Link } from 'react-router-dom';
import FormTeam from './FormTeam';
import Swal from 'sweetalert2';

const Teams = () => {
    const authContext = useContext(AuthContext);
    const { userAuth } = authContext;
    const [teams, setTeams] = useState([]);
    const getTeams = async () => {
        const searchTeams = await axiosClient.get('/api/v1/team');
        console.log(searchTeams)
        setTeams(searchTeams.data.teams);
    }
    useEffect(() => {
        getTeams();
        userAuth();
    }, []);
    return (
        <div className="content">
            <div className="container-fluid">
                <FormTeam getTeams={getTeams} destinyForm="register"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-success">
                                <h4 className="card-title ">Lista de equipos</h4>
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
                                                    Nombre
                                                </th>
                                                <th>
                                                    Field Manager
                                                </th>
                                                <th>
                                                    Cantidad miembros
                                                </th>
                                                <th>
                                                    Opciones
                                                </th>
                                            </tr></thead>
                                        <tbody>
                                            {
                                                teams.map(({ _id, name, field_manager, members }, index) => (
                                                    <tr key={_id}>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {name} 
                                                        </td>
                                                        <td>
                                                            {field_manager !== null ? field_manager.name : 'No registrado'}
                                                        </td>
                                                        <td>
                                                            {members.length}
                                                        </td>
                                                        <td className="td-actions text-left">
                                                            <Link to={`/equipo/${_id}`} type="button" rel="tooltip" title="Editar usuario" className="btn btn-primary btn-link btn-sm">
                                                                <i className="material-icons">edit</i>
                                                            </Link>
                                                            {/* <button
                                                                type="button"
                                                                rel="tooltip"
                                                                title="Eliminar usuario"
                                                                className="btn btn-danger btn-link btn-sm"
                                                                onClick={() => handleDeleteUser(_id, name)}
                                                            >
                                                                <i className="material-icons">close</i>
                                                            </button> */}
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

>>>>>>> 96bda403bd0744c487407eb683fc5a3d26245378
export default Teams;