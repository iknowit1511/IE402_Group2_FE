package com.example.tourManagement.repository;

import com.example.tourManagement.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Wishlist.WishlistId> {
    List<Wishlist> findByUser_UserId(Integer userId);
    List<Wishlist> findByTour_TourId(Integer tourId);
}