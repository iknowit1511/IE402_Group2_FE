package com.example.tourManagement.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.locationtech.jts.geom.Point;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LocationDTO {
    private Integer locationId;
    private String locationName;
    private String locationDescription;
    private Double latitude;
    private Double longitude;
    private String locationType;
    private String locationImage;
    private String geomWkt;

    private Integer zoneId;
}