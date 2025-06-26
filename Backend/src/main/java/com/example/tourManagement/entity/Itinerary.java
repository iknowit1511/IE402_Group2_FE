package com.example.tourManagement.entity;

import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

import java.util.List;

@Entity
@Table(name = "itinerary")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "itinerary_id")
    private Integer itineraryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_id", referencedColumnName = "tour_id")
    @ToString.Exclude
    private Tour tour;

    @Column(name = "day_number")
    private Integer dayNumber;

    @Column(name = "title", length = 100)
    private String title;

    @Column(name = "descriptions", columnDefinition = "TEXT")
    private String descriptions;

    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<ItineraryLocation> itineraryLocations;
}