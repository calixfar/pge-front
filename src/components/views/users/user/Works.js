import React, { useState } from 'react';
import axiosClient from '../../../../config/axios';
import { Link } from 'react-router-dom';
import Search from '../../../general/Search';
const Works = ({userId}) => {

    const [works, setWorks] = useState(null);

    const getWorksBySearch = async (search) => { 
        try {
            const { data } = await axiosClient(`/api/v1/work-search/${search}/user/${userId}`);
            console.log('data', data, search);
            setWorks(data.works);

        } catch (error) {
            return null;   
        }
     }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header background-blue d-flex">
                        <div className="col-md-8">
                            <h4 className="card-title">Lista de tareas</h4>
                        </div>
                        <Search 
                            fetchBySearch={ getWorksBySearch }
                            placeholder="Buscar por lugar"
                        />
                    </div>
                    {
                        works && <div className="car-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Lugar</th>
                                            <th>Fecha Ejecución</th>
                                            <th>Tipo de Trabajo</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { works.map(({_id, status_work, place, type, execution_date}, i) => (
                                            <tr key={ _id }>
                                                <td>{ i + 1 }</td>
                                                <td>{ place.name }</td>
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