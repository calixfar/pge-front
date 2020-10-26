import React from 'react';
import Teams from './teams';
import Places from './places';

import './styles.css';
function Filter({
    teamsLocations,
    userSelected,
    updateUserSelected,
    showInfoWindow,
    updateShowInfoWindow,
    showPlaces,
    updateShowPlaces
}) {
    return (
        <div className="containerFilters">
            <div className="itemFilter">
                <Places
                    showPlaces={ showPlaces }
                    updateShowPlaces={ updateShowPlaces }
                />
            </div>
            <div className="itemFilter itemFilterTeam">
                <Teams
                    teamsLocations={ teamsLocations }
                    userSelected={ userSelected }
                    updateUserSelected={ updateUserSelected }
                    updateShowInfoWindow={ updateShowInfoWindow }
                />
            </div>
        </div>
    );
}

export default Filter;