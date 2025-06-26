package com.example.tourManagement.repository;

import com.example.tourManagement.entity.TourZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TourZoneRepository extends JpaRepository<TourZone, Integer> {
     Optional<TourZone> findByZoneName(String zoneName);
}