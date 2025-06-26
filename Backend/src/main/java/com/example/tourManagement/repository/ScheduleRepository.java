package com.example.tourManagement.repository;


import com.example.tourManagement.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    List<Schedule> findByTour_TourId(Integer tourId);
    List<Schedule> findByDepartureDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}