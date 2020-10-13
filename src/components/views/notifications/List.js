import React from 'react';
import Item from './Item';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function List({ notifications, loading }) {

    const ItemsLoading = () => (
        <div style={{ lineHeight: 4 }}>
            <SkeletonTheme color="#fff">
                <Skeleton height={80}/>
                <Skeleton height={80}/>
                <Skeleton height={80}/>
            </SkeletonTheme>
        </div>
    )

    return (
        <div>
            {
                loading ? <ItemsLoading/> :
                notifications.map( (notification, index) => {
                    const item = notifications[ notifications.length - 1 - index ];
                    return <Item { ...item }/>

                })
            }
        </div>
    );
}

export default List;

