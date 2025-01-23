import React, { useState, useEffect } from 'react';
import LocatinTracker from '../tracklocation/index';

export default function Index() {
    const Start_coordinates = { lat: 26.9178958, lng: 75.8500819 };
    const End_coordinates = { lat: 26.9278715, lng: 75.7879766 };
    // const Current_coordinates = { lat: 26.9246, lng: 75.8181 };
       const Current_coordinates = { lat: 26.9229, lng: 75.8269 };

    // malviya nagar

    // const Start_coordinates = { lat: 26.852533, lng: 75.8213041 };

    // const Current_coordinates = { lat: 26.8859042, lng: 75.8150196 };
    // const End_coordinates = { lat: 26.9299574, lng: 75.7830367 };

    return (
        <div >
            <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Coordinates</h1>
                <p className="text-lg mb-2">Start Location Coordinates: {`${Start_coordinates.lat}, ${Start_coordinates.lng}`}</p>
                <p className="text-lg mb-2">Current Location Coordinates: {`${Current_coordinates.lat}, ${Current_coordinates.lng}`}</p>
                <p className="text-lg">Destination Coordinates: {`${End_coordinates.lat}, ${End_coordinates.lng}`}</p>
            </div>

            <div>
                <LocatinTracker
                    Start_coordinates={Start_coordinates}
                    Current_coordinates={Current_coordinates}
                    End_coordinates={End_coordinates}
                />
            </div>

        </div>
    );
}
