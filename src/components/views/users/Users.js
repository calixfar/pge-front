import React, {useContext, useEffect, useState} from 'react';
import axiosClient  from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import RegisterUser from './RegisterUser';
const Users = () => {

    const authContext = useContext(AuthContext);
    const {userAuth} = authContext;
    const [users, setUsers] = useState([]);
    const getUsers = async (req, res) => {
        const searchUsers = await axiosClient.get('/api/v1/user');
        setUsers(searchUsers.data.users);
    }
    useEffect( () => {
        getUsers();
        console.log(users)
        userAuth();
    }, []);
    const handleDeleteUser = async (id, name) => {
        Swal.fire({
            title: 'Seguro desea realizar esta acción?',
            text: `Deseas eliminar a ${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si'
          }).then( async (result) => {
            if (result.value) {
                const deleteUser = await axiosClient.delete(`/api/v1/user/${id}`);
                getUsers();
                console.log(deleteUser) 
              Swal.fire(
                'Eliminado!',
                'Se elimino con exitó',
                'success'
              )
            }
          })
        
    }
    return (
        <div className="content">
            <div className="container-fluid">
                <RegisterUser/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title ">Lista de usuarios</h4>
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
                                                    Equipo
                                                </th>
                                                <th>
                                                    Tipo
                                                </th>
                                                <th>
                                                    Teléfono
                                                </th>
                                                <th>
                                                    Opciones
                                                </th>
                                            </tr></thead>
                                        <tbody>
                                            {
                                                users.map(({ _id, name, last_name, phone, type_user }, index) => (
                                                    <tr key={_id}>
                                                        <td>
                                                            { index + 1}
                                                        </td>
                                                        <td>
                                                            { name } { last_name }
                                                        </td>
                                                        <td>
                                                            Niger
                                                        </td>
                                                        <td>
                                                            { type_user }
                                                        </td>
                                                        <td>
                                                            { phone }
                                                        </td>
                                                        <td className="td-actions text-left">
                                                            <Link to={`/usuario/${_id}`} type="button" rel="tooltip" title="Editar usuario" className="btn btn-primary btn-link btn-sm">
                                                                <i className="material-icons">edit</i>
                                                            </Link>
                                                            <button 
                                                                type="button" 
                                                                rel="tooltip" 
                                                                title="Eliminar usuario" 
                                                                className="btn btn-danger btn-link btn-sm"
                                                                onClick={() => handleDeleteUser(_id, name)}
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

export default Users;