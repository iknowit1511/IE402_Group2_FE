package com.example.tourManagement.service.impl;

import com.example.tourManagement.dto.*;
import com.example.tourManagement.entity.*; // Import all entities
import com.example.tourManagement.repository.*; // Import all repositories
import com.example.tourManagement.service.interf.TourService;
import com.example.tourManagement.utils.Utils;
import com.example.tourManagement.utils.Utils;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.WKTReader;
import org.locationtech.jts.io.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TourServiceImpl implements TourService {

    @Autowired
    private TourRepository tourRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ItineraryRepository itineraryRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private ItineraryLocationRepository itineraryLocationRepository;


    @Override
    @Transactional
    public ResponseDTO createTour(TourDTO tourDTO) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Tour tour = new Tour();
            tour.setTourTitle(tourDTO.getTourTitle());
            tour.setTourDescription(tourDTO.getTourDescription());
            tour.setTourPrice(tourDTO.getTourPrice());
            tour.setTourDuration(tourDTO.getTourDuration());
            tour.setTourCapacity(tourDTO.getTourCapacity());
            tour.setTourStatus(tourDTO.getTourStatus());

            if (tourDTO.getTourCreatedByUserId() != null) {
                User createdBy = userRepository.findById(tourDTO.getTourCreatedByUserId())
                        .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + tourDTO.getTourCreatedByUserId()));
                tour.setTourCreatedBy(createdBy);
            }

            Tour savedTour = tourRepository.save(tour);

            responseDTO.setTourDTO(Utils.mapTourEntityToTourDTO(savedTour));
            responseDTO.setMessage("Tour created successfully");
            responseDTO.setStatusCode(200);

        } catch (NoSuchElementException e) {
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(404);
        } catch (Exception e) {
            responseDTO.setMessage("Error creating tour: " + e.getMessage());
            responseDTO.setStatusCode(500);
        }
        return responseDTO;
    }

    @Override
    @Transactional
    public ResponseDTO getTourById(Integer tourId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Tour tour = tourRepository.findById(tourId)
                    .orElseThrow(() -> new NoSuchElementException("Tour not found with ID: " + tourId));

            if (tour.getItineraries() != null) {
                tour.getItineraries().size();
                for (Itinerary itinerary : tour.getItineraries()) {
                    if (itinerary.getItineraryLocations() != null) {
                        itinerary.getItineraryLocations().size();
                        itinerary.getItineraryLocations().forEach(il -> il.getLocation().getLocationId());
                    }
                }
            }

            TourDTO tourDTO = Utils.mapTourEntityToTourDTO(tour);
            responseDTO.setTourDTO(tourDTO);
            responseDTO.setMessage("Tour retrieved successfully");
            responseDTO.setStatusCode(200);
        } catch (NoSuchElementException e) {
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(404);
        } catch (Exception e) {
            responseDTO.setMessage("Error retrieving tour: " + e.getMessage());
            responseDTO.setStatusCode(500);
        }
        return responseDTO;
    }

    @Override
    @Transactional
    public ResponseDTO getAllTour() {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            List<Tour> tourList = tourRepository.findAll();

            for (Tour tour : tourList) {
                if (tour.getItineraries() != null) {
                    tour.getItineraries().size();
                    for (Itinerary itinerary : tour.getItineraries()) {
                        if (itinerary.getItineraryLocations() != null) {
                            itinerary.getItineraryLocations().size();
                            itinerary.getItineraryLocations().forEach(il -> il.getLocation().getLocationId());
                        }
                    }
                }
            }

            List<TourDTO> tourDTOsList = Utils.mapTourListEntityToTourListDTO(tourList);
            responseDTO.setTourList(tourDTOsList);
            responseDTO.setMessage("All tours retrieved successfully");
            responseDTO.setStatusCode(200);
        } catch (Exception e) {
            responseDTO.setMessage("Error retrieving tours: " + e.getMessage());
            responseDTO.setStatusCode(500);
        }
        return responseDTO;
    }

    @Autowired private TourRouteRepository tourRouteRepository;

    @Override
    @Transactional
    public ResponseDTO updateTour(Integer tourId, TourDTO tourDTO) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Tour tour = tourRepository.findById(tourId)
                    .orElseThrow(() -> new NoSuchElementException("Tour not found with ID: " + tourId));

            if (tourDTO.getTourTitle() != null) {
                tour.setTourTitle(tourDTO.getTourTitle());
            }

            if (tourDTO.getTourTitle() != null) {
                tour.setTourTitle(tourDTO.getTourTitle());
            }
            if (tourDTO.getTourDescription() != null) {
                tour.setTourDescription(tourDTO.getTourDescription());
            }
            if (tourDTO.getTourPrice() != null) {
                tour.setTourPrice(tourDTO.getTourPrice());
            }
            if (tourDTO.getTourDuration() != null) {
                tour.setTourDuration(tourDTO.getTourDuration());
            }
            if (tourDTO.getTourCapacity() != null) {
                tour.setTourCapacity(tourDTO.getTourCapacity());
            }
            if (tourDTO.getTourStatus() != null) {
                tour.setTourStatus(tourDTO.getTourStatus());
            }
            if (tourDTO.getTourCreatedByUserId() != null) {
                User createdBy = userRepository.findById(tourDTO.getTourCreatedByUserId())
                        .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + tourDTO.getTourCreatedByUserId()));
                tour.setTourCreatedBy(createdBy);
            }

            Tour updatedTour = tourRepository.save(tour);

            responseDTO.setTourDTO(Utils.mapTourEntityToTourDTO(updatedTour));
            responseDTO.setMessage("Tour updated successfully (basic properties only)");
            responseDTO.setStatusCode(200);
        } catch (NoSuchElementException e) {
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(404);
        } catch (Exception e) {
            responseDTO.setMessage("Error updating tour: " + e.getMessage());
            responseDTO.setStatusCode(500);
        }
        return responseDTO;
    }


    @Override
    @Transactional
    public ResponseDTO deleteTour(Integer tourId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Tour tour = tourRepository.findById(tourId)
                    .orElseThrow(() -> new NoSuchElementException("Tour not found with ID: " + tourId));

            tourRouteRepository.findByTour(tour).ifPresent(tourRouteRepository::delete);

            tourRepository.delete(tour);
            responseDTO.setMessage("Tour deleted successfully");
            responseDTO.setStatusCode(200);
        } catch (NoSuchElementException e) {
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(404);
        } catch (Exception e) {
            responseDTO.setMessage("Error deleting tour: " + e.getMessage());
            responseDTO.setStatusCode(500);
        }
        return responseDTO;
    }

    @Override
    @Transactional
    public ResponseDTO addItineraryToTour(Integer tourId, AddItineraryRequest request) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Tour tour = tourRepository.findById(tourId)
                    .orElseThrow(() -> new NoSuchElementException("Tour not found with ID: " + tourId));

            Itinerary itinerary = new Itinerary();
            itinerary.setTour(tour);
            itinerary.setDayNumber(request.getDayNumber());
            itinerary.setTitle(request.getTitle());
            itinerary.setDescriptions(request.getDescriptions());

            Itinerary savedItinerary = itineraryRepository.save(itinerary);

            if (request.getItineraryLocations() != null && !request.getItineraryLocations().isEmpty()) {
                List<ItineraryLocation> itineraryLocations = new ArrayList<>();
                request.getItineraryLocations().sort(Comparator.comparing(ItineraryLocationDTO::getSequenceOrder));

                for (ItineraryLocationDTO itLocDTO : request.getItineraryLocations()) {
                    Location location = locationRepository.findById(itLocDTO.getLocationId())
                            .orElseThrow(() -> new NoSuchElementException("Location not found with ID: " + itLocDTO.getLocationId()));

                    ItineraryLocationId itineraryLocationId = new ItineraryLocationId();
                    itineraryLocationId.setItineraryId(savedItinerary.getItineraryId());
                    itineraryLocationId.setLocationId(location.getLocationId());

                    ItineraryLocation itineraryLocation = new ItineraryLocation();
                    itineraryLocation.setId(itineraryLocationId);
                    itineraryLocation.setItinerary(savedItinerary);
                    itineraryLocation.setLocation(location);
                    itineraryLocation.setSequenceOrder(itLocDTO.getSequenceOrder());

                    itineraryLocations.add(itineraryLocation);
                }
                itineraryLocationRepository.saveAll(itineraryLocations);
                savedItinerary.setItineraryLocations(itineraryLocations);
            }
            if (tour.getItineraries() == null) {
                tour.setItineraries(new ArrayList<>());
            }
            tour.getItineraries().add(savedItinerary);


            responseDTO.setTourDTO(Utils.mapTourEntityToTourDTO(tour));
            responseDTO.setMessage("Itinerary added to tour successfully.");
            responseDTO.setStatusCode(200);

        } catch (NoSuchElementException e) {
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(404);
        } catch (Exception e) {
            responseDTO.setMessage("Error adding itinerary to tour: " + e.getMessage());
            responseDTO.setStatusCode(500);
        }
        return responseDTO;
    }
}