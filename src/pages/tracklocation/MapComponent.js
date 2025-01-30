import { GoogleMap, Marker, Polyline, LoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import Details from '../api/Listing/Details';

const MapComponent = ({ StartLocation, CurrentLocation, EndLocation }) => {
    const Id = "678f8a5225ab3bc62aea25ca";
    const [routeDetails, setRouteDetails] = useState(null);
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
            let response = null;
            if (Id) {
                response = await main.UpdateDirection({
                    CurrentLocation: `${CurrentLocation.lat},${CurrentLocation.lng}`,
                    Shipment_id: Id
                });
                if (response?.data?.data) {
                    setStatus(false);
                    setRouteDetails(response.data.data.routeDetails);
                } else {
                    setStatus(false);

                }
            } else {
                response = await main.direction({
                    StartLocation: `${StartLocation.lat},${StartLocation.lng}`,
                    EndLocation: `${EndLocation.lat},${EndLocation.lng}`,
                    CurrentLocation: `${CurrentLocation.lat},${CurrentLocation.lng}`
                });
                if (response?.data?.data) {
                    setStatus(false);
                    setRouteDetails(response.data.data.routeDetails);
                } else {
                    setStatus(false);

                }
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
                    mapContainerStyle={{ width: '100%', height: '300px', borderRadius:"10px" }}
                    zoom={14}
                    center={CurrentLocation || StartLocation || EndLocation}
                    options={{ cursor: 'crosshair' }}
                 
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

                    {routeDetails && routeDetails.StartToEndPolyline && (
                        <>

                            <Polyline
                                path={google.maps.geometry.encoding.decodePath(routeDetails.StartToEndPolyline)}
                                options={{
                                    strokeColor: '#000FFF',
                                    strokeOpacity: 0.3,
                                    strokeWeight: 5,
                                  }}
                            />
                            <Polyline
                                path={google.maps.geometry.encoding.decodePath(routeDetails.StartToCurrentPolyline)}
                                options={{
                                    strokeColor: '#000FFF',
                                    strokeOpacity: 0.3,
                                    strokeWeight: 5,
                                  }}
                            />
                            <Polyline
                                path={google.maps.geometry.encoding.decodePath(routeDetails.currentToEndPolyline)}
                                options={{
                                    strokeColor: '#000FFF',
                                    strokeOpacity: 0.3,
                                    strokeWeight: 5,
                                  }}
                            />
                        </>
                    )}
                </GoogleMap>
            </div>

            {/* {status ? (
                <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
                    <p className="text-lg mb-2">Loading route details...</p>
                </div>
            ) : (
                routeDetails && (
                    <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-4">Duration & Distance</h1>
                        <p className="text-lg mb-2">Duration from Start to End: {routeDetails.StartToEndDuration}</p>
                        <p className="text-lg mb-2">Distance from Start to End: {routeDetails.StartToEndDistance}</p>
                        <p className="text-lg mb-2">Duration from  Current to End Location: {routeDetails.currentToEndDuration}</p>
                        <p className="text-lg">Distance from Current to End Location: {routeDetails.currentToEndDistance}</p>
                        <p className="text-lg mb-2">Duration from Start to Current  Location: {routeDetails.StartToCurrentDuration}</p>
                        <p className="text-lg">Distance from Start to Current  Location: {routeDetails.StartToCurrentDistance}</p>
                    </div>
                )
            )} */}
        </LoadScript>
    );
};

export default MapComponent;
