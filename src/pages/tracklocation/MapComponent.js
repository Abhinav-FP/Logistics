import { GoogleMap, Marker, Polyline, LoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import Details from '../api/Listing/Details';

const MapComponent = ({ StartLocation, CurrentLocation, EndLocation }) => {
    const [routeDetails, setRouteDetails] = useState(null);
    console.log("v",routeDetails)
    const [status, setStatus] = useState(true);

    const markerIcons = {
        start: "https://th.bing.com/th/id/OIP.ZCHVQMolgocE66TQdftn3wHaGA?rs=1&pid=ImgDetMain",
        end: "https://th.bing.com/th/id/OIP.hIhIc_XIUMQXr6J4BHdMzwHaF6?w=224&h=180&c=7&r=0&o=5&pid=1.7",
        current: "https://i.ibb.co/9TTs8Jk/material-symbols-local-shipping-outline.png"
    };

    const CustomMarker = ({ position, iconUrl, size = { width: 40, height: 40 } }) => {
        const icon = window.google
            ? {
                url: iconUrl,
                scaledSize: new window.google.maps.Size(size.width, size.height),
            }
            : null;

        return <Marker position={position} icon={icon} />;
    };

    const fetchDirections = async () => {
        const main = new Details();
        setStatus(true);
        try {
            const response = await main.direction({
                StartLocation: `${StartLocation.lat},${StartLocation.lng}`,
                EndLocation: `${EndLocation.lat},${EndLocation.lng}`,
                CurrentLocation: `${CurrentLocation.lat},${CurrentLocation.lng}`
            });
            console.log("response", response)
            console.log("response?.data?.data",response?.data?.data)
            if (response?.data?.data) {
                setStatus(false);
                setRouteDetails(response.data.data);
            } else {
                setStatus(false);

            }
        } catch (error) {
            console.log("error", error)
            setStatus(false);

        }
    };

    useEffect(() => {
        if (StartLocation && EndLocation && CurrentLocation) {
            fetchDirections();
        }
    }, [StartLocation, EndLocation, CurrentLocation]);

    const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return <div>Google Maps API key is missing!</div>;
    }

    return (
        <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['geometry']}>
            <div className='flex justify-center'>
                <GoogleMap
                    mapContainerStyle={{ width: '80%', height: '500px' }}
                    zoom={14}
                    center={CurrentLocation || StartLocation || EndLocation}
                    options={{ cursor: 'crosshair' }}
                    className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg"
                >
                    {StartLocation && (
                        <CustomMarker
                            position={StartLocation}
                            iconUrl={markerIcons.start}
                            size={{ width: 50, height: 50 }}
                        />
                    )}

                    {EndLocation && (
                        <CustomMarker
                            position={EndLocation}
                            iconUrl={markerIcons.end}
                            size={{ width: 40, height: 40 }}
                        />
                    )}

                    {CurrentLocation && (
                        <CustomMarker
                            position={CurrentLocation}
                            iconUrl={markerIcons.current}
                            size={{ width: 50, height: 50 }}
                        />
                    )}

                    {routeDetails && routeDetails.startToEndPolyline && (
                        <Polyline
                            path={google.maps.geometry.encoding.decodePath(routeDetails.startToEndPolyline)}
                            options={{
                                strokeColor: '#0000FF',
                                strokeOpacity: 0.6,
                                strokeWeight: 5,
                            }}
                        />
                    )}
                </GoogleMap>
            </div>

            {status ? (
                <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
                    <p className="text-lg mb-2">Loading route details...</p>
                </div>
            ) : (
                routeDetails && (
                    <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
                           <h1 className="text-2xl font-bold mb-4">Duration & Distance</h1>
                        <p className="text-lg mb-2">Duration from Start to End: {routeDetails.startToEndDuration}</p>
                        <p className="text-lg mb-2">Distance from Start to End: {routeDetails.startToEndDistance}</p>
                        <p className="text-lg mb-2">Duration from End to Current Location: {routeDetails.endToCurrentDuration}</p>
                        <p className="text-lg">Distance from End to Current Location: {routeDetails.endToCurrentDistance}</p>
                    </div>
                )
            )}
        </LoadScript>
    );
};

export default MapComponent;
