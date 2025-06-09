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
      {/* Header */}
      <header className="header">
        <div className="logo">Airtrav</div>
        <nav className="nav">
          <a href="#">Khuyến mãi</a>
          <a href="#">Tours</a>
          <a href="#">Blog</a>
        </nav>
        <div className="user-info">
          <span>FAQ</span>
          <img src="/assets/avatar.jpg" alt="avatar" className="avatar" />
        </div>
      </header>

      {/* Banner + Search */}
      <div className="banner">
        <img src="/assets/banner.jpg" alt="banner" className="banner-img" />
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Tìm tour bạn thích..."
            value={formData.keyword}
            onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
          />
          <select onChange={(e) => setFormData({ ...formData, itinerary: e.target.value })}>
            <option>Lịch trình</option>
            <option>Hà Nội - Huế</option>
            <option>Hà Nội - SaPa</option>
          </select>
          <select onChange={(e) => setFormData({ ...formData, departure: e.target.value })}>
            <option>Nơi xuất phát</option>
            <option>HCM</option>
            <option>Hà Nội</option>
          </select>
          <input type="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <input
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          />
          <button type="submit">Tìm Tour</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-columns">
          <div>
            <h3>Airtrav</h3>
            <p>Khám phá thế giới cùng chúng tôi.</p>
            <input placeholder="Nhập email của bạn" />
          </div>
          <div>
            <h4>Dịch vụ</h4>
            <p>Tour Guide</p>
            <p>Tour Package</p>
            <p>Tour Advice</p>
          </div>
          <div>
            <h4>Hỗ trợ</h4>
            <p>Tài khoản</p>
            <p>Pháp lý</p>
            <p>Liên hệ</p>
          </div>
          <div>
            <h4>Về chúng tôi</h4>
            <p>Về Airtrav</p>
            <p>Truyền thông</p>
            <p>Cơ hội việc làm</p>
          </div>
        </div>
        <p className="copyright">© 2021 ABC LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
