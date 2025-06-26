package com.example.tourManagement.service.interf;

import com.example.tourManagement.dto.RequestDTO;
import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.dto.BookingDTO;
import com.example.tourManagement.entity.Booking;


import java.util.List;

public interface BookingService {
    ResponseDTO createBooking(Booking bookingRequest, int userId, int scheduleId);
    ResponseDTO getBookingById(Integer bookingId);
    ResponseDTO getAllBookings();
    ResponseDTO updateBooking(Integer bookingId, BookingDTO bookingDTO);
    ResponseDTO deleteBooking(Integer bookingId);
}
