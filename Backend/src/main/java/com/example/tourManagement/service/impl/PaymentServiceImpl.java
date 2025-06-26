package com.example.tourManagement.service.impl;

import com.example.tourManagement.dto.BookingDTO;
import com.example.tourManagement.dto.RequestDTO;
import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.entity.Booking;
import com.example.tourManagement.entity.Payment;
import com.example.tourManagement.repository.BookingRepository;
import com.example.tourManagement.repository.PaymentRepository;
import com.example.tourManagement.service.interf.NotificationService;
import com.example.tourManagement.service.interf.PaymentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    NotificationService notificationService;

    @Transactional
    @Override
    public ResponseDTO processPayment(RequestDTO requestDTO) {
        Optional<Booking> bookingOptional = bookingRepository.findById(requestDTO.getBookingId());

        if (bookingOptional.isEmpty()) {
            throw new RuntimeException("Booking not found!");
        }

        Booking booking = bookingOptional.get();
        if ("PAID".equalsIgnoreCase(booking.getBookingStatus())) {
            throw new RuntimeException("Booking already paid!");
        }

        booking.setBookingStatus("PAID");
        bookingRepository.save(booking);


        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setPaymentStatus("PAID");
        payment.setPaymentMethod(requestDTO.getPaymentMethod());

        if (requestDTO.getPaymentAmount() != null) {
            payment.setPaymentAmount(requestDTO.getPaymentAmount());
        } else {
            payment.setPaymentAmount(booking.getTotalPrice());
        }

        paymentRepository.save(payment);

        try {
            String toEmail = booking.getUser().getUserEmail();
            String subject = "Xác nhận thanh toán";
            String body = "Cảm ơn bạn đã thanh toán cho booking #" + booking.getBookingId();
            notificationService.sendPaymentConfirmation(toEmail, subject, body);
        } catch (Exception e) {
            throw new RuntimeException("Fail to mail!!", e);
        }

        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setBookingId(booking.getBookingId());
        bookingDTO.setUserId(booking.getUser().getUserId());
        bookingDTO.setScheduleId(booking.getSchedule().getScheduleId());
        bookingDTO.setNumPeople(booking.getNumPeople());
        bookingDTO.setTotalPrice(booking.getTotalPrice());
        bookingDTO.setBookingStatus(booking.getBookingStatus());
        bookingDTO.setBookingDate(booking.getBookingDate());

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setStatusCode(200);
        responseDTO.setMessage("Payment successful");
        responseDTO.setBookingDTO(bookingDTO);

        return responseDTO;
    }
}

