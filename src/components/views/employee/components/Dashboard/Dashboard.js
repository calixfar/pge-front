import React, { useContext } from 'react';
import Context from '../../context/context';
import ListSummaryStatusWork from '../../../dashboard/components/ListSummaryStatusWork';
import { getCountsWorks } from '../../../../../utils/utils';

const Dashboard = () => {
    const {works, loading} = useContext(Context);
    console.log('works dash', works);

    // useEffect(() => {
    //     if( works !== null ) console.log('works count', );
    // }, [works]);
    
    let data;
    if( works ) {
        data = getCountsWorks(works)
    }
    return (
        <div className="content content-pdf">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {
                            loading && !works ? 
                            <p>Loading...</p> :
                            <ListSummaryStatusWork
                                hideGeneralWors={ true }
                                data={ data.countWorks }
                                total={ data.count }
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;