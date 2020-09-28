import React  from 'react';

export default ({  name, status }) => {

    return (
        <tr style={{display: 'flex', alignItems: 'center'}}>
            <td>
                <div className="form-check">
                    <label className="form-check-label">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            name="status"
                            disabled="disabled"
                            defaultChecked={status}
                        />
                        <span className="form-check-sign">
                            <span className="check" />
                        </span>
                    </label>
                </div>
            </td>
            <td> 
                   { name }
            </td> 
        </tr>
    )
}