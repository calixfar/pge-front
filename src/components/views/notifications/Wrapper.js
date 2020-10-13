import React, { useEffect, useContext } from 'react';
import Context from '../../../context/notifications/Context';
import List from './List';
const NotificationsWrapper = () => {

    const { getNotifications, notifications, loading } = useContext(Context);

    console.log(notifications);

    useEffect(() => {
        getNotifications();
    }, []);

    

    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                    <div className="card card-plain">
                        <div className="card-header background-blue">
                            <div className="row">
                                <h4 className="card-title ">Lista de notificaciones</h4>
                            </div>
                        </div>
                        <div className="card-body ">

                            { notifications && <List 
                                notifications={notifications}
                                loading={loading}
                                /> 
                            }
                        </div>
                    </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationsWrapper;