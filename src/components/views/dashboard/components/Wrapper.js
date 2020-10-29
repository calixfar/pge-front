import React, { useContext, useEffect } from 'react';
import Context from '../context/context';
import ListSummaryStatusWork from './ListSummaryStatusWork';
import FilterZones from './FilterZones';
import Chart from './Chart';
import { formatDataStatusWork } from '../utils';

const Wrapper = () => {

    const { getCountWorks, countWorks, filterZone } = useContext(Context);

    
    useEffect(() => {
        getCountWorks();
    }, [filterZone]);
    
    if( countWorks === null ) return <></>;

    console.log(countWorks);

    const data = formatDataStatusWork(countWorks);

    return (
        <div className="content content-pdf">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <FilterZones/>
                    </div>
                    <div className="col-md-9">
                        <ListSummaryStatusWork
                            data={data}
                            total={countWorks.count}
                        />
                    </div>
                </div>
                <div className="row">
                    <Chart
                        data={data}
                        total={countWorks.count}
                    />
                </div>
            </div>
        </div>
    )
}

export default Wrapper;