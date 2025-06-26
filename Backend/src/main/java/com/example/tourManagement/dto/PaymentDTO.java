package com.example.tourManagement.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PaymentDTO {
    private Integer paymentId;
    private Integer bookingId;
    private LocalDateTime paymentDate;
    private BigDecimal paymentAmount;
    private String paymentMethod;
    private String paymentStatus;
}