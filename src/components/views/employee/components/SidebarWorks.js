import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../context/auth/authContext' ;
import WorkContext from '../context/context';
import SideBar from './Sidebar';
import Work from './Work/Work';
import '../styles.css';
const SideBarWork = () => {
    const authContext = useContext(AuthContext);
    const workContext = useContext(WorkContext);
    const { userAuth, usuario } = authContext;
    const { works, getWorks } = workContext;

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
        userAuth();
        getWorks();
    }, []);
    if(usuario === null ) {
        return(
            <div></div>
        )
    }

    return (
        <div className="sidebar" data-color="green" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            <div className="logo"><Link to="/home" className="simple-text logo-normal">
               <img className="w-25" src="/arquivos/pge_logo.png"/> 
        </Link></div>
            <div className="sidebar-wrapper">
                {
                    works !== null && works.length ?
                    <div className="table-responsive">
                        {
                            works.map((work) => (
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
                            ))
                        }
                        <SideBar
                            show={ showSideBar }
                            hideSideBar={ () => changeShowSideBar(false) }
                            // content = {  <p>test</p> }
                            content = {  <Work work={dataWork}/> }
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