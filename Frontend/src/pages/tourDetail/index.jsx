import React, { memo, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
import getTourDetail from "../../services/getTourDetail";
import "./style.scss";

function TourDetail() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState();
  const [guestCount, setGuestCount] = useState(1);

  // Dữ liệu tour
  const tourData = {
    id: "tour-hue-001", // Thêm ID để dễ quản lý
    title: "Huế mộng mơ - Dấu ấn cố đô",
    rating: 4.8,
    reviewCount: 98,
    price: 2000000,
    currency: "đ",
    startDate: "30/05/2025",
    duration: "3 ngày 2 đêm",
    availableDates: ["30/05/2025", "29/08/2025"], // Thêm các ngày có sẵn
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/200/150",
      "/api/placeholder/200/150",
      "/api/placeholder/200/150",
      "/api/placeholder/200/150",
    ],
    morePhotos: 12,
    description:
      "Huế là thành phố di sản nổi tiếng của Việt Nam, nơi lưu giữ vẻ đẹp cổ kính và trầm mặc của kinh đô xưa qua các công trình kiến trúc, lăng tẩm, chùa chiền và sông Hương thơ mộng và được bao bọc bởi dãy núi Ngự hừng vĩ, Huế mang trong mình vẻ đẹp vừa nên thơ, vừa sâu lắng.",
    highlights:
      "Không chỉ nổi bật với kiến trúc cung đình đặc sắc, Huế còn cuốn hút du khách bởi nền ẩm thực tinh tế, giàu bản sắc và con người hiền hòa, mến khách.",
    location: {
      city: "Tp. Huế",
      region: "Hoàng Thành Huế",
    },
    // Dữ nguyên customerReview
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
          { time: "10:00", activity: "Tới Huế" },
          { time: "10:30", activity: "Check in phòng khách sạn" },
        ],
      },
      {
        day: 2,
        activities: [
          { time: "7:00", activity: "Ăn sáng tại khách sạn" },
          { time: "8:00", activity: "Di chuyển tới kinh thành Huế" },
          { time: "9:30", activity: "Di chuyển tới Nhà thờ Phú Cam" },
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
      "Kinh thành Huế",
      "Nhà thờ Phú Cam",
      "Lăng Thúy Xuân",
      "Lăng Khải Định",
      "Vườn quốc gia Bạch Mã",
      "Đồi Thiên Ân - Hồ Thủy Tiên",
    ],

    // Dữ nguyên tourRules
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

  // Hàm xử lý đặt tour
  const handleBookTour = () => {
    const bookingData = {
      tour: tourData,
      selectedDate: selectedDate,
      guestCount: guestCount,
      totalPrice: tourData.price * guestCount,
      bookingTime: new Date().toISOString(),
    };

    // Cách 1: Sử dụng navigate với state
    navigate("/booking", {
      state: {
        bookingData,
        fromTourDetail: true,
      },
    });
  };

  // Hàm xử lý tư vấn
  const handleConsult = () => {
    const consultData = {
      tour: {
        id: tourData.id,
        title: tourData.title,
        price: tourData.price,
        duration: tourData.duration,
      },
      selectedDate: selectedDate,
      guestCount: guestCount,
      requestType: "consultation",
    };

    navigate("/consultation", {
      state: {
        consultData,
        fromTourDetail: true,
      },
    });
  };

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
          <i className="fa-solid fa-magnifying-glass">
            <CiSearch strokeWidth={1} />
          </i>
        </button>
      </div>

      <div className="breadcrumb">
        <a href="/" className="breadcrumb-link">
          Trang chủ
        </a>
        <span className="arrow"> &gt; </span>
        <a href="/tour" className="breadcrumb-link">
          <span>Tour</span>
        </a>
        <span className="arrow"> &gt; </span>
        <a href="/tour-detail" className="breadcrumb-link">
          <span className="current">{tourData.title}</span>
        </a>
      </div>

      <div className="tour-detail">
        {/* Header */}
        <div className="tour-header">
          <div className="tour-title-section">
            <h1 className="tour-title">{tourData.title}</h1>
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
                <img src={tourData.images[0]} alt={tourData.title} />
              </div>
              <div className="thumbnail-grid">
                {tourData.images.slice(1, 5).map((img, index) => (
                  <div key={index} className="thumbnail">
                    <img src={img} alt={`${tourData.title} ${index + 1}`} />
                    {index === 3 && (
                      <div className="more-photos">
                        +{tourData.morePhotos} ảnh
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="tour-description">
              <p>{tourData.description}</p>
              <p>{tourData.highlights}</p>
            </div>

            {/* Itinerary & Destinations */}
            <div className="tour-details-section">
              <div className="itinerary-section">
                <h2>Lịch trình</h2>
                {tourData.itinerary.map((day, index) => (
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
                  {tourData.destinations.map((destination, index) => (
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
                  {tourData.tourRules.included.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rules-section">
                <h3>Chưa bao gồm các dịch vụ</h3>
                <ul>
                  {tourData.tourRules.excluded.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rules-section">
                <h3>Quy định hủy, hoãn</h3>
                <ul>
                  <li>{tourData.tourRules.cancellation.afterBooking}</li>
                  <li>{tourData.tourRules.cancellation.afterDeposit}</li>
                  <li>- {tourData.tourRules.cancellation.before30Days}</li>
                  <li>- {tourData.tourRules.cancellation.before20Days}</li>
                  <li>- {tourData.tourRules.cancellation.afterDeadline}</li>
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
                <p className="note">**{tourData.tourRules.note}**</p>
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
                  <span className="rating-score">{tourData.rating}</span>
                  <AiFillStar className="star-icon" />
                </div>
                <span className="review-count">
                  {tourData.reviewCount} đánh giá
                </span>
              </div>

              <div className="customer-review">
                <p>Khách hàng tham gia tour thích điều gì?</p>
                <div className="review-item">
                  <div className="reviewer-avatar">H</div>
                  <div className="review-content">
                    <span className="reviewer-name">
                      {tourData.customerReview.name}
                    </span>
                    <p>"{tourData.customerReview.comment}"</p>
                  </div>
                </div>
              </div>

              <div className="location-info">
                <div className="location-map">
                  <AiOutlineEnvironment className="location-icon" />
                  <div className="location-details">
                    <span className="location-city">
                      {tourData.location.city}
                    </span>
                  </div>
                </div>
                <button className="view-itinerary-btn">
                  <Link to="/map-review">Xem hành trình tour</Link>
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
                    {tourData.availableDates.map((date, index) => (
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
                      {tourData.price.toLocaleString()}
                    </span>
                    <span className="currency">{tourData.currency}</span>
                    <span className="price"> /người</span>
                  </div>
                </div>

                <div className="booking-buttons">
                  <button className="consult-btn" onClick={handleConsult}>
                    <AiOutlineMessage className="icon" />
                    Tư vấn
                  </button>
                  <Link
                    to="/booking"
                    state={{
                      tourData: tourData,
                      selectedDate: selectedDate,
                      guestCount: guestCount,
                    }}
                    className="book-btn"
                  >
                    Đặt ngay
                  </Link>
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
