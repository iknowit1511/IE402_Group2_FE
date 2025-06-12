import React, { useState } from "react";
import "./style.css";

export default function Account() {
  const [user, setUser] = useState({
    firstName: "Alex",
    lastName: "Mecheal",
    place: "Hà Nội, Việt Nam",
    birthday: "01/01/1996",
    email: "ulhtofficial@gmail.com",
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
          <button>Thêm ảnh mới</button>
          <button className="delete-account">Xóa tài khoản</button>
        </div>
        <span>Họ</span>
        <input
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          placeholder="Họ"
        />

        <span>Tên</span>
        <input
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          placeholder="Tên"
        />
        <span>Nơi ở</span>
        <input
          value={user.place}
          onChange={(e) => setUser({ ...user, place: e.target.value })}
          placeholder="Nơi ở"
        />

        <span>Ngày sinh</span>
        <input
          value={user.birthday}
          onChange={(e) => setUser({ ...user, birthday: e.target.value })}
          placeholder="Ngày sinh"
        />

        <span>Email</span>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <button>Lưu thay đổi</button>
      </div>
    </div>
  );
}
