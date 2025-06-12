// src/MapReview.js
import React, { useEffect, useState } from 'react';
import "./style.scss";
import Map from '../../components/Map_review/Map';
import Sidebar from '../../components/Map_review/Sidebar';
import axios from 'axios';

export default function MapReview() {
  const [locations, setLocations] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locResponse, routeResponse, zoneResponse] = await Promise.all([
          axios.get('http://localhost:8080/map/locations'),
          axios.get('http://localhost:8080/map/routes'),
          axios.get('http://localhost:8080/map/zones')
        ]);

        console.log('Locations:', locResponse.data);
        console.log('Routes:', routeResponse.data);
        console.log('Zones:', zoneResponse.data);

        const processGeoJSON = (data, key) => {
          return data[key]?.map(item => {
            const geometry = JSON.parse(item.geometry);
            return { ...item, geometry };
          }) || [];
        };

        // Lọc các địa điểm cố định cho tour Bạc Liêu
        const tourLocations = processGeoJSON(locResponse.data, 'locations').filter(location =>
          ['Nhà Công tử Bạc Liêu', 'Khu lưu niệm Nhạc sĩ Cao Văn Lầu', 'Phước Đức Cổ Miếu', 'Cánh đồng điện gió Bạc Liêu', 'Thiền viện Trúc Lâm Bạc Liêu'].includes(location.location_name)
        );
        setLocations(tourLocations);
        setRoutes(processGeoJSON(routeResponse.data, 'tourRoutes') || []);
        setZones(processGeoJSON(zoneResponse.data, 'tourZones') || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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