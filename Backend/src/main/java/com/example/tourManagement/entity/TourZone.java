package com.example.tourManagement.entity;


import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Polygon;

@Entity
@Table(name = "tour_zone")
@Data
public class TourZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zone_id")
    private Integer zoneId;

    @Column(name = "zone_name", length = 100)
    private String zoneName;

    @Column(name = "zone_description")
    private String zoneDescription;


    @Column(name = "geom", columnDefinition = "POLYGON SRID 4326")
    private Polygon geom;

    @Column(name = "zone_image")
    private String zoneImage;
}