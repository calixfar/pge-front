import React from 'react';

export default () => {
    return (
        <div data-notify="container" className={`col-11 col-md-4 alert alert-danger alert-with-icon animated fadeInDown`} role="alert"  style={{display: 'inline-block', margin:' 15px auto', position: 'fixed', transition: 'all 0.5s ease-in-out 0s', zIndex: '1031', bottom: '20px', right: '20px'}}>
                <i data-notify="icon" className="material-icons">add_alert</i>
                <span data-notify="title"></span> 
                <span data-notify="message">{msg}</span>
                <a href="#" target="_blank" data-notify="url"></a>
            </div>
    )
}