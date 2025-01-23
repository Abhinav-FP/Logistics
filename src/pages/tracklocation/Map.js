import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { GoogleMap, Marker, DirectionsRenderer, LoadScript } from '@react-google-maps/api';
import axios from 'axios';

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
    const [routeDetails, setRouteDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDirections = async () => {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
            const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${StartLocation.lat},${StartLocation.lng}&destination=${EndLocation.lat},${EndLocation.lng}&key=${apiKey}`;
            const currentToStartUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${CurrentLocation.lat},${CurrentLocation.lng}&destination=${StartLocation.lat},${StartLocation.lng}&key=${apiKey}`;

            try {
                const startToEndResponse = await axios.get(directionsUrl);
                const currentToStartResponse = await axios.get(currentToStartUrl);

                if (startToEndResponse.data.status === 'OK' && currentToStartResponse.data.status === 'OK') {
                    const startToEndLeg = startToEndResponse.data.routes[0].legs[0];
                    const startToEndDistance = startToEndLeg.distance.text;
                    const startToEndDuration = startToEndLeg.duration.text;

                    const currentToStartLeg = currentToStartResponse.data.routes[0].legs[0];
                    const endToCurrentDistance = currentToStartLeg.distance.text;
                    const endToCurrentDuration = currentToStartLeg.duration.text;

                    setRouteDetails({
                        startToEndDistance,
                        endToCurrentDistance,
                        startToEndDuration,
                        endToCurrentDuration,
                    });

                    setDirections(startToEndResponse.data);
                } else {
                    console.error('Error fetching directions');
                }
            } catch (error) {
                console.error('Error fetching directions', error);
            }
            setLoading(false);
        };

        if (StartLocation && EndLocation && CurrentLocation) {
            fetchDirections();
        }
    }, [StartLocation, EndLocation, CurrentLocation]);

    const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    return (
        <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div className='flex justify-center'>
                <GoogleMap
                    mapContainerStyle={{ width: '80%', height: '500px' }}
                    zoom={14}
                    center={CurrentLocation || StartLocation || EndLocation}
                    options={{ cursor: 'crosshair' }}
                    className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg"
                >
                    {/* Start Location */}
                    {StartLocation && (
                        <CustomMarker
                            position={StartLocation}
                            iconUrl="https://th.bing.com/th/id/OIP.ZCHVQMolgocE66TQdftn3wHaGA?rs=1&pid=ImgDetMain"
                            size={{ width: 50, height: 50 }}
                        />
                    )}
                    {/* End Location */}
                    {EndLocation && (
                        <CustomMarker
                            position={EndLocation}
                            iconUrl="https://th.bing.com/th/id/OIP.hIhIc_XIUMQXr6J4BHdMzwHaF6?w=224&h=180&c=7&r=0&o=5&pid=1.7"
                            size={{ width: 40, height: 40 }}
                        />
                    )}
                    {/* Current Location */}
                    {CurrentLocation && (
                        <CustomMarker
                            position={CurrentLocation}
                            iconUrl="https://i.ibb.co/9TTs8Jk/material-symbols-local-shipping-outline.png"
                            size={{ width: 50, height: 50 }}
                        />
                    )}
                </GoogleMap>
            </div>

            {/* Display route details */}
            {loading ? (
                <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
                    <p className="text-lg mb-2">Loading route details...</p>
                </div>
            ) : (
                routeDetails && (
                    <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
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

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });






// import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
// import { GoogleMap, Marker, DirectionsRenderer, LoadScript } from '@react-google-maps/api';

// const CustomMarker = ({ position, iconUrl, size = { width: 40, height: 40 } }) => {
//     const icon = window.google
//         ? {
//             url: iconUrl,
//             scaledSize: new window.google.maps.Size(size.width, size.height),
//         }
//         : null;

//     return <Marker position={position} icon={icon} />;
// };

// const MapComponent = ({ StartLocation, CurrentLocation, EndLocation }) => {
//     const [directions, setDirections] = useState(null);
//     const [routeDetails, setRouteDetails] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (typeof window !== 'undefined' && window.google) {
//             const { google } = window;

//             if (google && google.maps) {
//                 const directionsService = new google.maps.DirectionsService();

//                 directionsService.route(
//                     {
//                         origin: StartLocation,
//                         destination: EndLocation,
//                         travelMode: google.maps.TravelMode.DRIVING,
//                     },
//                     (result, status) => {
//                         if (status === google.maps.DirectionsStatus.OK) {
//                             setDirections(result);
//                             const legStartToEnd = result.routes[0].legs[0];
//                             const startToEndDistance = legStartToEnd.distance.text;
//                             const startToEndDuration = legStartToEnd.duration.text;

//                             directionsService.route(
//                                 {
//                                     origin: CurrentLocation,
//                                     destination: StartLocation,
//                                     travelMode: google.maps.TravelMode.DRIVING,
//                                 },
//                                 (result, status) => {
//                                     if (status === google.maps.DirectionsStatus.OK) {
//                                         const legEndToCurrent = result.routes[0].legs[0];
//                                         const endToCurrentDistance = legEndToCurrent.distance.text;
//                                         const endToCurrentDuration = legEndToCurrent.duration.text;
//                                         setRouteDetails({
//                                             startToEndDistance,
//                                             endToCurrentDistance,
//                                             startToEndDuration,
//                                             endToCurrentDuration,
//                                         });
//                                     } else {
//                                         console.error(`Error fetching directions: ${status}`);
//                                     }
//                                     setLoading(false);
//                                 }
//                             );
//                         } else {
//                             console.error(`Error fetching directions: ${status}`);
//                             setLoading(false);
//                         }
//                     }
//                 );
//             } else {
//                 console.error('Google Maps API is not properly loaded.');
//                 setLoading(false);
//             }
//         }
//     }, [StartLocation, EndLocation, CurrentLocation]);

//     const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//     return (
//         <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
//             <div className='flex justify-center'>
//                 <GoogleMap
//                     mapContainerStyle={{ width: '80%', height: '500px' }}
//                     zoom={14}
//                     center={CurrentLocation || StartLocation || EndLocation}
//                     options={{ cursor: 'crosshair' }}
//                     className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg"
//                 >
//                     {/* Start Location */}
//                     {StartLocation && (
//                         <CustomMarker
//                             position={StartLocation}
//                             iconUrl="https://th.bing.com/th/id/OIP.ZCHVQMolgocE66TQdftn3wHaGA?rs=1&pid=ImgDetMain"
//                             size={{ width: 50, height: 50 }}
//                         />
//                     )}
//                     {/* End Location */}
//                     {EndLocation && (
//                         <CustomMarker
//                             position={EndLocation}
//                             iconUrl="https://th.bing.com/th/id/OIP.hIhIc_XIUMQXr6J4BHdMzwHaF6?w=224&h=180&c=7&r=0&o=5&pid=1.7"
//                             size={{ width: 40, height: 40 }}
//                         />
//                     )}
//                     {/* Current Location */}
//                     {CurrentLocation && (
//                         <CustomMarker
//                             position={CurrentLocation}
//                             iconUrl="https://i.ibb.co/9TTs8Jk/material-symbols-local-shipping-outline.png"
//                             size={{ width: 50, height: 50 }}
//                         />
//                     )}
//                     {directions && <DirectionsRenderer directions={directions} />}
//                 </GoogleMap>
//             </div>

//             {/* Display route details */}
//             {loading ? (
//                 <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
//                     <p className="text-lg mb-2">Loading route details...</p>
//                 </div>
//             ) : (
//                 routeDetails && (
//                     <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
//                         <p className="text-lg mb-2">Duration from Start to End: {routeDetails.startToEndDuration}</p>
//                         <p className="text-lg mb-2">Distance from Start to End: {routeDetails.startToEndDistance}</p>
//                         <p className="text-lg mb-2">Duration from End to Current Location: {routeDetails.endToCurrentDuration}</p>
//                         <p className="text-lg">Distance from End to Current Location: {routeDetails.endToCurrentDistance}</p>
//                     </div>
//                 )
//             )}
//         </LoadScript>
//     );
// };

// export default dynamic(() => Promise.resolve(MapComponent), { ssr: false });

