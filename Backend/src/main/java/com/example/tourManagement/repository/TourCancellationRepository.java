package com.example.tourManagement.repository;
;
import com.example.tourManagement.entity.TourCancellation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TourCancellationRepository extends JpaRepository<TourCancellation, Integer> {
    Optional<TourCancellation> findByBooking_BookingId(Integer bookingId);
}