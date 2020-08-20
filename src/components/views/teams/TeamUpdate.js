import React, { useContext, useEffect, useState } from 'react';
import axiosClient from '../../../config/axios';
import AuthContext from '../../../context/auth/authContext';
import FormTeam from './FormTeam';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const TeamUpdate = () => {

    const [fieldManager, setFieldManager] = useState({});
    const [dataFieldManager, setDataFieldManager] = useState({});
    const [showField, setShowField] = useState(false)
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
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: error.response.data.msg
            })
        }
    }
    // const showField = fieldManager === null ? false : true
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-md-${showField  ? '8' : '12'}`}>
                        <FormTeam
                            setFieldManager={setFieldManager}
                            destinyForm="update"
                            getFieldManager={getFieldManager}
                        />
                    </div>

                    {
                        showField &&
                        <div className="col-md-4">
                            <div className="card card-profile">
                                <div className="card-avatar">
                                    <a href="javascript:;">
                                        <img className="img" src="../assets/img/faces/marc.jpg" />
                                    </a>
                                </div>
                                <div className="card-body">
                                    <h6 className="card-category text-gray">FIELD MANAGER</h6>
                                    <h4 className="card-title">{fieldManager.name} {fieldManager.last_name}</h4>
                                    <p className="card-description">
                                        Celular: {fieldManager.phone}
                                    </p>
                                    <Link to={`/usuario/${fieldManager._id}`} className="btn btn-success btn-round">VER</Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TeamUpdate;