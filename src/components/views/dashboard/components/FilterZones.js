import React, { useContext } from 'react';
import { zoneItems } from '../../../../types/zones';
import Context from '../context/context';
// import ButtonPdf from './ButtonPdf' 

const FilterZones = () => {

    const { filterZone, changeFilterZone } = useContext(Context);

    return (
        <div className="col-md-3 filterZones">
            <div className="card card-stats">
                <div className="card-header card-header-warning card-header-icon">
                    <div className="card-icon">
                        <i className="material-icons">explore</i>
                    </div>
                    <p className="card-category">Filtrar por Zona</p>
                </div>
                <div className="card-footer">
                    <div className="stats" style={{display: 'block'}}>
                        {
                            zoneItems.map(( {id, value, text} ) => (
                                <div 
                                    key={id}
                                    className="col-md-12"
                                >
                                    <button 
                                        className={`btn btn-info btn-link btn-sm ${ filterZone !== value ? 'text-gray' : '' }`}
                                        style={{
                                            fontSize: '14px',
                                            paddingBottom: '5px',
                                            paddingTop: '5px',
                                        }}
                                        onClick={() => changeFilterZone(value)}
                                    >{text}</button>
                                </div>
                            ))
                        }
                        {/* <ButtonPdf/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterZones;