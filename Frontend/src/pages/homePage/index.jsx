import React, { useState } from "react";
import "./style.css";

export default function Home() {
  const [formData, setFormData] = useState({
    keyword: "",
    itinerary: "",
    departure: "",
    date: "",
    guests: 1,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Dữ liệu tìm kiếm:", formData);
  };

  return (
    <div className="homepage">
      {/* Banner + Search */}
      <div className="banner">
        <img src="/assets/banner.jpg" alt="banner" className="banner-img" />
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Tìm tour bạn thích..."
            value={formData.keyword}
            onChange={(e) =>
              setFormData({ ...formData, keyword: e.target.value })
            }
          />
          <select
            onChange={(e) =>
              setFormData({ ...formData, itinerary: e.target.value })
            }
          >
            <option>Lịch trình</option>
            <option>Hà Nội - Huế</option>
            <option>Hà Nội - SaPa</option>
          </select>
          <select
            onChange={(e) =>
              setFormData({ ...formData, departure: e.target.value })
            }
          >
            <option>Nơi xuất phát</option>
            <option>HCM</option>
            <option>Hà Nội</option>
          </select>
          <input
            type="date"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) =>
              setFormData({ ...formData, guests: e.target.value })
            }
          />
          <button type="submit">Tìm Tour</button>
        </form>
      </div>
    </div>
  );
}
