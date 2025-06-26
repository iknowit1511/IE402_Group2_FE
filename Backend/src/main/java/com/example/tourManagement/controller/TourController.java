package com.example.tourManagement.controller;

import com.example.tourManagement.dto.AddItineraryRequest;
import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.dto.TourDTO;
import com.example.tourManagement.service.interf.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tour")
public class TourController {

    @Autowired
    private TourService tourService;

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createTour(@RequestBody TourDTO tourDTO) {
        ResponseDTO response = tourService.createTour(tourDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO> getTourById(@PathVariable Integer id) {
        ResponseDTO response = tourService.getTourById(id);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> getAllTours() {
        ResponseDTO response = tourService.getAllTour();
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseDTO> updateTour(@PathVariable Integer id, @RequestBody TourDTO tourDTO) {
        ResponseDTO response = tourService.updateTour(id, tourDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteTour(@PathVariable Integer id) {
        ResponseDTO response = tourService.deleteTour(id);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }

    @PostMapping("/{tourId}/itineraries")
    public ResponseEntity<ResponseDTO> addItineraryToTour(@PathVariable Integer tourId, @RequestBody AddItineraryRequest request) {
        ResponseDTO response = tourService.addItineraryToTour(tourId, request);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
    }
}