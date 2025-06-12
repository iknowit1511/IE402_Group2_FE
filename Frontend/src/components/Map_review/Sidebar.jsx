// src/components/Map_review/Sidebar.js
import React from 'react';

const Sidebar = ({ locations = [], onSelectLocation, selectedLocation }) => {
  const getMarkerColor = (index) => {
    const colors = ['blue', 'green', 'red', 'yellow', 'purple']; // Màu cho các địa điểm Bạc Liêu
    return colors[index % colors.length];
  };

  return (
    <div className="sidebar">
      <h2>Bạc Liêu khám phá - Dấu ấn <span>miền Tây</span></h2>
      {locations.length > 0 ? (
        locations.map((location, index) => (
          <div
            key={location.location_id || index}
            className={`location-item ${selectedLocation?.location_name === location.location_name ? 'selected' : ''}`}
            onClick={() => onSelectLocation(location)}
          >
            <div
              className="marker"
              style={{ backgroundColor: getMarkerColor(index) }}
            ></div>
            {index + 1}. {location.location_name} 
          </div>
        ))
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

export default Sidebar;