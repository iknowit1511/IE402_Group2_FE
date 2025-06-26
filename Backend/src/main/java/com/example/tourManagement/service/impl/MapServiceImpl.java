package com.example.tourManagement.service.impl;

import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.service.interf.MapService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MapServiceImpl implements MapService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public ResponseDTO getAllLocations() {
        ResponseDTO dto = new ResponseDTO();

        List<Map<String, Object>> locations = entityManager.createNativeQuery("""
            SELECT 
                location_name, location_type, zone_id,
                ST_AsGeoJSON(geom) AS geometry
            FROM location
        """, Map.class).getResultList();

        dto.setStatusCode(200);
        dto.setMessage("Lấy danh sách địa điểm thành công!!!");
        dto.setLocations(locations);
        return dto;
    }

    @Override
    public ResponseDTO getAllRoutes() {
        ResponseDTO dto = new ResponseDTO();

        List<Map<String, Object>> routes = entityManager.createNativeQuery("""
            SELECT 
                tour_id, route_id,
                ST_AsGeoJSON(route_line) AS geometry
            FROM tour_route
        """, Map.class).getResultList();

        dto.setStatusCode(200);
        dto.setMessage("Lấy danh sách tuyến đường thành công!!!");
        dto.setTourRoutes(routes);
        return dto;
    }

    @Override
    public ResponseDTO getAllZones() {
        ResponseDTO dto = new ResponseDTO();

        List<Map<String, Object>> zones = entityManager.createNativeQuery("""
            SELECT 
                zone_name,
                ST_AsGeoJSON(geom) AS geometry
            FROM tour_zone
        """, Map.class).getResultList();

        dto.setStatusCode(200);
        dto.setMessage("Lấy danh sách vùng thành công!!!");
        dto.setTourZones(zones);
        return dto;
    }

    @Override
    public ResponseDTO getLocationByTourId(Integer tourId) {
        ResponseDTO dto = new ResponseDTO();
        List <Integer> locationIds = entityManager.createNativeQuery("""
            SELECT location_id
            FROM tour_location
            WHERE tour_id = :tourId
        """, Integer.class)
        .setParameter("tourId", tourId)
        .getResultList();

        List<Map<String, Object>> locations = entityManager.createNativeQuery("""
            SELECT 
                l.location_name, l.location_type, l.zone_id,
                ST_AsGeoJSON(l.geom) AS geometry
            FROM location l
            WHERE l.location_id IN :locationIds
        """, Map.class)
                .setParameter("locationIds", locationIds)
                .getResultList();

        dto.setStatusCode(200);
        dto.setMessage("Lấy danh sách địa điểm theo tour thành công!!!");
        dto.setLocations(locations);
        return dto;
    }
}
