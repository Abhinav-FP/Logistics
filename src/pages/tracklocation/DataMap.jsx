import { GoogleMap, Marker, Polyline, LoadScript, TrafficLayer } from '@react-google-maps/api';
import React from 'react'

const DataMap = ({ routesData }) => {
    const markerIcons = {
        flight: {
            url: "https://img.icons8.com/color/48/000000/airport.png", // Airplane icon
            scaledSize: { width: 40, height: 40 },
        },
        train: {
            url: "https://img.icons8.com/color/48/000000/train.png", // Train icon
            scaledSize: { width: 40, height: 40 },
        },
        bus: {
            url: "https://img.icons8.com/color/48/000000/bus.png", // Bus icon
            scaledSize: { width: 40, height: 40 },
        },
        waterway: {
            url: "https://img.icons8.com/color/48/000000/ship.png", // Ship icon
            scaledSize: { width: 40, height: 40 },
        },
        roadway: {
            url: "https://img.icons8.com/color/48/000000/car.png", // Car icon
            scaledSize: { width: 40, height: 40 },
        },
    };

    const decodePolyline = (encodedPath) => {
        if (window.google && google.maps.geometry && encodedPath) {
            return google.maps.geometry.encoding.decodePath(encodedPath);
        }
        return [];
    };

    const centerMap = () => {
        return routesData[0]?.startLocation; // Default center based on the first route's start location
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyAZdS5ILSddnuGPqz1TbLNd24wApLunFGU" libraries={['geometry']}>
            <div className='flex justify-center'>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '300px', borderRadius: "10px" }}
                    zoom={14}
                    center={centerMap()}
                    options={{ cursor: 'crosshair' }}
                >
                    <TrafficLayer />
                    {routesData.map((route, index) => {
                        const { startLocation, endLocation, mode, polyline } = route;

                        const icon = markerIcons[mode.toLowerCase()] || markerIcons.roadway;

                        return (
                            <React.Fragment key={index}>
                                {/* Start Marker */}
                                <Marker
                                    position={startLocation}
                                    icon={icon}
                                />

                                {/* End Marker */}
                                <Marker
                                    position={endLocation}
                                    icon={icon}
                                />

                                {/* Polyline (Route) */}
                                <Polyline
                                    path={decodePolyline(polyline)}
                                    options={{
                                        strokeColor: mode === 'flight' ? '#1E90FF' :
                                                     mode === 'train' ? '#FFD700' :
                                                     mode === 'bus' ? '#FF6347' :
                                                     mode === 'waterway' ? '#20B2AA' :
                                                     '#32CD32',
                                        strokeOpacity: 0.6,
                                        strokeWeight: 5,
                                    }}
                                />
                            </React.Fragment>
                        );
                    })}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default DataMap;
