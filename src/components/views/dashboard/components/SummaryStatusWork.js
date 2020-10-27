import React from 'react';
import { typesStatusWork } from '../../../../types/works';
function SummaryStatusWork({ status, value, total }) {

    const text = `${value}${status !== 'Tarea' ? `/${total}` : ''}`;
    console.log(status, typesStatusWork[status]);
    // return <></>
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card card-stats">
                <div className="card-header card-header-icon">
                    <div className="card-icon" style={{backgroundColor: typesStatusWork[status].color}}>
                        <i className="material-icons">{typesStatusWork[status].icon}</i>
                    </div>
                    <p className="card-category">{typesStatusWork[status].text}</p>
                    <h3 style={{color: '#ccc'}}>{ text }</h3>
                </div>
            </div>
        </div>

    );
}

export default SummaryStatusWork;