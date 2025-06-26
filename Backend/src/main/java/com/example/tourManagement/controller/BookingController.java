package com.example.tourManagement.controller;

import com.example.tourManagement.dto.BookingDTO;
import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.entity.Booking;
import com.example.tourManagement.service.interf.BookingService;
import jakarta.annotation.security.PermitAll;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/create/{userId}/{scheduleId}")
    public ResponseEntity<ResponseDTO> saveBooking(@RequestBody Booking bookingRequest,
                                                   @PathVariable int userId,
                                                   @PathVariable int scheduleId) {
        ResponseDTO responseDTO = bookingService.createBooking(bookingRequest, userId, scheduleId);
        return ResponseEntity.status(responseDTO.getStatusCode())
                .body(responseDTO);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<ResponseDTO> getBookingById(@PathVariable Integer bookingId) {
        ResponseDTO responseDTO = bookingService.getBookingById(bookingId);
        return ResponseEntity.status(responseDTO.getStatusCode())
                .body(responseDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> getAllBookings() {
        ResponseDTO responseDTO = bookingService.getAllBookings();
        return ResponseEntity.status(responseDTO.getStatusCode())
                .body(responseDTO);
    }
    @PutMapping("/update/{bookingId}")
    public ResponseEntity<ResponseDTO> updateBooking(@PathVariable Integer bookingId,
                                                     @Valid @RequestBody BookingDTO bookingDTO) {
        ResponseDTO responseDTO = bookingService.updateBooking(bookingId, bookingDTO);
        return ResponseEntity.status(responseDTO.getStatusCode())
                .body(responseDTO);
    }
    @DeleteMapping("/delete/{bookingId}")
    public ResponseEntity<ResponseDTO> deleteBooking(@PathVariable Integer bookingId) {
        ResponseDTO responseDTO = bookingService.deleteBooking(bookingId);
        return ResponseEntity.status(responseDTO.getStatusCode())
                .body(responseDTO);
    }
}