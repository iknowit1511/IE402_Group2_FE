package com.example.tourManagement.dto;

import com.example.tourManagement.entity.Booking;
import com.example.tourManagement.entity.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {
    private String userEmail;
    private String token;
    private String expirationTime;
    private String userRole;

    private int statusCode;
    private String message;

    private UserDTO userDTO;
    private TourDTO tourDTO;
    private TourZoneDTO tourZoneDTO;
    private LocationDTO locationDTO;
    private BookingDTO bookingDTO;
    private List<UserDTO> userList;
    private List<BookingDTO> bookingList;
    private List<TourDTO> tourList;

    private TourRouteDTO tourRouteDTO;

    private List<Map<String, Object>> locations;
    private List<Map<String, Object>> tourRoutes;
    private List<Map<String, Object>> tourZones;
}
