package com.example.tourManagement.dto;

import lombok.Data;

import java.util.Map;

@Data
public class GeoJsonFeature {
    private String type = "Feature";
    private Map<String, Object> properties;
    private Map<String, Object> geometry;
}
