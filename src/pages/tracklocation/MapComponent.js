import { GoogleMap, Marker, Polyline, LoadScript, TrafficLayer } from '@react-google-maps/api';
import React from 'react';

const MapComponent = ({ EndLocation, StartLocation, CurrentLocation, routeDetails, driverAccept }) => {
  

    
    const markerIcons = {
        start: {
            url:"https://logistics-manage.s3.eu-north-1.amazonaws.com/Warehouse.png",
            scaledSize: { width: 40, height: 40 },
        },
        end: {
            url:"https://logistics-manage.s3.eu-north-1.amazonaws.com/End.png",
            scaledSize: { width: 40, height: 40 },
        },
        current: {
            url:"https://logistics-manage.s3.eu-north-1.amazonaws.com/Current.png",
            scaledSize: { width: 40, height: 40 },
        },
    };

    const CustomMarker = ({ position, icon }) => {
        return <Marker position={position} icon={icon} />;
    };

    const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return <div>Google Maps API key is missing!</div>;
    }

    const decodePolyline = (encodedPath) => {
        if (window.google && google.maps.geometry && encodedPath) {
            return google.maps.geometry.encoding.decodePath(encodedPath);
        }
        return [];
    };

    const centerMap = () => {
        if (CurrentLocation?.length > 0) return { lat: CurrentLocation[0]?.lat, lng: CurrentLocation[0]?.lng };
        if (StartLocation) return { lat: StartLocation?.lat, lng: StartLocation?.lng };
        if (EndLocation) return { lat: EndLocation?.lat, lng: EndLocation?.lng };
    };

    return (
        <>
            <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['geometry']}>
                <div className='flex justify-center'>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '300px', borderRadius: "10px" }}
                        zoom={14}
                        center={centerMap()}
                        options={{ cursor: 'crosshair' }}
                    >
                        <TrafficLayer />
                        {driverAccept === "true" ? (
                            <>
                                {CurrentLocation && CurrentLocation?.length > 0 && (
                                    <CustomMarker
                                        key={CurrentLocation?.length - 1}
                                        position={{
                                            lat: CurrentLocation[CurrentLocation?.length - 1].lat,
                                            lng: CurrentLocation[CurrentLocation?.length - 1].lng
                                        }}
                                        icon={markerIcons.current}
                                    />
                                )}

                                {EndLocation && (
                                    <CustomMarker
                                        position={{ lat: EndLocation.lat, lng: EndLocation.lng }}
                                        icon={markerIcons.end}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                {StartLocation && (
                                    <CustomMarker
                                        position={{ lat: StartLocation.lat, lng: StartLocation.lng }}
                                        icon={markerIcons.start}
                                    />
                                )}

                                {EndLocation && (
                                    <CustomMarker
                                        position={{ lat: EndLocation.lat, lng: EndLocation.lng }}
                                        icon={markerIcons.end}
                                    />
                                )}
                            </>
                        )}




                        {driverAccept === "true" ? (
                            routeDetails?.CurrentToEndPolyline && (
                                <Polyline
                                    path={decodePolyline(routeDetails?.CurrentToEndPolyline)}
                                    options={{
                                        strokeColor: '#00BFFF',
                                        strokeOpacity: 0.5,
                                        strokeWeight: 5,
                                    }}
                                />
                            )

                        ) : (
                            routeDetails?.StartToEndPolyline && (
                                <Polyline
                                    path={decodePolyline(routeDetails?.StartToEndPolyline)}
                                    options={{
                                        strokeColor: '#FF00FF',
                                        strokeOpacity: 0.7,
                                        strokeWeight: 8,
                                    }}
                                />
                            )
                        )}

                        {/* {routeDetails?.EndToCurrentPolyline && (
                        <Polyline
                            path={decodePolyline(routeDetails?.EndToCurrentPolyline)}
                            options={{
                                strokeColor: '#00BFFF',
                                strokeOpacity: 0.5,
                                strokeWeight: 5,
                            }}
                        />
                    )} */}


                    </GoogleMap>
                </div>
            </LoadScript>
            {/* <DataMap  /> */}
        </>

    );
};

export default MapComponent;
