import React, { useState, useContext, useEffect } from 'react';
import Context from '../context/context';
import ItemActivity from './Activity';


export default ({ typeWorkId }) => {

    const [showInput, setShowInput] = useState(false);
    const { getActivities, createActivity } = useContext(Context);

    const [activities, setActivities] = useState(null);
    const [permitFetch, setpermitFetch] = useState(false);
    const [valueNewItem, setValueNewItem] = useState('');
    

    const fetchGetActivities = async () => {
        if( !permitFetch ) {
            console.log('enter fetch');
            let res = await getActivities(typeWorkId);
            setActivities(res);
            setpermitFetch(true);
        }
    }

    const postActivity = async () =>  {
        if( valueNewItem == '' ) return;
        let  res = await createActivity({
            typeWork: typeWorkId,
            name: valueNewItem
        });
        if(  res.status ) {
            setValueNewItem('');
            setShowInput(false);
            setpermitFetch(false);
        }

    }

    const renderedActivities = () => {
        if( !activities ) return <></>;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        return activities.map((activity) => (
            <ItemActivity changePermitFetch={changePermitFetch} key={activity._id} {...activity}/>
        ))
    }
    const changePermitFetch = () => setpermitFetch(false);

    useEffect(() => {
        console.log('permitFetch', permitFetch);
        fetchGetActivities();
    }, [permitFetch]);
    
    return (
        <div className="tab-content">
        <div className="tab-pane active" id="profile">
            <table className="table">
                <tbody>
                    {
                        renderedActivities()
                    }
                </tbody>
            </table>
            {
                showInput ?
                <div className="row" style={{margin: '0 auto', alignItems: 'center'}}>
                    <div style={{width: 'calc(90% - 80px)'}}>
                        <div className="form-group">
                            <input
                                name="valueNewItem"
                                value={valueNewItem}
                                onChange={({target: { value }}) => setValueNewItem(value)}
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div style={{width: '60px', marginLeft: '20px'}} className="row">
                        <button 
                            type="button" 
                            rel="tooltip" 
                            title="Agregar actividad" 
                            className="btn btn-success btn-link btn-sm" 
                            onClick={postActivity}
                            style={{padding: '5px'}}
                        >
                            <i className="material-icons">done</i>
                        </button>
                        <button 
                            type="button" 
                            rel="tooltip" 
                            title="Remove" 
                            className="btn btn-danger btn-link btn-sm"
                            style={{padding: '5px'}}
                            onClick={() => setShowInput(false)}
                        >
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                </div> : ''
            }
            {
                !showInput ?
                <div className="row justify-content-center">
                    <button
                        className="btn background-blue pull-right"
                        onClick={() => setShowInput(true)}
                    >Agregar un nuevo item</button>
                </div> : ''
            }
        </div>
    </div>
    )
}