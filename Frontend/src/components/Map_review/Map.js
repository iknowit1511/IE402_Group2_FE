// src/components/Map_review/Map.js
import React, { useEffect, useRef } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
// import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';

const MapComponent = ({ locations, routes, zones, selectedLocation }) => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (!mapDiv.current) return;

    const map = new Map({
      basemap: 'topo-vector'
    });

    const calculateCenter = (locations) => {
      if (!locations || locations.length === 0) return [0, 0];
      const total = locations.reduce(
        (acc, loc) => {
          acc[0] += loc.geometry.coordinates[0];
          acc[1] += loc.geometry.coordinates[1];
          return acc;
        },
        [0, 0]
      );
      return [total[0] / locations.length, total[1] / locations.length];
    };

    const centerCoordinates = calculateCenter(locations);

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: centerCoordinates, // Tọa độ trung tâm tính từ các điểm
      zoom: 13,
      highlightOptions: {
        color: 'blue'
      }
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Hàm tạo Graphic cho zones
    const withZone = (data) => {
      return new Graphic({
        geometry: { type: 'polygon', rings: data.geometry.coordinates[0] },
        symbol: new SimpleFillSymbol({
          color: data.color || [255, 255, 0, 0.3],
          outline: { color: [255, 255, 0], width: 1 }
        }),
        attributes: { zone_name: data.zone_name },
        popupTemplate: {
          title: '{zone_name}',
          content: '<a>Dân số: {population} <br> Diện tích: {area} km²</a> <br>'
        }
      });
    };

    // Hàm tạo Graphic cho routes
    // const withRoute = (data) => {
    //   return new Graphic({
    //     geometry: { type: 'polyline', paths: data.geometry.coordinates },
    //     symbol: new SimpleLineSymbol({
    //       color: [178, 30, 53],
    //       width: 4
    //     }),
    //     attributes: { tour_id: data.tour_id, title: data.route_id },
    //     popupTemplate: {
    //       title: '{tour_id || title}',
    //       content: '<a>Chiều dài: {length} km <br>{description}</a> <br>'
    //     }
    //   });
    // };

    // Hàm tạo Graphic cho locations với số thứ tự
    const withPoint = (data, index) => {
      const number = index + 1; // Bắt đầu từ 1 thay vì 0
      return new Graphic({
        geometry: { type: 'point', longitude: data.geometry.coordinates[0], latitude: data.geometry.coordinates[1] },
        symbol: new TextSymbol({
          text: number.toString(),
          color: 'black',
          font: {
            size: 12,
            family: 'Arial',
            weight: 'bold'
          },
          haloColor: 'white',
          haloSize: 1,
          yoffset: 10 // Điều chỉnh vị trí số trên marker
        }),
        attributes: { location_name: data.location_name, longitude: data.geometry.coordinates[0], latitude: data.geometry.coordinates[1] },
        popupTemplate: {
          title: '{location_name}',
          content: '<a>Toạ độ: {longitude}, {latitude}</a> <br> Mô tả: {description}'
        }
      });
    };

    // Thêm zones
    zones.forEach((zone) => {
      graphicsLayer.add(withZone(zone));
    });

    // Thêm locations với số thứ tự
    locations.forEach((location, index) => {
      const pointGraphic = withPoint(location, index);
      graphicsLayer.add(pointGraphic);
    });

    // Thêm xử lý khi view được tải
    view.when(() => {
        // Thiết lập popup
      view.on('click', (event) => {
        const { mapPoint } = event;
        if (mapPoint) {
          view.popup.location = mapPoint; // Đặt vị trí popup tại điểm được click
          view.popup.title = 'Thông tin vị trí';
          view.popup.content = `Tọa độ: [${mapPoint.longitude.toFixed(4)}, ${mapPoint.latitude.toFixed(4)}]`;
          view.popup.visible = true; // Hiển thị popup
        } else {
          console.warn('Không thể lấy thông tin vị trí từ sự kiện click.');
        }
      });
    }).catch((error) => {
      console.error('Error loading MapView:', error);
    });
 

    // Thêm xử lý lỗi tải basemap
    view.when(() => {
      if (map.basemap && map.basemap.loadStatus === 'failed') {
        console.error('Basemap load failed:', map.basemap.loadError);
        map.basemap = 'streets-vector'; // Fallback basemap
        console.log('Switched to fallback basemap: streets-vector');
      }
    });
    
    // Thêm xử lý khi chọn location từ sidebar
    view.when(() => {
      if (selectedLocation) {
        const point = {
          type: 'point',
          longitude: selectedLocation.geometry.coordinates[0],
          latitude: selectedLocation.geometry.coordinates[1]
        };
        view.goTo({
          center: [point.longitude, point.latitude],
          zoom: 20 // Zoom vào điểm được chọn từ sidebar
        })
      }
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [locations, routes, zones, selectedLocation]);

  return (
    <div className="map-container">
      <div id="viewDiv" ref={mapDiv}></div>
    </div>
  );
};

export default MapComponent;