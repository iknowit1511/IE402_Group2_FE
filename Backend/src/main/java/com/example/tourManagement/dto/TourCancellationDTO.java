package com.example.tourManagement.dto;



import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TourCancellationDTO {
    private Integer cancelId;
    private Integer bookingId;
    private LocalDateTime cancelDate;
    private String reason;
}