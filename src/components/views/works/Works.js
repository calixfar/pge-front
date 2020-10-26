import React, { useEffect, useContext } from 'react';
import WorkContext from './context/WorkContext';
import Form from './Form';
import Search from '../../general/Search';
import { Link } from 'react-router-dom';
// import Form from './Form';
const Works = () => {

    const workContext = useContext(WorkContext);
    const { getWorks, works, deleteWork, getWorksBySearch } = workContext;

    const setColorStatus = (status_work) => {
        const casesStatus = ['Sin_revisar', 'Problema', 'Navegacion', 'Inicio_tarea', 'Culminada', 'Vista'];
        switch (status_work) {
            case casesStatus[0]:
                return '#000';
            case casesStatus[1]:
                return '#D9312C';
            case casesStatus[2]:
                return '#2C5ED9';
            case casesStatus[3]:
                return '#EEE309';
            case casesStatus[4]:
                return '#53CF07';
            case casesStatus[5]:
                return '#53CF07';
            default:
                return '#9507CF';
        }
    }

    useEffect(() => {
        getWorks();
    }, [])
    
    return (
        <div className="content">
            <div className="container-fluid">
                <Form/>
                {/* <Form destinyForm="register" getPlaces={ getPlaces }/> */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header background-blue">
                                <div className="row">
                                    <div className="col-md-8">
                                        <h4 className="card-title ">Lista de tareas</h4>
                                    </div>
                                    <Search fetchBySearch={ getWorksBySearch }/>
                                </div>
                            </div>
                            <div className="card-body">
                                { works &&
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="">
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        Responsable
                                                    </th>
                                                    <th>
                                                        Equipo
                                                    </th>
                                                    <th>
                                                        Nombre Sitio
                                                    </th>
                                                    <th>
                                                        Fecha Ejecución
                                                    </th>
                                                    <th>
                                                        Estado
                                                    </th>
                                                    <th>
                                                        Opciones
                                                    </th>
                                                </tr></thead>
                                            <tbody>
                                                {
                                                    works.map(({ _id, responsable, team , place, execution_date, status_work }, index) => {
                                                        if( !responsable ) return null;
                                                        const { name, last_name } = responsable;
                                                        return (
                                                            <tr key={_id}>
                                                                <td>
                                                                    { index + 1}
                                                                </td>
                                                                <td>
                                                                    { name } { last_name }
                                                                </td>
                                                                <td>
                                                                    { team.name } 
                                                                </td>
                                                                <td>
                                                                    { place.name }
                                                                </td>
                                                                <td>
                                                                    { new Date(execution_date).toLocaleString().replace('GMT-0500 (hora estándar de Colombia)', '') }
                                                                </td>
                                                                <td style={{color: setColorStatus(status_work), fontWeight: 'bold'}}>
                                                                    { status_work }
                                                                </td>
                                                                <td className="td-actions text-left">
                                                                    <Link to={`/tarea/${_id}`} type="button" rel="tooltip" title="Editar lugar" className="btn btn-primary btn-link btn-sm">
                                                                        <i className="material-icons">edit</i>
                                                                    </Link>
                                                                    <button 
                                                                        type="button" 
                                                                        rel="tooltip" 
                                                                        title="Eliminar lugar" 
                                                                        className="btn btn-danger btn-link btn-sm"
                                                                        onClick={() => deleteWork(_id)}
                                                                    >
                                                                        <i className="material-icons">close</i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Works;