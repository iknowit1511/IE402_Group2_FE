package com.example.tourManagement.repository;

import com.example.tourManagement.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByTour_TourId(Integer tourId);
    List<Review> findByUser_UserId(Integer userId);
    List<Review> findByReviewRatingGreaterThanEqual(Integer rating);
}