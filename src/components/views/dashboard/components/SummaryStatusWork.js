import React from 'react';

function SummaryStatusWork({ status, value, total }) {

    const casesStatus = ['Sin_revisar', 'Problema', 'Navegacion', 'Inicio_tarea', 'Culminada', 'Vista', 'Tarea'];
    const setColorStatus = (status_work) => {
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
            case casesStatus[6]:
                return '#069b9b';
            default:
                return '#9507CF';
        }
    }
    const setIconStatus = (status_work) => {
        switch (status_work) {
            case casesStatus[0]:
                return 'visibility_off';
            case casesStatus[1]:
                return 'report_problem';
            case casesStatus[2]:
                return 'near_me';
            case casesStatus[3]:
                return 'settings_power';
            case casesStatus[4]:
                return 'check_circle_outline';
            case casesStatus[5]:
                return 'done_all';
            case casesStatus[6]:
                return 'list_alt';
            default:
                return 'store';
        }
    }

    const text = `${value}${status !== 'Tarea' ? `/${total}` : ''}`;

    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card card-stats">
                <div className="card-header card-header-icon">
                    <div className="card-icon" style={{backgroundColor: setColorStatus(status)}}>
                        <i className="material-icons">{setIconStatus(status)}</i>
                    </div>
                    <p className="card-category">{status.replace('_', ' ')}</p>
                    <h3 style={{color: '#ccc'}}>{ text }</h3>
                </div>
                {/* <div className="card-footer">
                    <div className="stats">
                        <i className="material-icons">date_range</i> Last 24 Hours
                    </div>
                </div> */}
            </div>
        </div>

    );
}

export default SummaryStatusWork;