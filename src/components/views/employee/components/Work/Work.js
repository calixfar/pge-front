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
    const [commentary, setCommentary] = useState('');

    const changeCommentary = (value) => {
        setCommentary(value);
    }
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

    const onClickActionUser = async (value) => {

        const { status_work } = work;

        switch (value) {
            case 'Editar':
                // if( status_work !== typesStatusWork.Inicio_tarea.value ) {
                //     changeMsg({
                //         type: 'error',
                //         value: 'Debes iniciar la tarea para poder editarla'
                //     });
                //     return;
                // }
                changeShowSidebars('activities',true);
                break;
            case 'Reason':
                changeShowSidebars('reporProblem',true);
                break;
            default:
                const res = await changeStatusWork(work._id, { status_work: value, commentary });
                console.log(res);
                changeMsg({
                    type: res.status ? 'success' : 'error',
                    value: res.msg
                });
                break;
        }
    }

    useEffect(() => {
        if( !work ) return;
        setCommentary(work.commentary)
    }, [work]);

    if( !work ) return <></>

    const { place: { address, department, city, name, structure, code_site }, priority, status_work } = work;
    
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
                content={ <ContentActivities workId={work._id}/> }
            />
            <SideBar
                show={ showSidebars.reporProblem }
                hideSideBar={ () => changeShowSidebars('reporProblem', false) }
                content={ <ContentReportProblem commentary={commentary}/> }
            />
        </div>
    )

}

export default Work;