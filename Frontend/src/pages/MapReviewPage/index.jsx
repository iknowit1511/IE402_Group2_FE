import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import "./style.scss";
import Map from '../../components/Map_review/Map';
import Sidebar from '../../components/Map_review/Sidebar';
import axios from 'axios';

export default function MapReview() {
  const { state } = useLocation(); // Get state from navigation
  const tourId = state?.tourId; // Extract tourId from state
  const [locations, setLocations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!tourId) {
        console.error('No tourId provided');
        return; // Exit if tourId is missing
      }

      try {
        const [locResponse, zoneResponse] = await Promise.all([
          axios.get(`http://localhost:8080/map/locations/tour/${tourId}`),
          axios.get(`http://localhost:8080/map/zones`)
          // Uncomment when routes API is ready
          // axios.get(`http://localhost:8080/map/routes/tour/${tourId}`),
        ]);

        const processGeoJSON = (data, key) => {
          return data[key]?.map(item => {
            const geometry = JSON.parse(item.geometry);
            return { ...item, geometry };
          }) || [];
        };

        setLocations(processGeoJSON(locResponse.data, 'locations'));
        // setRoutes(processGeoJSON(routeResponse.data, 'tourRoutes'));
        setZones(processGeoJSON(zoneResponse.data, 'tourZones'));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally show user-facing error
        alert('Failed to load tour data. Please try again later.');
      }
    };
    fetchData();
  }, [tourId]); // Add tourId to dependency array
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="app-container">
      <Sidebar 
        locations={locations} 
        onSelectLocation={handleLocationSelect} 
        selectedLocation={selectedLocation}
      />
      <Map 
        locations={locations} 
        routes={routes} 
        zones={zones}
        selectedLocation={selectedLocation}
      />
    </div>
  );
}