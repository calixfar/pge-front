import React from 'react';
import { Link } from 'react-router-dom';

const Members = ({ users }) => {

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header background-blue d-flex">
                        <div className="col-md-8">
                            <h4 className="card-title ">Integrantes</h4>
                        </div>
                        <div className="col-md-4">
                            {/* <div className="input-group">
                                        <input type="text" value={nameFilter} onChange={updateNameFilter} class="form-control color-white" placeholder="Buscar Usuario"/>
                                        <button onClick={ updatePermitSearch } type="button" class="btn btn-white btn-round btn-just-icon">
                                            <i class="material-icons">search</i>
                                            <div class="ripple-container"></div>
                                        </button>    
                                    </div> */}
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
                                        users.map(({ user: { _id, name, last_name, phone, type_user } }, index) => (
                                            <tr key={_id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {name} {last_name}
                                                </td>
                                                <td>
                                                    Niger
                                                        </td>
                                                <td>
                                                    {type_user}
                                                </td>
                                                <td>
                                                    {phone}
                                                </td>
                                                <td className="td-actions text-left">
                                                    <Link to={`/usuario/${_id}`} type="button" rel="tooltip" title="Editar usuario" className="btn btn-success btn-link btn-sm">
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
    )
}

export default Members;