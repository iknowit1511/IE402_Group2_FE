package com.example.tourManagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "wishlist")
@Data
@IdClass(Wishlist.WishlistId.class)
public class Wishlist {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_id", referencedColumnName = "tour_id")
    private Tour tour;

    public static class WishlistId implements Serializable {
        private Integer user;
        private Integer tour;

        public WishlistId() {}

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            WishlistId that = (WishlistId) o;
            return user.equals(that.user) && tour.equals(that.tour);
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(user, tour);
        }
    }
}