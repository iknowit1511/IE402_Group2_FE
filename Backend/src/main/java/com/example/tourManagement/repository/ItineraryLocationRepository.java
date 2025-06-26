package com.example.tourManagement.repository;

import com.example.tourManagement.entity.Itinerary;
import com.example.tourManagement.entity.ItineraryLocation;
import com.example.tourManagement.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryLocationRepository extends JpaRepository<ItineraryLocation, Integer> {
}
