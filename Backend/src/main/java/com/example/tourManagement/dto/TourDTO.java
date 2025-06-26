package com.example.tourManagement.dto;


import com.example.tourManagement.entity.Tour;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TourDTO {
    private Integer tourId;
    private String tourTitle;
    private String tourDescription;
    private BigDecimal tourPrice;
    private Integer tourDuration;
    private Integer tourCapacity;
    private String tourStatus;

    private Integer tourCreatedByUserId;
    private List<Integer> locationIds;
    private List<ItineraryDTO> itineraries;
}