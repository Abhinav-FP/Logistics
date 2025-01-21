import React from 'react';
import LocatinTracker from '../tracklocation/index';

export default function Index() {
    const Start_coordinates = { lat: 26.9178958, lng: 75.8500819 };
    const Current_coordinates = { lat: 26.922116, lng: 75.8107634 };
    // const Current_coordinates = { lat: 26.9229, lng: 75.8269 };

    const End_coordinates = { lat: 26.9278715, lng: 75.7879766 };

    return (
        <div>
            <h1>Coordinates</h1>
            <p>Start Location Coordinates: {`${Start_coordinates.lat}, ${Start_coordinates.lng}`}</p>
            <p>Current Location Coordinates: {`${Current_coordinates.lat}, ${Current_coordinates.lng}`}</p>
            <p>Destination Coordinates: {`${End_coordinates.lat}, ${End_coordinates.lng}`}</p>

            <LocatinTracker
                Start_coordinates={Start_coordinates}
                Current_coordinates={Current_coordinates}
                End_coordinates={End_coordinates}
            />
        </div>
    );
}
