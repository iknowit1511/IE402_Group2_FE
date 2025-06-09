import React, { useState } from "react";
import "./style.css";

export default function Account() {
  const [user, setUser] = useState({
    firstName: "Alex",
    lastName: "Mecheal",
    email: "ulhtofficial@gmail.com",
  });

  return (
    <div className="account-page">
      <h1>Thông tin tài khoản</h1>
      <div className="form-block">
        <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} placeholder="Họ" />
        <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} placeholder="Tên" />
        <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
        <button>Lưu thay đổi</button>
      </div>
    </div>
  );
}
