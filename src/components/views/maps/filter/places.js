import React from 'react';
import './styles.css';
function places({
    showPlaces,
    updateShowPlaces
}) {
    return (
        <div className="form-check custom-form-check">
            <label className="form-check-label">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="status"
                    onChange={() => updateShowPlaces(!showPlaces)}
                    defaultChecked={ showPlaces }
                />
                <span className="form-check-sign">
                    <span className="check" />
                </span>
                Mostrar lugares
            </label>
        </div>
    );
}

export default places;