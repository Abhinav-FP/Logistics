import React, { useState, useEffect } from 'react';
import Map from './Map';

const MapContainer = ({ restaurent_coordinates, order_coordinates, checkout_coordinates, status }) => {
  const [restaurantLocation, setRestaurantLocation] = useState({ lat: 26.9298469, lng: 75.7853946 });
  const [deliveryLocation, setDeliveryLocation] = useState({ lat: 26.8669, lng: null });
  const [deliveryPersonLocation, setDeliveryPersonLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    // Directly use the passed coordinates objects
    const rest_cord = restaurent_coordinates;
    const order_cord = order_coordinates;
    const checkout_cord = checkout_coordinates;
    
    if (order_cord && order_cord.lat) {
      setDeliveryPersonLocation({
        lat: order_cord.lat, lng: order_cord.lng
      });
    }
    if (checkout_cord && checkout_cord.lat) {
      setDeliveryLocation({
        lat: checkout_cord.lat, lng: checkout_cord.lng
      });
    }
  }, [restaurent_coordinates, order_coordinates, checkout_coordinates]);

  return (
    <>
      <Map
        restaurantLocation={restaurantLocation}
        deliveryLocation={deliveryLocation}
        deliveryPersonLocation={deliveryPersonLocation}
      />
    </>
  );
};

export default MapContainer;
