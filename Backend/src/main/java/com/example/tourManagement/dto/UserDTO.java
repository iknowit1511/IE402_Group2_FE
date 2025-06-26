package com.example.tourManagement.dto;

import com.example.tourManagement.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private Integer userId;
    private String userName;
    private String userEmail;
    private String userPhone;
    private String userAddress;
    private String userRole;


    private String userPassword;
    private List<BookingDTO> bookings = new ArrayList<>();
}