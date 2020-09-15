import React from 'react';
import ItemActivity from './ItemActivity';

export default ({ type, activities }) => {

    const renderedItemsActivities = () => {
        return activities.map((item) => (
            <ItemActivity/>
        ))
    }

    return (
        <div className="col-lg-6 col-md-12">
            <div className="card">
                <div className="card-header card-header-tabs card-header-primary">
                <h4 class="card-title">{ type }</h4>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div className="tab-pane active" id="profile">
                            <table className="table">
                                <tbody>
                                
                                    {renderedItemsActivities()}
                                </tbody>
                            </table>
                            <div>
                                Agregar un nuevo item
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}