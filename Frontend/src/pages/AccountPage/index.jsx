import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Account() {
  const [user, setUser] = useState({
    firstName: "Alex",
    lastName: "Mecheal",
    place: "Hà Nội, Việt Nam",
    birthday: "01/01/1996",
    email: "ulhtofficial@gmail.com",
    gender: "Nam",
  });

  return (
    <div className="account-page">
      <h1>Thông tin tài khoản</h1>
      <div className="form-block">
        <label className="information">Thông tin của tôi</label>
        <div className="info-avatar">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="Avatar"
          />
          <button className="add-new-avatar">Thêm ảnh mới</button>
          <button className="delete-account">Xóa tài khoản</button>
        </div>
        <div className="info-grid">
          <div className="info-pair">
            <span>Họ</span>
            <input
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              placeholder="Họ"
            />
          </div>
          <div className="info-pair">
            <span>Tên</span>
            <input
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              placeholder="Tên"
            />
          </div>
          <div className="info-pair">
            <span>Nơi ở</span>
            <input
              value={user.place}
              onChange={(e) => setUser({ ...user, place: e.target.value })}
              placeholder="Nơi ở"
            />
          </div>
          <div className="info-pair">
            <span>Ngày sinh</span>
            <input
              value={user.birthday}
              onChange={(e) => setUser({ ...user, birthday: e.target.value })}
              placeholder="Ngày sinh"
            />
          </div>
          <div className="info-pair">
            <span>Email</span>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
          </div>
          <div className="info-pair">
            <span>Giới tính</span>
            <input
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
              placeholder="Gender"
            />
          </div>
        </div>
      </div>
      <button className="save-change">Lưu thay đổi</button>
      <br />
      <Link to="/booking-history">
        <button className="tour-history-button">Lịch sử đặt tour</button>
      </Link>
    </div>
  );
}
