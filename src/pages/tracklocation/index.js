import React, { useState, useEffect } from 'react';
import Map from "./MapComponent"
const MapContainer = ({ Current_coordinates, Start_coordinates, End_coordinates }) => {

    
    const [CurrentLocation, setCurrentLocation] = useState(null);
    const [StartLocation, setStartLocation] = useState(null);
    const [EndLocation, setEndLocation] = useState(null);
    useEffect(() => {
        if (Start_coordinates?.lat && Start_coordinates?.lng) {
            setStartLocation(Start_coordinates);
        }
        if (Current_coordinates?.lat && Current_coordinates?.lng) {
            setCurrentLocation(Current_coordinates);
        }
        if (End_coordinates?.lat && End_coordinates?.lng) {
            setEndLocation(End_coordinates);
        }
    }, [Current_coordinates, Start_coordinates, End_coordinates]);

    return (
        <Map
            StartLocation={StartLocation}
            CurrentLocation={CurrentLocation}
            EndLocation={EndLocation}
        />
    );
};

export default MapContainer;
