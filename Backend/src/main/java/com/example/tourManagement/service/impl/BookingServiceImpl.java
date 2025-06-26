package com.example.tourManagement.service.impl;

import com.example.tourManagement.dto.BookingDTO;
import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.entity.Booking;
import com.example.tourManagement.entity.Schedule;
import com.example.tourManagement.entity.User;
import com.example.tourManagement.repository.BookingRepository;
import com.example.tourManagement.repository.ScheduleRepository;
import com.example.tourManagement.repository.UserRepository;
import com.example.tourManagement.service.interf.BookingService;
import com.example.tourManagement.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;
    // Implement the methods from BookingService interface here
    @Override
    public ResponseDTO createBooking(Booking bookingRequest,int userId,int scheduleId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            // Logic to create a booking
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));
            Schedule schedule = scheduleRepository.findById(scheduleId)
                    .orElseThrow(() -> new NoSuchElementException("Schedule not found with ID: " + scheduleId));
            bookingRequest.setUser(user);
            bookingRequest.setSchedule(schedule);
            bookingRepository.save(bookingRequest);
            BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTO(bookingRequest);
            // For example, save the bookingDTO to the database
            responseDTO.setMessage("Booking created successfully");
            responseDTO.setStatusCode(200);

        } catch (Exception e) {
            responseDTO.setMessage("Error creating booking: " + e.getMessage());
            responseDTO.setStatusCode(500);
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getBookingById(Integer bookingId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new NoSuchElementException("Booking not found with ID: " + bookingId));
            BookingDTO bookingDTO = Utils.mapBookingEntityToBookingDTO(booking);
            responseDTO.setBookingDTO(bookingDTO);
            responseDTO.setMessage("Booking retrieved successfully");
            responseDTO.setStatusCode(200);
        } catch (NoSuchElementException e) {
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(404);
        } catch (Exception e) {
            responseDTO.setMessage("Error retrieving booking: " + e.getMessage());
            responseDTO.setStatusCode(500);

        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getAllBookings() {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            List<Booking> bookinglist = bookingRepository.findAll();
            List<BookingDTO> bookingDTOslist = Utils.mapBookingListEntityToBookingListDTO(bookinglist);
            responseDTO.setBookingList(bookingDTOslist);
            responseDTO.setMessage("All bookings retrieved successfully");
            responseDTO.setStatusCode(200);
        } catch (Exception e) {
            responseDTO.setMessage("Error retrieving bookings: " + e.getMessage());
            responseDTO.setStatusCode(500);
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO updateBooking(Integer bookingId, BookingDTO bookingDTO) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new NoSuchElementException("Booking not found with ID: " + bookingId));
            // Update booking details
            booking.setNumPeople(bookingDTO.getNumPeople());
            booking.setTotalPrice(bookingDTO.getTotalPrice());
            booking.setBookingStatus(bookingDTO.getBookingStatus());
            booking.setBookingDate(bookingDTO.getBookingDate());
            bookingRepository.save(booking);
            BookingDTO updatedBookingDTO = Utils.mapBookingEntityToBookingDTO(booking);
            responseDTO.setBookingDTO(updatedBookingDTO);
            responseDTO.setMessage("Booking updated successfully");
            responseDTO.setStatusCode(200);
        } catch (NoSuchElementException e) {
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(404);
        } catch (Exception e) {
            responseDTO.setMessage("Error updating booking: " + e.getMessage());
            responseDTO.setStatusCode(500);

        }
        return responseDTO;
    }

    @Override
    public ResponseDTO deleteBooking(Integer bookingId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new NoSuchElementException("Booking not found with ID: " + bookingId));
            bookingRepository.delete(booking);
            responseDTO.setMessage("Booking deleted successfully");
            responseDTO.setStatusCode(200);
        } catch (NoSuchElementException e) {
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(404);
        } catch (Exception e) {
            responseDTO.setMessage("Error deleting booking: " + e.getMessage());
            responseDTO.setStatusCode(500);
        }
        return responseDTO;
    }


}
