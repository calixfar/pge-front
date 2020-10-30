import React, { useEffect, useContext } from 'react';
import WorkContext from './context/WorkContext';
import Form from './Form';
import Search from '../../general/Search';
import { Link } from 'react-router-dom';
import { typesStatusWork, typesWork } from '../../../types/works';
// import Form from './Form';
const Works = () => {

    const workContext = useContext(WorkContext);
    const { getWorks, works, deleteWork, getWorksBySearch } = workContext;

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
                                                        Tipo
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
                                                    works.map(({ _id, responsable, team , place, execution_date, status_work, type }, index) => {
                                                        if( !responsable || !place ) return null;
                                                        const { name, last_name } = responsable;
                                                        const typeWork = {
                                                            text: type.type ? typesWork[type.type] ? typesWork[type.type].text : type.type : '--',
                                                            color: type.type && typesWork[type.type] ? typesWork[type.type].color : 'gray'
                                                        }
                                                        // console.log('object', type);
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
                                                                
                                                                <td style={{color: typeWork.color , fontWeight: 'bold'}}>
                                                                    { typeWork.text}
                                                                </td>
                                                                <td style={{color: typesStatusWork[status_work].color, fontWeight: 'bold'}}>
                                                                    { typesStatusWork[status_work].text }
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