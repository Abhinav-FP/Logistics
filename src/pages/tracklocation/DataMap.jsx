import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = { lat: 26.9124, lng: 75.7873 }; // Jaipur center

const origin = "Jaipur, Rajasthan, India";
const destination = "Noida, Uttar Pradesh, India";

const TravelMap = () => {
  const [roadResponse, setRoadResponse] = useState(null);
  const [transitResponse, setTransitResponse] = useState(null);
  const [flightDetails, setFlightDetails] = useState("Fetching..."); // Placeholder

  // Directions API Callback (Road)
  const roadDirectionsCallback = (result, status) => {
    if (status === "OK") {
      setRoadResponse(result);
    } else {
      console.error("Error fetching road directions:", status);
    }
  };

  // Directions API Callback (Transit)
  const transitDirectionsCallback = (result, status) => {
    if (status === "OK") {
      setTransitResponse(result);
    } else {
      console.error("Error fetching transit directions:", status);
    }
  };


  useEffect(() => {
    // Fetch Road Data
    const roadUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=AIzaSyAZdS5ILSddnuGPqz1TbLNd24wApLunFGU`;
    fetch(roadUrl)
      .then(res => res.json())
      .then(data => {
        if (data.routes.length > 0) {
          setRoadResponse(data);
        }
      })
      .catch(error => console.error("Error fetching road data:", error));


    // Fetch Transit (Train) Data
    const transitUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=transit&key=AIzaSyAZdS5ILSddnuGPqz1TbLNd24wApLunFGU`;
    fetch(transitUrl)
      .then(res => res.json())
      .then(data => {
        if (data.routes.length > 0) {
          setTransitResponse(data);
        }
      })
      .catch(error => console.error("Error fetching transit data:", error));


    // Flight Data (Placeholder - Requires Google Places/Airports API)
    //  This is complex and would require a separate API call to get flight details
    //  and potentially multiple calls to handle different airlines/routes.
    //  A simplified placeholder is used here.
    setTimeout(() => {  // Simulate API call delay
      setFlightDetails("Approx. 1 hour (Non-stop)"); // Replace with actual API data
    }, 1500); // Simulate 1.5-second delay
  }, []);


  return (
    <div>
      <h2>Jaipur to Noida Travel Options</h2>
      <ul>
        <li>🚗 By Road: {roadResponse ? roadResponse.routes[0].legs[0].distance.text + " (~" + roadResponse.routes[0].legs[0].duration.text + ")" : "Fetching..."}</li>
        <li>🚆 By Train: {transitResponse && transitResponse.routes.length > 0 ? transitResponse.routes[0].legs[0].distance.text + " (~" + transitResponse.routes[0].legs[0].duration.text + ")" : "Fetching..."}</li>
        <li>✈️ By Flight: {flightDetails}</li>
      </ul>

      <LoadScript googleMapsApiKey="AIzaSyAZdS5ILSddnuGPqz1TbLNd24wApLunFGU">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
          {roadResponse && (
            <DirectionsRenderer directions={roadResponse} options={{
              polylineOptions: {
                color: "blue" // Road route color
              }
            }} />
          )}
          {transitResponse && (
            <DirectionsRenderer directions={transitResponse} options={{
              polylineOptions: {
                color: "green" // Transit route color
              }
            }} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default TravelMap;