package com.example.tourManagement.controller;


import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.service.interf.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private MapService mapService;

    @GetMapping("/locations")
    public ResponseEntity<ResponseDTO> getAllLocations() {
        return ResponseEntity.ok(mapService.getAllLocations());
    }

    @GetMapping("/routes")
    public ResponseEntity<ResponseDTO> getAllRoutes() {
        return ResponseEntity.ok(mapService.getAllRoutes());
    }

    @GetMapping("/zones")
    public ResponseEntity<ResponseDTO> getAllZones() {
        return ResponseEntity.ok(mapService.getAllZones());
    }

    @GetMapping("/locations/tour/{tourId}")
    public ResponseEntity<ResponseDTO> getLocationByTourId(@PathVariable Integer tourId) {
        return ResponseEntity.ok(mapService.getLocationByTourId(tourId));
    }
}
