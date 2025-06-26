package com.example.tourManagement.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.locationtech.jts.geom.Polygon;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TourZoneDTO {
    private Integer zoneId;
    private String zoneName;
    private String zoneDescription;
    private String zoneImage;
    private String geomWkt;
}