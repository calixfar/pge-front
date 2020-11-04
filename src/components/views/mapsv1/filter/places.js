import React, { useMemo } from 'react';
import './styles.css';
import SearchPlace from './SearchPlace';
function places({
    showPlaces,
    updateShowPlaces, 
    places,
    updatePlaceSelected
}) {

    

    return (
        <div>
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
            <SearchPlace
                updatePlaceSelected={ updatePlaceSelected }
                places={ places }
                showPlaces={ showPlaces }
            />
        </div>
    );
}



export default places;