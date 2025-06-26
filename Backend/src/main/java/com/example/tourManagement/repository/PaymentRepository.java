package com.example.tourManagement.repository;


import com.example.tourManagement.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Optional<Payment> findByBooking_BookingId(Integer bookingId);
    List<Payment> findByPaymentStatus(String status);
}