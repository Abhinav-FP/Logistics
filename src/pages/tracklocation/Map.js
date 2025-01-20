import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GoogleMap, Marker, DirectionsRenderer, Polyline, LoadScript } from '@react-google-maps/api';

const CustomMarker = ({ position, iconUrl, size = { width: 40, height: 40 } }) => {
    const icon = window.google
        ? {
            url: iconUrl,
            scaledSize: new window.google.maps.Size(size.width, size.height),
        }
        : null;

    return <Marker position={position} icon={icon} />;
};

const MapComponent = ({ StartLocation, CurrentLocation, EndLocation }) => {
    const [directions, setDirections] = useState(null);

    useEffect(() => {
        console.log('CurrentLocation:', CurrentLocation);
        if (typeof window !== 'undefined' && window.google) {
            const { google } = window;

            if (google && google.maps) {
                const directionsService = new google.maps.DirectionsService();
                directionsService.route(
                    {
                        origin: StartLocation,
                        destination: EndLocation,
                        waypoints: [{ location: CurrentLocation }],
                        optimizeWaypoints: true,
                        travelMode: google.maps.TravelMode.DRIVING,
                    },
                    (result, status) => {
                        console.log("result", result)
                        if (status === google.maps.DirectionsStatus.OK) {
                            setDirections(result);
                        } else {
                            console.error(`Error fetching directions: ${status}`);
                        }
                    }
                );
            } else {
                console.error('Google Maps API is not properly loaded.');
            }
        }
    }, [StartLocation, EndLocation, CurrentLocation]);


    return (
        <LoadScript googleMapsApiKey="AIzaSyBoHSgIrrdijx_5Nex1rFX4g-B4HJSLdDw">
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '500px' }}
                zoom={15}
                center={CurrentLocation || StartLocation}
                options={{ cursor: 'crosshair' }}
            >
                {CurrentLocation && (
                    <CustomMarker
                        position={CurrentLocation}

                        iconUrl="https://www.pinclipart.com/picdir/middle/385-3851689_delivery-clipart-delivery-man-png-download.png"
                        size={{ width: 50, height: 50 }}
                    />
                )}

                {EndLocation && (
                    <CustomMarker
                        position={StartLocation}
                        iconUrl="https://th.bing.com/th/id/OIP.ZCHVQMolgocE66TQdftn3wHaGA?rs=1&pid=ImgDetMain"
                        size={{ width: 40, height: 40 }}
                    />
                )}

                {StartLocation && (
                    <CustomMarker
                        position={StartLocation}
                        iconUrl="https://www.pngall.com/wp-content/uploads/8/Restaurant-Logo-PNG-Free-Image.png"
                        size={{ width: 50, height: 50 }}
                    />
                )}

                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });
