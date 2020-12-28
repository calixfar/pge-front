import React from 'react';
import Item from './Item';

function List({ notifications, loading }) {

    return (
        <div>
            {
                loading ? <div>Loading...</div> :
                notifications.map( (notification, index) => {
                    const item = notifications[ notifications.length - 1 - index ];
                    return <Item { ...item }/>

                })
            }
        </div>
    );
}

export default List;

