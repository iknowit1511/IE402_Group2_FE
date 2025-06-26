package com.example.tourManagement.dto;

import lombok.Data;

import java.util.List;

@Data
public class GeoJsonFeatureCollection {
    private String type = "FeatureCollection";
    private List<GeoJsonFeature> features;
}
