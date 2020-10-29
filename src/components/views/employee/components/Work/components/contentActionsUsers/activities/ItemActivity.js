import React, { useState, useEffect }  from 'react';
import '../../styles.css';
export default ({ _id,  name, status, onChangeStatusActivity }) => {

    const [value, setValue] = useState(status);
    const [hasChange, setHasChange] = useState(null);

    const updateValue = (value) => {
        setHasChange(true);
        setValue(value);
    }

    useEffect(() => {
        if( !hasChange ) return;
        onChangeStatusActivity ( _id, value );
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
                        onChange={ () => updateValue(!value) }
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