import React, { useState } from "react";
import "./style.css";

export default function BookingHistory() {
  const [search, setSearch] = useState({ id: "", date: "", route: "", status: "" });
  const [data, setData] = useState([
    {
      id: "ABC123",
      quantity: 1,
      route: "HCM - Nha Trang",
      date: "2024-10-01",
      price: 450000,
      payment: "MoMo",
      status: "Hết hạn",
    },
    {
      id: "DEF456",
      quantity: 2,
      route: "HCM - Đà Lạt",
      date: "2024-12-03",
      price: 900000,
      payment: "MoMo",
      status: "Đã thanh toán",
    },
  ]);

  const filtered = data.filter((d) =>
    (!search.id || d.id.includes(search.id)) &&
    (!search.date || d.date === search.date) &&
    (!search.route || d.route.includes(search.route)) &&
    (!search.status || d.status === search.status)
  );

  return (
    <div className="booking-history">
      <h1>Lịch sử đặt tour</h1>
      <div className="filters">
        <input placeholder="Mã vé" onChange={(e) => setSearch({ ...search, id: e.target.value })} />
        <input type="date" onChange={(e) => setSearch({ ...search, date: e.target.value })} />
        <input placeholder="Tuyến đường" onChange={(e) => setSearch({ ...search, route: e.target.value })} />
        <select onChange={(e) => setSearch({ ...search, status: e.target.value })}>
          <option value="">Trạng thái</option>
          <option value="Hết hạn">Hết hạn</option>
          <option value="Đã thanh toán">Đã thanh toán</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã vé</th>
            <th>Số vé</th>
            <th>Tuyến</th>
            <th>Ngày đi</th>
            <th>Giá</th>
            <th>Thanh toán</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.quantity}</td>
              <td>{d.route}</td>
              <td>{d.date}</td>
              <td>{d.price.toLocaleString()}đ</td>
              <td>{d.payment}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
