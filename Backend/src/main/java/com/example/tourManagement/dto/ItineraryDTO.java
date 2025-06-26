package com.example.tourManagement.dto;



import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.locationtech.jts.geom.Point;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ItineraryDTO {
    private Integer itineraryId;
    private Integer tourId;
    private Integer dayNumber;
    private String title;
    private String descriptions;

    private List<ItineraryLocationDTO> itineraryLocations;
}