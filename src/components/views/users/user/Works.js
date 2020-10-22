import React, { useEffect, useState } from 'react';
import axiosClient from '../../../../config/axios';
import { Link } from 'react-router-dom';

const Works = ({userId}) => {

    const [works, setWorks] = useState(null);

    const fetchWorks = async () => { 
        try {
            const { data } = await axiosClient(`/api/v1/work/user/${userId}`);
            setWorks(data.works);

        } catch (error) {
            return null;   
        }
     }

    useEffect(() => {
        fetchWorks();
    }, []);

    if(works === null) return <></>;
    // return <></>;
    const hasWorks = works.length ? true : false;

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header background-blue d-flex">
                        <div className="con-md-12">
                            <h4 className="card-title">{ hasWorks ? 'Lista de tareas' : 'El usuario no tiene tareas asigndas'}</h4>
                        </div>
                    </div>
                    {
                        hasWorks && <div className="car-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>ID Estación Base</th>
                                            <th>Fecha Ejecución</th>
                                            <th>Tipo de Trabajo</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { works.map(({_id, status_work, id_base_station, type, execution_date}, i) => (
                                            <tr key={ _id }>
                                                <td>{ i + 1 }</td>
                                                <td>{ id_base_station }</td>
                                                <td>{ execution_date }</td>
                                                <td>{ type.type }</td>
                                                <td>{ status_work }</td>
                                            </tr>   
                                        )) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Works;