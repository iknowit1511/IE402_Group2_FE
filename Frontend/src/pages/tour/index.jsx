import React, { memo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import TourCard from "../../components/tourCard";
import ApiService from "../../services/apiService";
import "./style.scss";

function Tour() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleToursCount, setVisibleToursCount] = useState(6); // Show 6 tours initially
  const [searchParams] = useSearchParams();

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getAllTours();
        setTours(response.tourList || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setVisibleToursCount(6); // Reset visible count when searching
  };

  // Filter tours based on search query
  const filteredTours = tours.filter((tour) =>
    tour.tourTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter tours by category
  const popularTours = filteredTours.filter(
    (tour) => tour.tourStatus === "POPULAR" // Adjust based on actual tourStatus
  ).slice(0, visibleToursCount);
  const newTours = filteredTours.filter(
    (tour) => tour.tourStatus === "NEW" // Adjust based on actual tourStatus
  ).slice(0, visibleToursCount);
  const shortTours = filteredTours.filter(
    (tour) => tour.tourDuration <= 3
  ).slice(0, visibleToursCount);
  const longTours = filteredTours.filter(
    (tour) => tour.tourDuration > 3
  ).slice(0, visibleToursCount);

  // Handle "Show More" button
  const handleShowMore = () => {
    setVisibleToursCount((prev) => prev + 6); // Show 6 more tours
  };

  // Check if there are more tours to show
  const hasMoreTours = (tours) => tours.length > visibleToursCount;

  return (
    <div className="tour-container">
      <div className="search_bar">
        <input
          type="text"
          placeholder="Tìm kiếm tour bạn thích..."
          id="searchText"
          value={searchQuery}
          onChange={handleSearch}
          required
        />
        <button type="submit" className="search-button">
          <CiSearch strokeWidth={1} />
        </button>
      </div>

      {loading && <div className="spinner">Loading tours...</div>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <>
          <h1 className="tour-title">Các tour phổ biến</h1>
          <div className="tour-list">
            {popularTours.length > 0 ? (
              popularTours.map((tour) => (
                <TourCard
                  key={tour.tourId}
                  id={tour.tourId}
                  title={tour.tourTitle}
                  price={tour.tourPrice}
                  schedule={`${tour.tourDuration} ngày`}
                  rating={4.8} // Placeholder, need API for reviews
                  numReviews={98} // Placeholder, need API for reviews
                  imageUrls={[
                    "/images/dia-diem-du-lich-bac-lieu-2.webp",
                    "/images/dia-diem-du-lich-bac-lieu-16.webp",
                    "/images/dia-diem-du-lich-bac-lieu-19.webp",
                    "/images/dia-diem-du-lich-bac-lieu-30.webp",
                  ]} // Placeholder, adjust based on tourImage
                />
              ))
            ) : (
              <div className="no-tours">Không có tour phổ biến.</div>
            )}
          </div>
          {hasMoreTours(popularTours) && (
            <button className="show-more" onClick={handleShowMore}>
              Xem thêm
            </button>
          )}

          <h1 className="tour-title">Các tour mới</h1>
          <div className="tour-list">
            {newTours.length > 0 ? (
              newTours.map((tour) => (
                <TourCard
                  key={tour.tourId}
                  id={tour.tourId}
                  title={tour.tourTitle}
                  price={tour.tourPrice}
                  schedule={`${tour.tourDuration} ngày`}
                  rating={4.8}
                  numReviews={98}
                  imageUrls={[
                    "/images/dia-diem-du-lich-bac-lieu-2.webp",
                    "/images/dia-diem-du-lich-bac-lieu-16.webp",
                    "/images/dia-diem-du-lich-bac-lieu-19.webp",
                    "/images/dia-diem-du-lich-bac-lieu-30.webp",
                  ]}
                />
              ))
            ) : (
              <div className="no-tours">Không có tour mới.</div>
            )}
          </div>
          {hasMoreTours(newTours) && (
            <button className="show-more" onClick={handleShowMore}>
              Xem thêm
            </button>
          )}

          <h1 className="tour-title">Các tour ngắn ngày</h1>
          <div className="tour-list">
            {shortTours.length > 0 ? (
              shortTours.map((tour) => (
                <TourCard
                  key={tour.tourId}
                  id={tour.tourId}
                  title={tour.tourTitle}
                  price={tour.tourPrice}
                  schedule={`${tour.tourDuration} ngày`}
                  rating={4.8}
                  numReviews={98}
                  imageUrls={[
                    "/images/dia-diem-du-lich-bac-lieu-2.webp",
                    "/images/dia-diem-du-lich-bac-lieu-16.webp",
                    "/images/dia-diem-du-lich-bac-lieu-19.webp",
                    "/images/dia-diem-du-lich-bac-lieu-30.webp",
                  ]}
                />
              ))
            ) : (
              <div className="no-tours">Không có tour ngắn ngày.</div>
            )}
          </div>
          {hasMoreTours(shortTours) && (
            <button className="show-more" onClick={handleShowMore}>
              Xem thêm
            </button>
          )}

          <h1 className="tour-title">Các tour dài ngày</h1>
          <div className="tour-list">
            {longTours.length > 0 ? (
              longTours.map((tour) => (
                <TourCard
                  key={tour.tourId}
                  id={tour.tourId}
                  title={tour.tourTitle}
                  price={tour.tourPrice}
                  schedule={`${tour.tourDuration} ngày`}
                  rating={4.8}
                  numReviews={98}
                  imageUrls={[
                    "/images/dia-diem-du-lich-bac-lieu-2.webp",
                    "/images/dia-diem-du-lich-bac-lieu-16.webp",
                    "/images/dia-diem-du-lich-bac-lieu-19.webp",
                    "/images/dia-diem-du-lich-bac-lieu-30.webp",
                  ]}
                />
              ))
            ) : (
              <div className="no-tours">Không có tour dài ngày.</div>
            )}
          </div>
          {hasMoreTours(longTours) && (
            <button className="show-more" onClick={handleShowMore}>
              Xem thêm
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default memo(Tour);
