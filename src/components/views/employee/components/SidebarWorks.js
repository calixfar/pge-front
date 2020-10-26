import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../context/auth/authContext' ;
import WorkContext from '../context/context';
import SideBar from './Sidebar';
import Work from './Work/Work';
import { searchInitializedWork } from '../../../../utils/employee';
import '../styles.css';
const SideBarWork = () => {
    const authContext = useContext(AuthContext);
    const workContext = useContext(WorkContext);
    const {  usuario } = authContext;
    const { works, getWorks, selectWork, initialized_work } = workContext;

    const [dataWork, setDataWork] = useState(null);
    const [ showSideBar, setShowSideBar ] = useState(false);

    const changeDataWork = (value) => {
        setDataWork(value);
        changeShowSideBar(true);
    }

    const changeShowSideBar = (value) => {
        setShowSideBar(value);
    }

    useEffect(() => {
        getWorks();
    }, []);

    useEffect(() => {
        if( !works ) return;
        const res = searchInitializedWork(works);
        selectWork( res );
    }, [works]);

    useEffect(() => {
        if( !initialized_work ) return;

        changeDataWork(initialized_work);

    }, [initialized_work]);

    if(usuario === null ) {
        return(
            <div></div>
        )
    }
    const isWorkSelected = initialized_work && initialized_work._id ? true : null;
    return (
        <div className="sidebar" data-color="green" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            <div className="logo"><Link to="/home" className="simple-text logo-normal">
               <img className="w-25" src="/arquivos/logo_fic.png"/> 
        </Link></div>
            <div className="sidebar-wrapper">
                {
                    works !== null && works.length ?
                    <div className="table-responsive">
                        {
                            works.map((work) => {

                                return (
                                    <div 
                                        key={work._id} 
                                        className="card"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => changeDataWork(work)}
                                    >
                                        <div className="card-header card-header-success">
                                            <h4 style={{textAlign: 'center'}} className="card-title">{work.type.type}</h4>
                                        </div>
                                        <div className="card-body">
                                            <p>Lugar: {work.place.name}</p>
                                            <p>ID estación: {work.id_base_station}</p>
                                            <p>Prioridad: {work.priority}</p>
                                            <p>Estado tarea: {work.status_work.replace(/_/g, ' ')}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <SideBar
                            show={ isWorkSelected !== null ? isWorkSelected : showSideBar }
                            hideSideBar={ () => changeShowSideBar(false) }
                            // content = {  <p>test</p> }
                            content = {  <Work work={dataWork}/> }
                            hideBtnBack= { isWorkSelected }
                        />
                    </div> :
                    <div>
                        <p className="text-blank-works" >No tienes tareas asignadas</p>
                    </div> 
                }
            </div>
        </div>
    )

}

export default SideBarWork;