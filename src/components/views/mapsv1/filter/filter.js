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
    updateShowPlaces,
    updatePlaceSelected,
    places
}) {
    return (
        <div className="containerFilters">
            <div className="itemFilter">
                <Places
                    showPlaces={ showPlaces }
                    updateShowPlaces={ updateShowPlaces }
                    places={ places }
                    updatePlaceSelected={updatePlaceSelected}
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