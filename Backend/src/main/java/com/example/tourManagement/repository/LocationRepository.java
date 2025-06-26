package com.example.tourManagement.repository;



import com.example.tourManagement.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {
    List<Location> findByLocationType(String locationType);
    List<Location> findByTourZone_ZoneId(Integer zoneId);
}