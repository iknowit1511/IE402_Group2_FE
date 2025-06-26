package com.example.tourManagement.entity;


import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.LineString;

@Entity
@Table(name = "tour_route")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TourRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "route_id")
    private Integer routeId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_id", referencedColumnName = "tour_id", unique = true)
    @ToString.Exclude
    private Tour tour;

    @Column(name = "route_line", columnDefinition = "LINESTRING SRID 4326")
    @ToString.Exclude
    private LineString routeLine;
}