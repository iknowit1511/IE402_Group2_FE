package com.example.tourManagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "itinerary_location",
        uniqueConstraints = @UniqueConstraint(columnNames = {"itinerary_id", "sequence_order"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ItineraryLocation {

    @EmbeddedId
    @ToString.Exclude
    private ItineraryLocationId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itineraryId")
    @JoinColumn(name = "itinerary_id")
    @ToString.Exclude
    private Itinerary itinerary;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("locationId")
    @JoinColumn(name = "location_id")
    @ToString.Exclude
    private Location location;

    @Column(name = "sequence_order", nullable = false)
    private Integer sequenceOrder;
}
