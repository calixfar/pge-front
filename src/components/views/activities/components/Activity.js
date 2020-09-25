import React, {useState, useContext} from 'react';
import './styles/Activity.css';
import Context from '../context/context';

export default ({ _id, name, status, changePermitFetch }) => {

    const { updateActivity, deleteActivity } = useContext(Context);

    const [state, setState] = useState({
        name,
        status
    });
    const [permitEdit, setPermitEdit] = useState(false);

    const changeState = ({ target: { name, value } }) => {
        if( name === 'status' ) value = !state.status;
        setState({
            ...state,
            [name]: value
        })
    }

    const changePermitEdit = async () => {
        if( permitEdit ) {
            let res = await updateActivity(_id, state);
            if( res.status ) {
                changePermitFetch();
            }
        }
        setPermitEdit(!permitEdit)
    }

    const changePermitClose = async () => {
        if( permitEdit ) {
            setPermitEdit(false);
            return;
        }
        let res = await deleteActivity(_id, state);
        if( res.status ) {
            changePermitFetch();
        }

    }

    const iconButtonEdit = permitEdit ? 'done' : 'edit';
    const iconButtonDelete = permitEdit ? 'close' : 'delete_forever';
    const attrCheck = !permitEdit ? {disabled: 'disabled'} : {};

    return (
        <tr style={{display: 'flex', alignItems: 'center'}}>
            <td>
                <div className="form-check">
                    <label className="form-check-label">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            name="status"
                            onChange={changeState}
                            defaultChecked={state.status}
                            {...attrCheck}
                        />
                        <span className="form-check-sign">
                            <span className="check" />
                        </span>
                    </label>
                </div>
            </td>
            <td style={{minWidth: '75%'}}>
                { permitEdit ? 
                    <div className="form-group">
                        <input 
                            value={state.name}
                            className="form-control"
                            name="name"
                            onChange={changeState}
                        />
                    </div> : name
                }
            </td> 
            <td className="td-actions text-right">
                <button 
                    type="button" 
                    rel="tooltip" 
                    title="Editar actividad" 
                    className="btn btn-success btn-link btn-sm" 
                    onClick={changePermitEdit}
                >
                    <i className="material-icons">{ iconButtonEdit }</i>
                </button>
                <button 
                    type="button" 
                    rel="tooltip" 
                    title="Remove" 
                    className="btn btn-danger btn-link btn-sm"
                    onClick={changePermitClose}
                >
                    <i className="material-icons">{iconButtonDelete}</i>
                </button>
            </td>
        </tr>
    )
}