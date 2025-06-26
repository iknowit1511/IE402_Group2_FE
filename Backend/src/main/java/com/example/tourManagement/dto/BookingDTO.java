package com.example.tourManagement.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {
    private Integer bookingId;
    private Integer userId;
    private Integer scheduleId;
    private Integer numPeople;
    private BigDecimal totalPrice;
    private String bookingStatus;
    private LocalDateTime bookingDate;
}