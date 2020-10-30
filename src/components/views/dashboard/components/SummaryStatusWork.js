import React from 'react';

function SummaryStatusWork({ status, value, total, icon, image, color, title }) {

    const text = `${value}${status !== 'Tarea' ? `/${total}` : ''}`;
    // return <></>
    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats">
                <div className="card-header card-header-icon">
                    <div className="card-icon" style={{backgroundColor: color}}>
                        {
                            image ?
                            <img 
                                src={image}
                                className="imageIcon"
                                style={{
                                    width: '55px',
                                    height: '55px'
                                }}
                            /> :
                            <i className="material-icons">{icon}</i>
                        }
                    </div>
                    <p className="card-category">{title}</p>
                    <h3 style={{color: '#ccc'}}>{ text }</h3>
                </div>
            </div>
        </div>

    );
}

export default SummaryStatusWork;