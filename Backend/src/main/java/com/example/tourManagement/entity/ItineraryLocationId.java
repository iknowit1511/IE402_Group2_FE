package com.example.tourManagement.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItineraryLocationId implements Serializable {

    private static final long serialVersionUID = 1L;
    private Integer itineraryId;
    private Integer locationId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItineraryLocationId that = (ItineraryLocationId) o;
        return Objects.equals(itineraryId, that.itineraryId) &&
                Objects.equals(locationId, that.locationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itineraryId, locationId);
    }
}