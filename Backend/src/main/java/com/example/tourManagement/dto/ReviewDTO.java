package com.example.tourManagement.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReviewDTO {
    private Integer reviewId;
    private Integer tourId;
    private Integer userId;
    private Integer reviewRating;
    private String reviewComment;
    private LocalDateTime reviewDate;
}