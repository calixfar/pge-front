import React, { useContext, useState, useEffect } from 'react';
import WorkContext from '../../context/context';
import ActionsUser from './components/ActionsUser';
import SideBar from '../Sidebar';
import ContentActivities from './components/contentActionsUsers/activities';
import ContentReportProblem from './components/contentActionsUsers/reportProblems';
import { typesStatusWork } from '../../../../../types/works';
import './styles.css';
const Work = ({ work }) => {
    const workContext = useContext(WorkContext);
    const { changeStatusWork } = workContext;

    const initialShowSideBars = {
        reporProblem: false,
        activities: false
    }
    const initialMsg = {
        value: '',
        type: ''
    }
    const [ showSidebars, setShowSidebars ] = useState(initialShowSideBars);
    const [msg, setMsg] = useState(initialMsg);

    const changeMsg = (value) => {
        if( value === '' ) return;
        setMsg(value);
        setTimeout(() => {
            setMsg(initialMsg);
        }, 3000)
    }

    const changeShowSidebars = (destiny, value) => {
        setShowSidebars({
            ...showSidebars,
            [destiny]: value
        });
    }

    const onClickActionUser = async (value, commentary) => {

        switch (value) {
            case 'Editar':
                if( status_work !== typesStatusWork.Inicio_tarea.value ) {
                    changeMsg({
                        type: 'error',
                        value: 'Debes iniciar la tarea para poder editarla'
                    });
                    return;
                }
                changeShowSidebars('activities',true);
                break;
            case 'Reason':
                changeShowSidebars('reporProblem',true);
                break;
            default:
                console.log('value work status', value);
                const res = await changeStatusWork(work._id, { status_work: value, commentary: commentary || '' });
                console.log(res);
                changeMsg({
                    type: res.status ? 'success' : 'error',
                    value: res.msg
                });
                break;
        }
    }

    const sendReportProblem = (commentary) => {
        changeShowSidebars('reporProblem', false);
        onClickActionUser(typesStatusWork.Problema.value, commentary);
    }

    useEffect(() => {
        if( !work ) return;
    }, [work]);

    if( !work ) return <></>

    const { place: { address, department, city, name, structure, code_site }, priority, status_work, commentary } = work;
    
    return (
        <div className="containerWork">
            <div className="containerDescripWork">
                <div className="contentDescripWork">
                    <div className="listDescripWork">
                        <p className="itemDescripWork nameWork">{ name }</p>
                        <p style={{fontWeight: 'bold'}} className="itemDescripWork"><strong>Estado: </strong>{ typesStatusWork[status_work].text }</p>
                        <p className="itemDescripWork"><strong>Código sitio: </strong> { code_site }</p>
                        <p className="itemDescripWork"><strong>Departamento: </strong>{ department }</p>
                        <p className="itemDescripWork"><strong>Ciudad: </strong>{ city }</p>
                        <p className="itemDescripWork"><strong>Dirección: </strong>{ address }</p>
                        <p className="itemDescripWork"><strong>Estructura: </strong>{ structure }</p>
                        <p className="itemDescripWork"><strong>Prioridad: </strong>{ priority }</p>
                        <p className="itemDescripWork"><strong>Comentario: </strong>{ commentary ? commentary : 'NA' }</p>

                    </div>
                    <ActionsUser
                        onClickActionUser={ onClickActionUser }
                    />
                    <p className={`textMsg ${ msg.value !== '' ? `showMsg ${msg.type === 'success' ? 'textSuccess' : 'textError'}` : '' }`}> { msg.value } </p>
                </div>
            </div>
            <SideBar
                show={ showSidebars.activities }
                hideSideBar={ () => changeShowSidebars('activities', false) }
                content={ <ContentActivities workId={work._id} commentary={work.commentaryEmployee}/> }
            />
            <SideBar
                show={ showSidebars.reporProblem }
                hideSideBar={ () => changeShowSidebars('reporProblem', false) }
                content={ <ContentReportProblem 
                    sendReportProblem={ sendReportProblem }
                    /> }
            />
        </div>
    )

}

export default Work;