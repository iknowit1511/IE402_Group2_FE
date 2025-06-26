package com.example.tourManagement.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ScheduleDTO {
    private Integer scheduleId;
    private LocalDateTime departureDate;
    private LocalDateTime returnDate;
    private Integer seatAvailable;
    private Integer tourId;
}