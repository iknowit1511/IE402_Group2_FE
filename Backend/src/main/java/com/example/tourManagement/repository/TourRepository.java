package com.example.tourManagement.repository;


import com.example.tourManagement.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Integer> {
    List<Tour> findByTourStatus(String status);
    List<Tour> findByTourPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    List<Tour> findByTourDuration(Integer duration);
}