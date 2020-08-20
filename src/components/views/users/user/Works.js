import React from 'react';
import { Link } from 'react-router-dom';

const Works = ({works}) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header card-header-primary d-flex">
                        <div className="con-md-12">
                            <h4 className="car-title">Lista de tareas</h4>
                        </div>
                    </div>
                    <div className="car-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>ID Estación Base</th>
                                        <th>Fecha Ejecución</th>
                                        <th>Tipo de Trabajo</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { works.map(({work: {_id, status_work, id_base_station, type, execution_date}}, i) => (
                                        <tr key={ _id }>
                                            <td>{ i + 1 }</td>
                                            <td>{ id_base_station }</td>
                                            <td>{ execution_date }</td>
                                            <td>{ type }</td>
                                            <td>{ status_work }</td>
                                        </tr>   
                                    )) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Works;