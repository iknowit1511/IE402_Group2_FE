package com.example.tourManagement.repository;


import com.example.tourManagement.entity.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Integer> {
    List<Itinerary> findByTour_TourIdOrderByDayNumberAsc(Integer tourId);
}