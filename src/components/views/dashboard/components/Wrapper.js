import React, { useContext, useEffect } from 'react';
import Context from '../context/context';
import ListSummaryStatusWork from './ListSummaryStatusWork';
import FilterZones from './FilterZones';
import Chart from './Chart';
import CountLC from './CountLC';
import { formatDataStatusWork } from '../utils';

const Wrapper = () => {

    const { getCountWorks, countWorks, filterZone, getWorksUsers } = useContext(Context);

    
    useEffect(() => {
        getCountWorks();
    }, [filterZone]);

    useEffect(() => {
        getWorksUsers();
    }, []);
    
    if( countWorks === null ) return <></>;

    console.log(countWorks);

    const data = formatDataStatusWork(countWorks.countWorks);

    console.log('data', data);
    // return <></>;

    return (
        <div className="content content-pdf">
            <div className="container-fluid">
                <div 
                    className="row"
                >
                    <div className="col-md-12">
                        <div 
                            className="row"
                            style={{
                                flexDirection: 'column',
                                flexWrap: 'wrap',
                                maxHeight: '750px'
                            }}
                        >
                            <FilterZones/>
                            <ListSummaryStatusWork
                                data={data}
                                total={countWorks.count}
                            />
                            <CountLC/>
                        </div>
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