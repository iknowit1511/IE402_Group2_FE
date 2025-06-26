import React, { useEffect, useRef } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';

const MapUsing = ({ locations = [], routes = [] }) => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (!mapDiv.current) return;

    const map = new Map({
      basemap: 'topo-vector'
    });

    const calculateCenter = (locations) => {
      if (!locations.length) return [0, 0];
      const total = locations.reduce(
        (acc, loc) => [acc[0] + loc.geometry.coordinates[0], acc[1] + loc.geometry.coordinates[1]],
        [0, 0]
      );
      return [total[0] / locations.length, total[1] / locations.length];
    };

    const centerCoordinates = calculateCenter(locations);

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: centerCoordinates,
      zoom: 13,
      ui: { components: ['zoom', 'attribution'] }
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Hàm tạo Graphic cho zones (nếu có)
    const withZone = (data) => {
      return new Graphic({
        geometry: { type: 'polygon', rings: data.geometry.coordinates[0] },
        symbol: new SimpleFillSymbol({
          color: [255, 255, 0, 0.3],
          outline: { color: [255, 255, 0], width: 1 }
        }),
        attributes: { zone_name: data.zone_name }
      });
    };

    // Hàm tạo Graphic cho routes
    const withRoute = (data) => {
      return new Graphic({
        geometry: { type: 'polyline', paths: data.geometry.coordinates },
        symbol: new SimpleLineSymbol({
          color: [255, 0, 0, 1], // Red route
          width: 4
        }),
        attributes: { tour_id: data.tour_id }
      });
    };

    // Hàm tạo Graphic cho locations với số thứ tự và màu dựa trên trạng thái
    const withPoint = (data, index) => {
      const number = index + 1;
      const markerColor = getMarkerColor(data.visited, index, locations.length);
      const markerSymbol = new SimpleMarkerSymbol({
        style: 'circle',
        size: 24,
        color: markerColor,
        outline: { color: markerColor, width: 1 }
      });
      const textSymbol = new TextSymbol({
        text: number.toString(),
        color: 'white',
        font: { size: 12, family: 'Arial', weight: 'bold' },
        horizontalAlignment: 'center',
        verticalAlignment: 'middle'
      });
      const compositeSymbol = {
        type: 'point-2d',
        symbolLayers: [markerSymbol, textSymbol]
      };
      return new Graphic({
        geometry: { type: 'point', longitude: data.geometry.coordinates[0], latitude: data.geometry.coordinates[1] },
        symbol: compositeSymbol,
        attributes: { ...data, index },
        popupTemplate: {
          title: '{location_name}',
          content: `{location_name} <br><img src="{location_image || 'https://via.placeholder.com/100'}" alt="{location_name}" style="width:100px;height:80px;"><br>Toạ độ: [{longitude}, {latitude}]`
        }
      });
    };

    // Hàm lấy màu dựa trên trạng thái visited
    const getMarkerColor = (visited, index, totalLength) => {
      if (visited) return [128, 128, 128, 1]; // Gray for visited
      if (index + 1 === Math.min(3, totalLength)) return [255, 255, 0, 1]; // Yellow for next
      return [0, 0, 255, 1]; // Blue for unvisited
    };

    // Thêm zones (nếu có)
    // zones.forEach((zone) => graphicsLayer.add(withZone(zone)));

    // Thêm routes
    routes.forEach((route) => graphicsLayer.add(withRoute(route)));

    // Thêm locations
    locations.forEach((location, index) => {
      const pointGraphic = withPoint(location, index);
      graphicsLayer.add(pointGraphic);
    });

    // Thêm vị trí người dùng
    const addUserLocation = (coords) => {
      const userSymbol = new SimpleMarkerSymbol({
        style: 'circle',
        size: 12,
        color: [0, 0, 255, 0.7], // Semi-transparent blue
        outline: { color: [255, 255, 255, 1], width: 1 }
      });
      const userGraphic = new Graphic({
        geometry: { type: 'point', longitude: coords[0], latitude: coords[1] },
        symbol: userSymbol
      });
      graphicsLayer.add(userGraphic);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => addUserLocation([position.coords.longitude, position.coords.latitude]),
        (error) => console.error('Geolocation error:', error)
      );
    } else {
      addUserLocation([106.7, 10.8]); // Fallback coordinates
    }

    return () => {
      if (view) view.destroy();
    };
  }, [locations, routes]);

  return <div className="map-view" ref={mapDiv}></div>;
};

export default MapUsing;