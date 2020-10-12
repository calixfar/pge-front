import React from 'react';
import SummaryStatusWork from './SummaryStatusWork';

const ListSummaryStatusWork = ({ data, total }) => {

  
    let renderedSummarys = () => {
        
        return (
            <>
                <SummaryStatusWork 
                    value={total}
                    status={'Tarea'}
                    total={total}
                />
                {
                    data.map(( { value, status } ) => (
            
                        <SummaryStatusWork 
                            value={value}
                            status={status}
                            total={total}
                        />
                    ))
                }
            </>
        )
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