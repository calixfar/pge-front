import React, { useContext, useEffect } from 'react';
import Context from '../context/context';
import SummaryStatusWork from './SummaryStatusWork';

const ListSummaryStatusWork = () => {

    const { getCountWorks, filterZone, countWorks } = useContext(Context);

    console.log(countWorks);

    useEffect(() => {
        getCountWorks();
    }, [filterZone]);

    let renderedSummarys = () => {

        return Object.values(countWorks).map((value, index) => Object.keys(countWorks)[index] !== 'count' ? (
            <SummaryStatusWork 
                value={value}
                status={Object.keys(countWorks)[index]}
                total={countWorks.count}
            />
        ) : '')
    }
    if ( !countWorks ) return <></>;
    return (
        <div className="row">
            {
                renderedSummarys()
            }
        </div>
    )
}

export default ListSummaryStatusWork;