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
    const [nameFilter, setNameFilter] = useState('');
    const [permitSearch, setPermitSearch] = useState(true);
    
    const getUsers = async () => {
        let searchUsers = [];
        if(nameFilter) {
            const filter = {filter: {name: nameFilter}};
            console.log('dasd', filter);
            searchUsers = await axiosClient.get(`/api/v1/user/filter/${nameFilter}`);
        }
        else {
            console.log('dasd- no')
            searchUsers = await axiosClient.get('/api/v1/user');
        }
        console.log(searchUsers);
        setUsers(searchUsers.data.users);
    }
    const updateNameFilter = ({target}) => {
        const { value } = target;
        setNameFilter(value);
        if(!value) updatePermitSearch();
    }

    const  updatePermitSearch = () => setPermitSearch(true);
    useEffect( () => {
        if(permitSearch) {
            getUsers();
            setPermitSearch(false);
        }
        userAuth();
    }, [permitSearch]);
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
                            <div className="card-header background-blue d-flex">
                                <div className="col-md-8">
                                    <h4 className="card-title ">Lista de usuarios</h4>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group">
                                        <input type="text" value={nameFilter} onChange={updateNameFilter} class="form-control color-white" placeholder="Buscar Usuario"/>
                                        <button onClick={ updatePermitSearch } type="button" class="btn btn-white btn-round btn-just-icon">
                                            <i class="material-icons">search</i>
                                            <div class="ripple-container"></div>
                                        </button>    
                                    </div>
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
                                                            <Link to={`/usuario/${_id}`} type="button" rel="tooltip" title="Editar usuario" className="btn btn-success btn-link btn-sm">
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