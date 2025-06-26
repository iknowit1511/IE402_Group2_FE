package com.example.tourManagement.repository;

import com.example.tourManagement.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUser_UserId(Integer userId);
    List<Booking> findBySchedule_ScheduleId(Integer scheduleId);
    List<Booking> findByBookingStatus(String status);
}