package com.example.tourManagement.service.interf;

import com.example.tourManagement.dto.ResponseDTO;

public interface MapService {
    ResponseDTO getAllLocations();
    ResponseDTO getAllRoutes();
    ResponseDTO getAllZones();

    ResponseDTO getLocationByTourId(Integer tourId);
}
