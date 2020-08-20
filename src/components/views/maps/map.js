import React from 'react';
import Filter from './filter';
const Map = () => {

    return( 
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                    <iframe style={{width: '100% !important'}} className="iframe" width="700" height="800" id="gmap_canvas" src='http://maps.google.com/maps?q=colombia&t=&z=7&ie=UTF8&iwloc=&output=embed'  scrolling="no"></iframe>
                    </div>
                    <div className="col-md-4">
                        <Filter/>
                    </div>
                </div>
            </div>
        </div>
     )
}
export default Map;