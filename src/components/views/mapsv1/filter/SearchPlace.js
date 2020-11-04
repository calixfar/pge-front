import React, { memo } from 'react';
import DataListInput from "react-datalist-input";

const SearchPlace = ({ places, updatePlaceSelected, showPlaces }) => {
    
    if ( !places || !showPlaces ) return <></>;
    
    const objPlace = {}, optionsPlaces = [];

    for( let place of places ) {
        const { _id, name } = place;
        objPlace[_id] = place;

        optionsPlaces.push({
            label: name,
            key: _id
        })
    }

    const changePlace = ({ key }) => {
        updatePlaceSelected(objPlace[key], true);
    }
    return (
        <div className="form-group mt5">
            <label>Nombre Sitio</label>
            {
                places &&

                <DataListInput
                    placeholder=""
                    items={optionsPlaces}
                    inputClassName="selectPlaces"
                    onSelect={changePlace}
                />
            }
        </div>
    )
}

export default memo(SearchPlace);