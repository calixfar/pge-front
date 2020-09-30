import React from 'react';
import SummaryStatusWork from './SummaryStatusWork';

const ListSummaryStatusWork = ({ data, total }) => {

  
    let renderedSummarys = () => {
        return data.map(( { value, status } ) => (
            <SummaryStatusWork 
                value={value}
                status={status}
                total={total}
            />
        ))
    }
    
    return (
        <div className="row">
            {
                renderedSummarys()
            }
        </div>
    )
}

export default ListSummaryStatusWork;