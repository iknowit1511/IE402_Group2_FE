import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./style.scss";

const TourCard = ({
  id,
  price,
  title,
  schedule,
  rating,
  numReviews,
  imageUrls,
}) => {
  return (
    <Link to={`/tour-detail/${id}`}>
      <div className="tour-card">
        <div className="tour-card__images">
          {imageUrls.slice(0, 4).map((url, idx) => (
            <img key={idx} src={url} alt={`${title} ${idx + 1}`} />
          ))}
          <div className="tour-card__price-overlay">
            Chỉ từ {price.toLocaleString()} VNĐ
          </div>
        </div>

        <div className="tour-card__content">
          <h3 className="tour-card__title">{title}</h3>

          <div className="tour-card__info">
            <span className="tour-card__rating">
              <FaStar color="#F8CB62" />
              {rating} ({numReviews} Đánh giá)
            </span>
            <span className="tour-card__schedule">
              Lịch trình: {schedule}
            </span>
          </div>

          <div className="tour-card__button">
            {price.toLocaleString()} VNĐ
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
