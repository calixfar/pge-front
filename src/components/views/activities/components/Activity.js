import React, {useState} from 'react';

export default ({ _id, name, status, changePermitFetch }) => {
    const [state, setState] = useState({
        name,
        status
    });
    console.log('asddas',  _id, name, status, changePermitFetch);
    const [permitEdit, setPermitEdit] = useState(false);

    const changeState = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value
        })
    }
    const iconButton = permitEdit ? 'done' : 'edit';
    const attrCheck = !permitEdit ? {disabled: 'disabled'} : {};

    return (
        <tr style={{display: 'flex', alignItems: 'center'}}>
            <td>
                <div className="form-check">
                    <label className="form-check-label">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value={state.status} 
                            onChange={changeState}
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
                    className="btn btn-primary btn-link btn-sm" 
                    onClick={() => setPermitEdit(!permitEdit)}
                >
                    <i className="material-icons">{ iconButton }</i>
                </button>
                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                    <i className="material-icons">close</i>
                </button>
            </td>
        </tr>
    )
}