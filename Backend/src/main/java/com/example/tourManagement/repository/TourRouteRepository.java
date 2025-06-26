package com.example.tourManagement.repository;


import com.example.tourManagement.entity.Tour;
import com.example.tourManagement.entity.TourRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TourRouteRepository extends JpaRepository<TourRoute, Integer> {
    Optional<TourRoute> findByTour(Tour tourId);
}