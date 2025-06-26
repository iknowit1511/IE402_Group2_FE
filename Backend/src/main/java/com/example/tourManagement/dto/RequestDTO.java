package com.example.tourManagement.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class RequestDTO {
    private String userPassword;
    private String userEmail;

    private Integer bookingId;
    private String paymentMethod;
    private BigDecimal paymentAmount;
}
