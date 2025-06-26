package com.example.tourManagement.dto;
import lombok.Data;
import java.util.List;

@Data
public class AddItineraryRequest {
    private Integer dayNumber;
    private String title;
    private String descriptions;
    private List<ItineraryLocationDTO> itineraryLocations;
}