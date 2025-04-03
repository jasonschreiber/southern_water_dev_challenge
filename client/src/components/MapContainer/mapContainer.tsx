import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

import fetchWeather from '../../APIs/api-calls'




//https://api.weatherapi.com/v1/current.json?key=4a6daee69765470da64203316250304&q=London&aqi=no

interface TownResult {
  name: string
  temp: number
  coords: L.LatLngExpression; // LatLngExpression for the coordinates for Leaflet
  markerIcon: L.Icon<L.IconOptions> | L.DivIcon | undefined; 
}
const MapComponent: React.FC = () => {
  const listOfTowns = ['Portsmouth','Worthing', 'LittleHampton', 'Brighton']

  const [townResults, setTownResults] = useState<TownResult[]>([]);

  useEffect(() => {
    // Function to fetch weather data for each town
    const fetchTownData = async () => {
      const results: TownResult[] = []; // Temporary array to hold results

      for (const town of listOfTowns) {
        try {
          const result = await fetchWeather(town); // Fetch the weather data
          if (result) {
            const name:string = result.location.name
            const temp: number = result.current.temp_c
            const coords: L.LatLngExpression = [result.location.lat, result.location.lon];
            const markerIcon = new L.Icon({
              iconUrl: markerIconPng, // Replace with your marker icon URL
              shadowUrl: markerShadowPng, // Replace with your shadow URL
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            });

            // Push the town result into the temporary array
            results.push({name, temp, coords, markerIcon });
          } else {
            console.error(`Weather data for ${town} is undefined or not available.`);
          }
        } catch (error) {
          console.error(`Error fetching weather data for ${town}:`, error);
        }
      }

      setTownResults(results); 
    };

    fetchTownData(); 
  }, []); 


  return (
    <div style={{ width: "100%", height: "800px" }}>
      <MapContainer center={[50.8199, -0.3901]} zoom={13} style={{ width: "100%", height: "100%", minHeight: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
       {
          townResults.map((result, index) => (     
            <Marker key={index} position={result.coords} icon={result.markerIcon}>
              <Popup>{`Town/City: ${result.name}`}<br />
              {`Temperature: ${result.temp}`}</Popup>
            </Marker>
          ))
        }
      </MapContainer>
    </div>
  );
};

export default MapComponent;