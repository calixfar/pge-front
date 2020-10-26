import React, {useState, useEffect} from 'react';

const ItemReason = ({
    value,
    onChangeReason,
    selected
}) => {
    const onChange = () => {
        onChangeReason(selected === false ? value : '');
    }
    // useEffect(() => {
    //     if( check === false && itemRef  ) {
    //         itemRef.click();
    //     }
    // }, [check]);
    console.log(value, selected);
    return (
        <div className="itemActivity">
            <label className="">
                <input 
                    className=""
                    style={{transform: 'scale(1.5)', marginRight: '10px'}} 
                    type="checkbox" 
                    name="status"
                    checked={selected}
                    onChange={ () => onChangeReason(value) }
                />
                { value }
            </label>
        </div>
    )
}

export default ItemReason;