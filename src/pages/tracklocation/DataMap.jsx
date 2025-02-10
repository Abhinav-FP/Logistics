import { GoogleMap, Marker, Polyline, LoadScript, TrafficLayer } from '@react-google-maps/api';

const DataMap = ({ EndLocation, StartLocation, CurrentLocation, routeDetails, driverAccept, selectedCountry }) => {

    const markerIcons = {
        start: {
            // Your start marker icon
        },
        end: {
            // Your end marker icon
        },
        current: {
            // Your current marker icon
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
        if (selectedCountry) {
            // Adjust this logic based on how you want to center the map by country or location
            const countryCoordinates = {
                "USA": { lat: 37.0902, lng: -95.7129 }, // Example coordinates for USA
                "India": { lat: 20.5937, lng: 78.9629 }, // Example coordinates for India
                // Add more countries and their coordinates
            };
            return countryCoordinates[selectedCountry] || { lat: 20.5937, lng: 78.9629 }; // Default to India if no country selected
        }

        if (CurrentLocation?.length > 0) return { lat: CurrentLocation[0]?.lat, lng: CurrentLocation[0]?.lng };
        if (StartLocation) return { lat: StartLocation?.lat, lng: StartLocation?.lng };
        if (EndLocation) return { lat: EndLocation?.lat, lng: EndLocation?.lng };
    };

    return (
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
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default DataMap;
