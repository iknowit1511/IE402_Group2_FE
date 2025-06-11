import React, { memo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import TourCard from "../../components/tourCard";
import "./style.scss";

function Tour() {
  return (
    <div className="tour-container">
      {/* <div className="breadcrumb">
        <a href="/" className="breadcrumb-link">
          Trang chủ
        </a>
        <span className="arrow"> &gt; </span>
        <a href="/tour" className="breadcrumb-link">
          <span className="current">Tour</span>
        </a>
      </div> */}

      <div className="search_bar">
        <input
          type="text"
          placeholder="Tìm kiếm tour bạn thích..."
          id="searchText"
          required
        />
        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass">
            <CiSearch strokeWidth={1} />
          </i>
        </button>
      </div>

      <h1 className="tour-title">Các tour phổ biến</h1>
      <div className="tour-list">
        <TourCard
          price={2000000}
          title="Huế Mộng Mơ – Dấu Ấn Cố Đô"
          schedule="3 ngày 2 đêm"
          rating={4.8}
          numReviews={98}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />

        <TourCard
          price={2490000}
          title="Xứ Thanh Gọi Mời – Về Với Lịch Sử"
          schedule="3 ngày 2 đêm"
          rating={4.5}
          numReviews={76}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />

        <TourCard
          price={2490000}
          title="Về Quê Bác – Khám Phá Nghệ An"
          schedule="3 ngày 2 đêm"
          rating={4.3}
          numReviews={66}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />
      </div>

      <h1 className="tour-title">Các tour mới</h1>
      <div className="tour-list">
        <TourCard
          price={2000000}
          title="Huế Mộng Mơ – Dấu Ấn Cố Đô"
          schedule="3 ngày 2 đêm"
          rating={4.8}
          numReviews={98}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />

        <TourCard
          price={2490000}
          title="Xứ Thanh Gọi Mời – Về Với Lịch Sử"
          schedule="3 ngày 2 đêm"
          rating={4.5}
          numReviews={76}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />

        <TourCard
          price={2490000}
          title="Về Quê Bác – Khám Phá Nghệ An"
          schedule="3 ngày 2 đêm"
          rating={4.3}
          numReviews={66}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />
      </div>

      <h1 className="tour-title">Các tour ngắn ngày</h1>
      <div className="tour-list">
        <TourCard
          price={2000000}
          title="Huế Mộng Mơ – Dấu Ấn Cố Đô"
          schedule="3 ngày 2 đêm"
          rating={4.8}
          numReviews={98}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />

        <TourCard
          price={2490000}
          title="Xứ Thanh Gọi Mời – Về Với Lịch Sử"
          schedule="3 ngày 2 đêm"
          rating={4.5}
          numReviews={76}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />

        <TourCard
          price={2490000}
          title="Về Quê Bác – Khám Phá Nghệ An"
          schedule="3 ngày 2 đêm"
          rating={4.3}
          numReviews={66}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />
      </div>

      <h1 className="tour-title">Các tour dài ngày</h1>
      <div className="tour-list">
        <TourCard
          price={2000000}
          title="Huế Mộng Mơ – Dấu Ấn Cố Đô"
          schedule="3 ngày 2 đêm"
          rating={4.8}
          numReviews={98}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />

        <TourCard
          price={2490000}
          title="Xứ Thanh Gọi Mời – Về Với Lịch Sử"
          schedule="3 ngày 2 đêm"
          rating={4.5}
          numReviews={76}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />

        <TourCard
          price={2490000}
          title="Về Quê Bác – Khám Phá Nghệ An"
          schedule="3 ngày 2 đêm"
          rating={4.3}
          numReviews={66}
          imageUrls={[
            "/images/image1.jpg",
            "/images/image2.jpg",
            "/images/image3.jpg",
            "/images/image4.jpg",
          ]}
        />
      </div>
    </div>
  );
}

export default memo(Tour);
