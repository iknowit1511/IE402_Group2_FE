package com.example.tourManagement.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.locationtech.jts.geom.LineString;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TourRouteDTO {
    private Integer routeId;
    private Integer tourId;
    private String routeLineWkt;
}