package com.example.tourManagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tour")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tour_id")
    private Integer tourId;

    @Column(name = "tour_title")
    private String tourTitle;

    @Column(name = "tour_description")
    private String tourDescription;

    @Column(name = "tour_price", precision = 12, scale = 2)
    private BigDecimal tourPrice;

    @Column(name = "tour_duration")
    private Integer tourDuration;

    @Column(name = "tour_capacity")
    private Integer tourCapacity;

    @Column(name = "tour_status")
    private String tourStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_created_by", referencedColumnName = "user_id")
    @ToString.Exclude
    private User tourCreatedBy;

    @ManyToMany
    @JoinTable(
            name = "tour_location",
            joinColumns = @JoinColumn(name = "tour_id"),
            inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    @ToString.Exclude
    private List<Location> locations;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<Itinerary> itineraries;

}