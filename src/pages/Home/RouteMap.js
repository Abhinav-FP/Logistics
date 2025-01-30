import { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker, Polyline } from "@react-google-maps/api";

const markerIcons = {
  start: "https://th.bing.com/th/id/OIP.ZCHVQMolgocE66TQdftn3wHaGA?rs=1&pid=ImgDetMain",
  end: "https://th.bing.com/th/id/OIP.hIhIc_XIUMQXr6J4BHdMzwHaF6?w=224&h=180&c=7&r=0&o=5&pid=1.7",
  current: "https://i.ibb.co/9TTs8Jk/material-symbols-local-shipping-outline.png"
};


const CurrentLocation = { lat: 26.9229, lng: 75.8269 };
const StartLocation = { lat: 26.852533, lng: 75.8213041 };
const EndLocation = { lat: 26.9299574, lng: 75.7830367 };

const CustomMarker = ({ position, iconUrl, size = { width: 40, height: 40 } }) => {
  return (
    <Marker
      position={position}
      icon={{
        url: iconUrl,
        scaledSize: new window.google.maps.Size(size.width, size.height)
      }}
    />
  );
};

const RouteMap = ({ routeDetails }) => {
  console.log("routeDetails",routeDetails)
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  console.log("isGoogleLoaded",isGoogleLoaded)
  useEffect(() => {
    if (window && window) {
      setIsGoogleLoaded(true);
    }
  }, []);
  const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
console.log("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY",NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  // Don't render the map if Google API hasn't loaded yet
  if (!isGoogleLoaded || !NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <LoadScript googleMapsApiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['geometry']}>
      <div className="flex justify-center">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '350px', borderRadius: "10px" }}
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
                path={window.google?.maps?.geometry?.encoding?.decodePath(routeDetails.StartToEndPolyline)}
                options={{
                  strokeColor: '#000FFF',
                  strokeOpacity: 0.3,
                  strokeWeight: 5,
                }}
              />

<Polyline
                path={window.google?.maps?.geometry?.encoding?.decodePath(routeDetails.StartToCurrentPolyline)}
                options={{
                  strokeColor: '#000FFF',
                  strokeOpacity: 0.3,
                  strokeWeight: 5,
                }}
              />

<Polyline
                path={window.google?.maps?.geometry?.encoding?.decodePath(routeDetails.currentToEndPolyline)}
                options={{
                  strokeColor: '#000000',
                  strokeOpacity: 0.3,
                  strokeWeight: 5,
                }}
              />


              {/* <Polyline
                path={window.google?.maps?.geometry?.encoding?.decodePath(routeDetails.StartToCurrentPolyline)}
                options={{
                  strokeColor: '#000FFF',
                  strokeOpacity: 0.6,
                  strokeWeight: 5,
                }}
              />
              <Polyline
                path={window.google?.maps?.geometry?.encoding?.decodePath(routeDetails.currentToEndPolyline)}
                options={{
                  strokeColor: '#000FFF',
                  strokeOpacity: 0.6,
                  strokeWeight: 5,
                }}
              /> */}
            </>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default RouteMap;
