import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../config/axios';
import FormTeam from './FormTeam';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import Members from './Members';

const TeamUpdate = ({ history }) => {

    const [fieldManager, setFieldManager] = useState(null);
    const [dataFieldManager, setDataFieldManager] = useState({});
    const [showField, setShowField] = useState(true);

    const [team, setTeam] = useState(null);

    const getFieldManager = async (id) => {
        try {
            if (id === null) {
                setFieldManager(null);
                setShowField(false);

                return;
            }
            const searchUser = await axiosClient.get(`/api/v1/user/${id}`);
            console.log(searchUser);
            setFieldManager(searchUser.data.user);
            setShowField(true);
        } catch (error) {
            console.log(error.data);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error...',
            //     text: error.response.data.msg
            // })
        }
    }

    const getTeam = async (idTeam) => {
        try {
            console.log('entro');
            const searchTeam = await axiosClient.get(`/api/v1/team/${idTeam}`);
            console.log('object', searchTeam)
            setTeam(searchTeam.data.team);
            setFieldManager(searchTeam.data.team.field_manager);
        } catch (error) {
            console.log(error)
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error...',
            //     text: error.response.data.msg
            // })
            console.log(error.response);
        }
    }

    useEffect( () => {
        const { pathname } = history.location;
            const idUrl = pathname.substring(pathname.lastIndexOf('equipo/') + 7, pathname.length);
            getTeam(idUrl);
    }, []);
    // const showField = fieldManager === null ? false : true

    if( !team ) return <></>;
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-md-${showField  ? '8' : '12'}`}>
                        <FormTeam
                            setFieldManager={setFieldManager}
                            destinyForm="update"
                            getFieldManager={getFieldManager}
                            dataTeam={team}
                        />
                    </div>

                    {
                        showField && fieldManager &&
                        <div className="col-md-4">
                            <div style={{height: '84%'}} className="card card-profile">
                                <div className="card-avatar">
                                    <div className="icon-name">
                                        { fieldManager.name.substr(0,1).toUpperCase() }
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h6 className="card-category text-gray">FIELD MANAGER</h6>
                                    <h4 
                                        className="card-title background-blue"
                                        style={{}}
                                    >{fieldManager.name} {fieldManager.last_name}</h4>
                                    <p className="card-description">
                                        Celular: {fieldManager.phone}
                                    </p>
                                    <Link to={`/usuario/${fieldManager._id}`} className="btn background-blue btn-round">VER</Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <Members users={team.members}/>
            </div>
        </div>
    )
}

export default withRouter(TeamUpdate);