import React from 'react';
import LocatinTracker from '../tracklocation/index';

export default function Index() {
    const restaurantCoordinates = { lat: 26.9298469, lng: 75.7853946 };
    const orderCoordinates = { lat: 26.850262, lng: 75.761726 };
    const checkoutCoordinates = { lat: 26.8669, lng: 75.79735 };

    return (
        <div>
            <h1>Coordinates</h1>
            <p>Restaurant Coordinates: {`${restaurantCoordinates.lat}, ${restaurantCoordinates.lng}`}</p>
            <p>Order Coordinates: {`${orderCoordinates.lat}, ${orderCoordinates.lng}`}</p>
            <p>Checkout Coordinates: {`${checkoutCoordinates.lat}, ${checkoutCoordinates.lng}`}</p>

            <LocatinTracker 
                restaurent_coordinates={restaurantCoordinates} 
                order_coordinates={orderCoordinates} 
                checkout_coordinates={checkoutCoordinates} 
            />
        </div>
    );
}
