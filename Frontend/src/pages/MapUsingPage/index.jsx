import React from 'react';
import MapUsing from '../../components/Map_Using/MapUsing';
import './style.scss';
const MapUsingPage = ({ locations = [], routes = [] }) => {
  return (
    <div className="map-using-page">
      <div className="sidebar">
        <h3>Huế mộng mơ - Dấu ấn <span>co đô</span></h3>
        <ul>
          {locations.map((loc, index) => {
            const className = getMarkerClass(loc.visited, index, locations.length);
            return (
              <li
                key={index}
                className={`location-item ${className}`}
                onClick={() => {
                  const point = loc.geometry.coordinates;
                  console.log(`Zooming to: [${point[0]}, ${point[1]}]`);
                }}
              >
                <span className="marker-icon" />
                {loc.location_name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="map-container">
        <MapUsing locations={locations} routes={routes} />
      </div>
    </div>
  );
};

// Hàm lấy class name dựa trên trạng thái visited
const getMarkerClass = (visited, index, totalLength) => {
  if (visited) return 'visited'; // Gray for visited
  if (index + 1 === Math.min(3, totalLength)) return 'next'; // Yellow for next
  return 'unvisited'; // Blue for unvisited
};

export default MapUsingPage;