import React, { memo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineCalendar,
  AiOutlineEnvironment,
  AiOutlineMessage,
  AiFillStar,
} from "react-icons/ai";
import ApiService from "../../services/apiService";
import "./style.scss";

function TourDetail() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  // Fetch tour detail from API
  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getTourById(tourId);
        setTour(response.tourDTO || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTourDetail();
  }, [tourId]);

  // Handle booking
  const handleBookTour = () => {
    const handleBookTour = () => {
      console.log("Tour ID:", tourId);
      console.log("Selected Date:", selectedDate);
    
      if (!tourId || !selectedDate) {
        console.error("Missing tourId or selectedDate");
        return;
      }
    
      console.log("Booking tour:", tour);
      // Logic tiếp theo
    };

    const bookingData = {
      tour: {
        id: tour.tourId || "tour-hue-001",
        title: tour.tourTitle || "Huế mộng mơ - Dấu ấn cố đô",
        price: tour.tourPrice || 2000000,
        duration: tour.tourDuration || "3 ngày 2 đêm",
      },
      selectedDate,
      guestCount,
      totalPrice: (tour.tourPrice || 2000000) * guestCount,
      bookingTime: new Date().toISOString(),
    };

    navigate("/booking", {
      state: { bookingData, fromTourDetail: true },
    });
  };

  // Handle consultation
  const handleConsult = () => {
    if (!tour || !selectedDate) return;

    const consultData = {
      tour: {
        id: tour.tourId || "tour-hue-001",
        title: tour.tourTitle || "Huế mộng mơ - Dấu ấn cố đô",
        price: tour.tourPrice || 2000000,
        duration: tour.tourDuration || "3 ngày 2 đêm",
      },
      selectedDate,
      guestCount,
      requestType: "consultation",
    };

    navigate("/consultation", {
      state: { consultData, fromTourDetail: true },
    });
  };

  // Handle view itinerary
  const handleViewItinerary = () => {
    navigate("/map-review", {
      state: { tourId: tour.tourId || "tour-hue-001", tourTitle: tour.tourTitle || "Huế mộng mơ - Dấu ấn cố đô" },
    });
  };

  // Default values
  const defaultTourData = {
    id: "tour-hue-001",
    title: "Huế mộng mơ - Dấu ấn cố đô",
    rating: 4.8,
    reviewCount: 98,
    price: 2000000,
    currency: "đ",
    startDate: "30/05/2025",
    duration: "3 ngày 2 đêm",
    availableDates: ["30/05/2025", "29/08/2025"],
    images: [
      "/images/dia-diem-du-lich-bac-lieu-2.webp",
      "/images/dia-diem-du-lich-bac-lieu-16.webp",
      "/images/dia-diem-du-lich-bac-lieu-19.webp",
      "/images/dia-diem-du-lich-bac-lieu-30.webp",
    ],
    morePhotos: 12,
    description:
      "Huế là thành phố di sản nổi tiếng của Việt Nam, nơi lưu giữ vẻ đẹp cổ kính và trầm mặc của kinh đô xưa qua các công trình kiến trúc, lăng tẩm, chùa chiền và sông Hương thơ mộng và được bao bọc bởi dãy núi Ngự hừng vĩ, Huế mang trong mình vẻ đẹp vừa nên thơ, vừa sâu lắng.",
    highlights:
      "Không chỉ nổi bật với kiến trúc cung đình đặc sắc, Huế còn cuốn hút du khách bởi nền ẩm thực tinh tế, giàu bản sắc và con người hiền hòa, mến khách.",
    location: { city: "Tp. Bạc Liêu", region: "Nhà Công tử Bạc Liêu" },
    customerReview: {
      name: "Hiền",
      comment:
        "Nơi này đẹp như một bài thơ trầm lặng, thầm đẫm nét cổ kính và mộng mơ.",
    },
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "5:00", activity: "Khởi hành" },
          { time: "7:00", activity: "Dùng chân ăn sáng" },
          { time: "10:00", activity: "Tới Bạc Liêu" },
          { time: "10:30", activity: "Check in phòng khách sạn" },
        ],
      },
      {
        day: 2,
        activities: [
          { time: "7:00", activity: "Ăn sáng tại khách sạn" },
          { time: "8:00", activity: "Di chuyển tới Nhà Công tử Bạc Liêu" },
          { time: "9:30", activity: "Di chuyển tới Khu lưu niệm Nhạc sĩ Cao Văn Lầu" },
          { time: "12:00", activity: "Ăn trưa tại nhà hàng địa phương" },
          { time: "13:30", activity: "Tham quan Thiền viện Trúc Lâm Bạc Liêu" },
          { time: "15:00", activity: "Tham quan Cánh đồng điện gió Bạc Liêu" },

        ],
      },
      {
        day: 3,
        activities: [
          { time: "7:00", activity: "Ăn sáng tại khách sạn" },
          { time: "8:00", activity: "Check in trả phòng khách sạn" },
          { time: "8:30", activity: "Khởi hành về" },
        ],
      },
    ],
    destinations: [
      "Nhà Công tử Bạc Liêu",
      "Khu lưu niệm Nhạc sĩ Cao Văn Lầu",
      "Thiền viện Trúc Lâm Bạc Liêu",
      "Cánh đồng điện gió Bạc Liêu",
    ],
    tourRules: {
      included: [
        "Bảo hiểm du lịch suốt tuyến.",
        "Khách sạn tiêu chuẩn 5 sao Local hoặc tương đương tốt nhất tại địa phương (2 người/phòng - phòng 3 người trường hợp đi lẻ nam hoặc nữ).",
        "Phục vụ 1 chai nước suối/khách/ngày.",
        "Vé tham quan tất cả các điểm có trong chương trình.",
        "Các bữa ăn như chương trình (các bữa ăn có thể thay đổi phù hợp với tuyến điểm tuy nhiên vẫn đảm bảo đủ số lượng và chất lượng bữa ăn tương đương hoặc hơn).",
        "Xe máy lạnh vận chuyển suốt tuyến.",
        "Vé tham quan như chương trình.",
      ],
      excluded: [
        "Chi phí cá nhân, điện thoại, giặt ủi, tham quan ngoài chương trình.",
        "Phụ thu phòng đơn (nếu có) (200.000VNĐ).",
      ],
      cancellation: {
        afterBooking:
          "Ngay sau khi đăng ký tour, cọc 50% tổng giá tour, phần còn lại Vui lòng thanh toán trước 14 ngày khởi hành.",
        afterDeposit: "Hủy tour sau khi đặng ký phí phạt 50% tiền cọc.",
        before30Days:
          "Hủy tour trước 30 ngày phí phạt = 50% tổng giá tour chương trình (Tính theo ngày làm việc)",
        before20Days:
          "Hủy tour trước 20 ngày phí phạt = 75% tổng giá tour chương trình (Tính theo ngày làm việc)",
        afterDeadline:
          "Sau thời gian trên phí phạt = 100% tổng giá trị chương trình. (Tính theo ngày làm việc)",
      },
      note: "Trong những trường hợp khách quan như: khủng bố, thiên tai... hoặc do có sự cố, có sự thay đổi lịch trình của các phương tiện vận chuyển công cộng như: máy bay, tàu hỏa... thì Cty sẽ giữ quyền thay đổi lộ trình bất cứ lúc nào vì sự thuận tiện, an toàn cho khách hàng và sẽ không chịu trách nhiệm bồi thường những thiệt hại phát sinh.",
    },
  };

  // Use tour data with defaults
  const availableDates = tour?.availableDates || defaultTourData.availableDates;
  const images = tour?.images || defaultTourData.images;
  const rating = tour?.rating || defaultTourData.rating;
  const reviewCount = tour?.reviewCount || defaultTourData.reviewCount;
  const customerReview = tour?.customerReview || defaultTourData.customerReview;
  const itinerary = tour?.itinerary || defaultTourData.itinerary;
  const destinations = tour?.destinations || defaultTourData.destinations;
  const tourRules = tour?.tourRules || defaultTourData.tourRules;
  const location = tour?.location || defaultTourData.location;
  const highlights = tour?.highlights || defaultTourData.highlights;

  if (loading) return <div className="spinner">Loading tour details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!tour) return <div className="no-tours">Tour not found.</div>;

  return (
    <div className="tour-detail-container">
      <div className="search_bar">
        <input
          type="text"
          placeholder="Tìm kiếm tour bạn thích..."
          id="searchText"
          required
        />
        <button type="submit" className="search-button">
          <CiSearch strokeWidth={1} />
        </button>
      </div>

      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Trang chủ
        </Link>
        <span className="arrow"> &gt; </span>
        <Link to="/tour" className="breadcrumb-link">
          <span>Tour</span>
        </Link>
        <span className="arrow"> &gt; </span>
        <span className="breadcrumb-link">
          <span className="current">{tour.tourTitle || defaultTourData.title}</span>
        </span>
      </div>

      <div className="tour-detail">
        {/* Header */}
        <div className="tour-header">
          <div className="tour-title-section">
            <h1 className="tour-title">{tour.tourTitle || defaultTourData.title}</h1>
            <div className="tour-actions">
              <button className="action-btn">
                <AiOutlineHeart />
              </button>
              <button className="action-btn">
                <AiOutlineShareAlt />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="tour-content">
          {/* Left Section */}
          <div className="tour-left">
            {/* Image Gallery */}
            <div className="image-gallery">
              <div className="main-image">
                <img src={images[0]} alt={tour.tourTitle || defaultTourData.title} />
              </div>
              <div className="thumbnail-grid">
                {images.slice(1, 5).map((img, index) => (
                  <div key={index} className="thumbnail">
                    <img src={img} alt={`${tour.tourTitle || defaultTourData.title} ${index + 1}`} />
                    {index === 3 && (
                      <div className="more-photos">+{tour.morePhotos || defaultTourData.morePhotos} ảnh</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="tour-description">
              <p>{tour.tourDescription || defaultTourData.description}</p>
              <p>{highlights}</p>
            </div>

            {/* Itinerary & Destinations */}
            <div className="tour-details-section">
              <div className="itinerary-section">
                <h2>Lịch trình</h2>
                {itinerary.map((day, index) => (
                  <div key={index} className="day-schedule">
                    <h3>Ngày {day.day}</h3>
                    <ul>
                      {day.activities.map((activity, actIndex) => (
                        <li key={actIndex}>
                          {activity.time} - {activity.activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="destinations-section">
                <h2>Điểm đến</h2>
                <ul>
                  {destinations.map((destination, index) => (
                    <li key={index}>{destination}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tour Rules */}
            <div className="tour-rules">
              <h2>Quy định tour</h2>

              <div className="rules-section">
                <h3>Giá tour bao gồm các dịch vụ</h3>
                <ul>
                  {tourRules.included.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rules-section">
                <h3>Chưa bao gồm các dịch vụ</h3>
                <ul>
                  {tourRules.excluded.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rules-section">
                <h3>Quy định hủy, hoãn</h3>
                <ul>
                  <li>{tourRules.cancellation.afterBooking}</li>
                  <li>{tourRules.cancellation.afterDeposit}</li>
                  <li>- {tourRules.cancellation.before30Days}</li>
                  <li>- {tourRules.cancellation.before20Days}</li>
                  <li>- {tourRules.cancellation.afterDeadline}</li>
                  <li>
                    Việc hủy bỏ chuyến đi phải được thông báo trực tiếp với Công
                    ty hoặc qua fax, email, tin nhắn điện thoại và phải được
                    Công ty xác nhận. Việc hủy bỏ bằng điện thoại không được
                    chấp nhận.
                  </li>
                  <li>
                    Thời gian hủy tour được tính cho ngày làm việc, không tính
                    thứ bảy, chủ nhật và các ngày Lễ Tết
                  </li>
                </ul>
                <p className="note">**{tourRules.note}**</p>
              </div>

              <div className="service-guarantee">
                <h3>RẤT HÂN HẠNH ĐƯỢC PHỤC VỤ QUÝ KHÁCH !</h3>
              </div>
            </div>
          </div>

          {/* Right Section - Booking Card */}
          <div className="tour-right">
            <div className="booking-card">
              <div className="rating-section">
                <span className="rating-label">Xuất sắc</span>
                <div className="rating-info">
                  <span className="rating-score">{rating}</span>
                  <AiFillStar className="star-icon" />
                </div>
                <span className="review-count">{reviewCount} đánh giá</span>
              </div>

              <div className="customer-review">
                <p>Khách hàng tham gia tour thích điều gì?</p>
                <div className="review-item">
                  <div className="reviewer-avatar">{customerReview.name.charAt(0)}</div>
                  <div className="review-content">
                    <span className="reviewer-name">{customerReview.name}</span>
                    <p>"{customerReview.comment}"</p>
                  </div>
                </div>
              </div>

              <div className="location-info">
                <div className="location-map">
                  <AiOutlineEnvironment className="location-icon" />
                  <div className="location-details">
                    <span className="location-city">{location.city}</span>
                    <span className="location-region">{location.region}</span>
                  </div>
                </div>
                <button className="view-itinerary-btn" onClick={handleViewItinerary}>
                  Xem hành trình tour
                </button>
              </div>

              <div className="booking-info">
                <div className="date-picker">
                  <AiOutlineCalendar className="calendar-icon" />
                  <span>Ngày khởi hành:</span>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="" disabled>
                      Chọn ngày
                    </option>
                    {availableDates.map((date, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="guest-count">
                  <span>Số khách:</span>
                  <select
                    className="guest-select"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} khách
                      </option>
                    ))}
                  </select>
                </div>

                <div className="price-section">
                  <div className="price-per-person">
                    <span className="price">
                      {(tour.tourPrice || defaultTourData.price).toLocaleString()}
                    </span>
                    <span className="currency">{defaultTourData.currency}</span>
                    <span className="price"> /người</span>
                  </div>
                </div>

                <div className="booking-buttons">
                  <button
                    className="consult-btn"
                    onClick={handleConsult}
                    disabled={!selectedDate}
                  >
                    <AiOutlineMessage className="icon" />
                    Tư vấn
                  </button>
                  <button
                    className="book-btn"
                    onClick={handleBookTour}
                    disabled={selectedDate}
                  >
                    Đặt ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TourDetail);