import React, { useContext } from 'react';
import Context from '../context/context';

const CountLC = () => {

    const { worksUsers } = useContext(Context);

    const numberStyle = {
        color: '#ccc',
        margin: '5px 0',
        display: 'block',
        textAlign: 'center',
        fontSize: '30px'
    }
    console.log('worksUsers', worksUsers);
    return (
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-stats" style={{paddingBottom: '10px'}}>
                <div className="card-header card-header-icon">
                    <div className="card-icon" style={{backgroundColor: '#2d4e72'}}>
                        {
                            <i className="material-icons">groups</i>
                        }
                    </div>
                    <p 
                        className="card-category"
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        Total Cuadrillas
                        <br></br>
                        { worksUsers ? <span style={numberStyle}>{ worksUsers.total }</span> : '' }
                    </p>
                    <p
                        className="card-category"
                        style={{
                            textAlign: 'center',
                            marginTop: '12px'
                        }}
                    >Status de cuadrillas</p>
                    <div className="row">
                        <div className="col-md-6">
                            <p 
                                className="card-category"
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                En campo
                                <br></br>
                                { worksUsers ? <span style={numberStyle}>{ worksUsers.working }</span> : '' }
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p 
                                className="card-category"
                                style={{
                                    textAlign: 'center'
                                }}
                            >
                                Disponibles
                                <br></br>
                                { worksUsers ? <span style={numberStyle}>{ worksUsers.disponibility }</span> : '' }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountLC;