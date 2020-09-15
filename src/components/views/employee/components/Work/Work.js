import React, { useContext } from 'react';
import WorkContext from '../../context/context';
import ActionsUser from './components/ActionsUser';
import './styles.css';
const Work = ({ work }) => {
    const workContext = useContext(WorkContext);
    const { updateWork } = workContext;
    const { place: { address, department, city, name, structure, code_site }, priority } = work;
    return (
        <div className="containerDescripWork">
            <div className="contentDescripWork">
                <div className="listDescripWork">
                    <p className="itemDescripWork nameWork">{ name }</p>
                    <p className="itemDescripWork"><strong>Código sitio: </strong> { code_site }</p>
                    <p className="itemDescripWork"><strong>Departamento: </strong>{ department }</p>
                    <p className="itemDescripWork"><strong>Ciudad: </strong>{ city }</p>
                    <p className="itemDescripWork"><strong>Dirección: </strong>{ address }</p>
                    <p className="itemDescripWork"><strong>Estructura: </strong>{ structure }</p>
                    <p className="itemDescripWork"><strong>Prioridad: </strong>{ priority }</p>
                </div>
                <ActionsUser/>
            </div>
        </div>
    )

}

export default Work;