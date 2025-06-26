package com.example.tourManagement.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WishlistDTO {
    private Integer userId;
    private Integer tourId;
}