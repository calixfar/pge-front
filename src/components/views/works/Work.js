import React, { useContext, useEffect } from 'react';
import Context from './context/WorkContext';
import { withRouter } from 'react-router-dom';
import Form from './Form';

export default withRouter(({ history }) => {

    const { work, getWork } = useContext(Context);

    const fetchWork = () => {
        const { location: { pathname } } = history;
        const paramId = pathname.replace('/tarea/', '');
        if( Object.values(work).length === 0 || work._id !== paramId ) {
            getWork(paramId);
        }
    }

    useEffect(() => {
        fetchWork();
        // console.log(paramId);
        // getWork()
    });
    if( !Object.values(work).length ) return <></>;
    return (
        <div className="content">
            <div className="container-fluid">
                <Form work={work}/>
            </div>

        </div>
    )
})