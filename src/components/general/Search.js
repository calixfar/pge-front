import React, { useState, useEffect } from 'react';

const Search = ( { fetchBySearch, placeholder } ) => {

    const [value, setValue] = useState('');

    const changeValue = ({ target }) => {
        setValue(target.value);
    }

    const fetchSearch  = () => {
        fetchBySearch(value === '' ? 'ALL' : value);
    }

    const submitKeyDownEnter = ( event ) => {
        if( event.key === 'Enter' ) {
            fetchSearch();
        }
    }

    useEffect(() => {
        if( value === '' ) {
            fetchSearch();
        }
    }, [value]);
    return (
        <div className="col-md-4">
            <div className="input-group">
                <input 
                    type="text" 
                    value={value} 
                    onChange={ changeValue } 
                    onKeyDown={ submitKeyDownEnter }
                    class="form-control color-white" 
                    placeholder={placeholder ? placeholder :  "Buscar"}
                />
                <button 
                    onClick={ fetchSearch } 
                    type="button" 
                    class="btn btn-white btn-round btn-just-icon"
                >
                    <i class="material-icons">search</i>
                    <div class="ripple-container"></div>
                </button>    
            </div>
        </div>
    )
}

export default Search;