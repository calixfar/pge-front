import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
function Item({ route, _id, createAt, type, action, triggeredUser }) {

    const msg = `${ triggeredUser.name } ${ action }`

    return (
        <Link to={route}>
            <div key={_id} className="item-notification" >
                <h4 className="notification-title"> { type } </h4>
                <p className="notification-message"> {msg} </p>
                <p className="notification-date"> {createAt.toLocaleString()} </p>
            </div>
        </Link>
    );
}

export default Item;