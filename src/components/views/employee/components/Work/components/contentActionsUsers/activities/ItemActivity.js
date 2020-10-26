import React, { useState, useEffect }  from 'react';
import '../../styles.css';
export default ({  name, status, onChangeStatusActivity }) => {

    const [value, setValue] = useState(status);

    useEffect(() => {
        onChangeStatusActivity ( value );
    }, [value])

    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div className="form-check itemActivity">
                <label className="form-check-label">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="status"
                        defaultChecked={value}
                        onChange={ () => setValue(!value) }
                    />
                    <span className="form-check-sign">
                        <span className="check" />
                    </span>
                    { name }
                </label>
            </div>
        </div>
    )
}