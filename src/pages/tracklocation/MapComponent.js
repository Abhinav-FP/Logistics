import { GoogleMap, Marker, Polyline, LoadScript, TrafficLayer } from '@react-google-maps/api';
import React from 'react';

const MapComponent = ({ EndLocation, StartLocation, CurrentLocation, routeDetails, driverAccept }) => {
  
    const routesData = [
        {
            mode: 'flight',  // Mode of transport (flight, train, bus, etc.)
            startLocation: { lat: 40.7128, lng: -74.0060 },  // New York City coordinates
            endLocation: { lat: 34.0522, lng: -118.2437 },  // Los Angeles coordinates
            polyline: "encoded_polyline_string",  // Encoded polyline for the route (for Google Maps)
        },
        {
            mode: 'train',  // Train route
            startLocation: { lat: 51.5074, lng: -0.1278 },  // London coordinates
            endLocation: { lat: 48.8566, lng: 2.3522 },    // Paris coordinates
            polyline: "encoded_polyline_string",
        },
        {
            mode: 'bus',  // Bus route
            startLocation: { lat: 35.6762, lng: 139.6503 },  // Tokyo coordinates
            endLocation: { lat: 34.0522, lng: -118.2437 },  // Los Angeles coordinates
            polyline: "encoded_polyline_string",
        },
    ];
    
    const markerIcons = {
        start: {
            // url: "data:image/svg+xml;base64,PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgaGVpZ2h0PSIyMDBweCIgd2lkdGg9IjIwMHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDBoMjR2MjRIMHoiPjwvcGF0aD48cGF0aCBkPSJNMjAgOC4zNVYxOWgtMnYtOEg2djhINFY4LjM1bDgtMy4yIDggMy4yem0yIDExVjdsLTEwLTEyLTEwIDd2MTRoNnYtOGg4djhoNnoiPjwvcGF0aD48L3N2Zz4=",
            url:"https://logistics-manage.s3.eu-north-1.amazonaws.com/Start.png",
            scaledSize: { width: 40, height: 40 },
        },
        end: {
            // url: "data:image/svg+xml;base64,PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAiIHZpZXdCb3g9IjAgMCA1NzYgNTEyIiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU3NS44IDI1NS41YzAgMTgtMTUgMzIuMS0zMiAzMi4xbC0zMiAwIC43IDE2MC4yYzAgMi43LS4yIDUuNC0uNSA4LjFsMCAxNi4yYzAgMjIuMS0xNy45IDQwLTQwIDQwbC0xNiAwYy0xLjEgMC0yLjIgMC0zLjMtLjFjLTEuNCAuMS0yLjggLjEtNC4yLjFMMzE2IDUxMmw0OC0yMi0yNCAwYy0yMi4xIDAtNDAtMTcuOS00MC00MGwwLTI0IDAtNjRjMC0xNy43LTE0LjMtMzItMzItMzJsLTY0IDAtMzIgMGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJsMCA2NCAwIDI0YzAgMjIuMS0xNy45IDQwLTQwIDQwbC0yNCAwLTMxLjkgMGMtMS41IDAtMy0uMS00LjUtLjJjLTEuMi4xLTIuNC4yLTMuNi4ybC0xNiAwYy0yMi4xIDAtNDAtMTcuOS00MC00MGwwLTExMnMwLTEuOSAuMS0yLjhMMCAzMS45YzAgOSAyNCBDNDQyLjhjOC03IDE1LTggMjEtOHM1LTEyIDUuOWM4IDcgMTUgOCwxMiA0em0tMTEgNmg2NjB2MjEwLDEgMDI4LTE2LTQwbDE2MC4yLTAyLjczcy0zMjAuNi00NzEuMyA0MC0yLjczMCAzMiAxNC0zLTgiLz48L3N2Zz4=",
            url:"https://logistics-manage.s3.eu-north-1.amazonaws.com/Destination.png",
            scaledSize: { width: 40, height: 40 },
        },
        current: {
            // url: "data:image/svg+xml;base64,PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAiIHZpZXdCb3g9IjAgMCA2NDAgNTEyIiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY0IDMyQzI4LjcgMzIgMCA2MC43IDAgOTZMMCAzMDRsMCA4MCAwIDE2YzAgNDQuMiAzNS44IDgwIDgwIDgwYzI2LjIgMCA0OS40LTEyLjYgNjQtMzJjMTQuNiAxOS40IDM3LjggMzIgNjQgMzJjNDQuMiAwIDgwLTM1LjggODAtODBjMC01LjUtLjYtMTAuOC0xLjYtMTZMMzMwIDM4NGwzMy42IDBjLTEgNS4yLTEuNiAxMC41LTEuNiAxNmMwIDQ0LjIgMzUuOCA4MCA4MCA4MHM4MC0zNS44IDgwLTgwYzAtNS41LS42LTEwLjgtMS42LTE2bDEuNiAwYzE3LjcgMCAzMi0xNC4zIDMyLTMybDAtNjQgMC0xNiAwLTEwLjNjMC05LjItMy4yLTE4LjItOS0yNS4zbC01OC44LTcxLjhjLTEwLjYtMTMtMjYuNS0yMC41LTQzLjMtMjAuNUw0ODAgMTQ0bDAtNDhjMC0zNS4zLTI4LjctNjQtNjQtNjRMNjQgMzJ6bTE4OSAyNTZsLTEwNSAwIDAtNjQgNDguOCAwYzIuNCAwIDQuNyAxLjEgNi4yIDIuOUw1ODUgMjU2em0tNTcuNiAzMjhhMzIgMzIgMCAxIDEgMCA2NCAzMiAzMiAwIDEgMSAwLTY0ek0xNzYgNDAwYTM0IDMyIDMyIDAgMSAxIDY0IDAgMzIgMzIgMCAxIDEgLTY0IDB6TTgwIDM2OGEzMiAzMiAwIDEgMSAwIDY0IDMyIDMyIDAgMSAxIDAtNjR6Ij48L3BhdGg+PC9zdmc+",
            url:"https://logistics-manage.s3.eu-north-1.amazonaws.com/Vehicle.png",
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
