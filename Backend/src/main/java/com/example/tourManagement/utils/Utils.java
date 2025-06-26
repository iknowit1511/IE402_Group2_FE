package com.example.tourManagement.utils;

import com.example.tourManagement.dto.*;
import com.example.tourManagement.entity.*;

import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setUserId(user.getUserId());
        userDTO.setUserName(user.getUsername());
        userDTO.setUserEmail(user.getUserEmail());
        userDTO.setUserAddress(user.getUserAddress());
        userDTO.setUserPhone(user.getUserPhone());
        userDTO.setUserRole(user.getUserRole());

        if (user.getBookings() != null) {
            userDTO.setBookings(user.getBookings().stream()
                    .map(Utils::mapBookingEntityToBookingDTO)
                    .collect(Collectors.toList()));
        }

        return userDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setBookingId(booking.getBookingId());
        bookingDTO.setNumPeople(booking.getNumPeople());
        bookingDTO.setTotalPrice(bookingDTO.getTotalPrice());
        bookingDTO.setBookingStatus(bookingDTO.getBookingStatus());
        bookingDTO.setBookingDate(booking.getBookingDate());

        if (booking.getUser() != null) {
            bookingDTO.setUserId(booking.getUser().getUserId());
        }

        if (booking.getSchedule() != null) {
            bookingDTO.setScheduleId(booking.getSchedule().getScheduleId());
        }

        return bookingDTO;
    }

//    public static TourDTO mapTourEntityToTourDTO(Tour tour) {
//        TourDTO tourDTO = new TourDTO();
//
//        tourDTO.setTourId(tour.getTourId());
//        tourDTO.setTourTitle(tour.getTourTitle());
//        tourDTO.setTourDescription(tour.getTourDescription());
//        tourDTO.setTourCapacity(tour.getTourCapacity());
//        tourDTO.setTourPrice(tour.getTourPrice());
//        tourDTO.setTourStatus(tour.getTourStatus());
//        tourDTO.setTourDuration(tour.getTourDuration());
//
//        if (tour.getTourCreatedBy() != null) {
//            tourDTO.setTourCreatedByUserId(tour.getTourCreatedBy().getUserId());
//        }
//
//        if (tour.getLocations() != null) {
//            tourDTO.setLocationIds(tour.getLocations().stream()
//                    .map(Location::getLocationId)
//                    .collect(Collectors.toList()));
//        }
//
//        return tourDTO;
//    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookings) {
        return bookings.stream()
                .map(Utils::mapBookingEntityToBookingDTO)
                .collect(Collectors.toList());
    }

    public static TourDTO mapTourEntityToTourDTO(Tour tour) {
        if (tour == null) {
            return null;
        }
        TourDTO tourDTO = new TourDTO();
        tourDTO.setTourId(tour.getTourId());
        tourDTO.setTourTitle(tour.getTourTitle());
        tourDTO.setTourDescription(tour.getTourDescription());
        tourDTO.setTourPrice(tour.getTourPrice());
        tourDTO.setTourDuration(tour.getTourDuration());
        tourDTO.setTourCapacity(tour.getTourCapacity());
        tourDTO.setTourStatus(tour.getTourStatus());
        if (tour.getTourCreatedBy() != null) {
            tourDTO.setTourCreatedByUserId(tour.getTourCreatedBy().getUserId());
        }

        if (tour.getItineraries() != null && !tour.getItineraries().isEmpty()) {
            tourDTO.setItineraries(tour.getItineraries().stream()
                    // Sắp xếp theo dayNumber để có thứ tự logic
                    .sorted(java.util.Comparator.comparing(Itinerary::getDayNumber))
                    .map(Utils::mapItineraryEntityToItineraryDTO)
                    .collect(Collectors.toList()));
        }
        return tourDTO;
    }

    public static ItineraryDTO mapItineraryEntityToItineraryDTO(Itinerary itinerary) {
        if (itinerary == null) {
            return null;
        }
        ItineraryDTO itineraryDTO = new ItineraryDTO();
        itineraryDTO.setItineraryId(itinerary.getItineraryId());
        itineraryDTO.setDayNumber(itinerary.getDayNumber());
        itineraryDTO.setTitle(itinerary.getTitle());
        itineraryDTO.setDescriptions(itinerary.getDescriptions());
        if (itinerary.getItineraryLocations() != null && !itinerary.getItineraryLocations().isEmpty()) {
            itineraryDTO.setItineraryLocations(itinerary.getItineraryLocations().stream()
                    .sorted(java.util.Comparator.comparing(ItineraryLocation::getSequenceOrder))
                    .map(Utils::mapItineraryLocationEntityToDTO)
                    .collect(Collectors.toList()));
        }
        return itineraryDTO;
    }

    public static ItineraryLocationDTO mapItineraryLocationEntityToDTO(ItineraryLocation itineraryLocation) {
        if (itineraryLocation == null || itineraryLocation.getLocation() == null) {
            return null;
        }
        ItineraryLocationDTO dto = new ItineraryLocationDTO();
        dto.setLocationId(itineraryLocation.getLocation().getLocationId());
        dto.setSequenceOrder(itineraryLocation.getSequenceOrder());
        return dto;
    }


    public static List<TourDTO> mapTourListEntityToTourListDTO(List<Tour> tourList) {
        if (tourList == null) {
            return null;
        }
        return tourList.stream()
                .map(Utils::mapTourEntityToTourDTO)
                .collect(Collectors.toList());
    }

    public static Tour mapTourDTOToTourEntity(TourDTO tourDTO) {
        if (tourDTO == null) {
            return null;
        }
        Tour tour = new Tour();
        tour.setTourTitle(tourDTO.getTourTitle());
        tour.setTourDescription(tourDTO.getTourDescription());
        tour.setTourPrice(tourDTO.getTourPrice());
        tour.setTourDuration(tourDTO.getTourDuration());
        tour.setTourCapacity(tourDTO.getTourCapacity());
        tour.setTourStatus(tourDTO.getTourStatus());
        return tour;
    }
}
