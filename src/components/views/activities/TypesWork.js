import React, { useContext, useEffect } from 'react';
import TypeWork from './components/TypeWork';
import BlankTypeWork from './components/BlankTypeWork';
import Context from './context/context';

export default () => {

    const { typesWork, getTypesWorks} = useContext(Context);
    const renderedWorks = () => {
        if( typesWork == null ) return <div></div>;
        else if ( typesWork == [] ) return <div><p>No hay actividades creadas</p></div>
        return <div className="row">
            {
                typesWork.map((activity) => (
                       <TypeWork key={activity._id} {...activity}/>
                ))

            }
            <BlankTypeWork/>
        </div>
    }

    useEffect(() => {
        if( typesWork == null ) getTypesWorks();
    }, [])
    return (
        <div>
            {
                renderedWorks()   
            }
        </div>
    )
}