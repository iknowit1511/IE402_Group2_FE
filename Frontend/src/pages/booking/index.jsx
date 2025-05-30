import React, { memo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.scss";

function Booking() {
  const [searchParams] = useSearchParams();
  const maTour = searchParams.get("maTour") || "TTH-xxxxx";

  const [formData, setFormData] = useState({
    hoTen: "",
    sdt: "",
    email: "",
    noiKhoiHanh: "",
    ngayKhoiHanh: "",
  });

  const [soLuong, setSoLuong] = useState({
    nguoiLon: 0,
    treEm: 0,
    emBe: 0,
  });

  const prices = {
    nguoiLon: 2000000,
    treEm: 1200000,
    emBe: 300000,
  };

  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "đ";

  const tongTien =
    soLuong.nguoiLon * prices.nguoiLon +
    soLuong.treEm * prices.treEm +
    soLuong.emBe * prices.emBe;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeCount = (type, delta) => {
    setSoLuong((prev) => {
      const newValue = Math.max(0, prev[type] + delta);
      return { ...prev, [type]: newValue };
    });
  };

  const handleSubmit = () => {
    const data = {
      ...formData,
      ...soLuong,
      maTour,
    };
    console.log("Dữ liệu gửi đi:", data);
    alert("Thanh toán thành công!");
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2>Thông tin khách hàng</h2>
        <div className="form-group">
          <label>Họ và Tên</label>
          <input
            type="text"
            name="hoTen"
            placeholder="Họ và tên"
            value={formData.hoTen}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="sdt"
            placeholder="Số điện thoại"
            value={formData.sdt}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nơi khởi hành</label>
          <input
            type="text"
            name="noiKhoiHanh"
            placeholder="Nơi khởi hành"
            value={formData.noiKhoiHanh}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ngày khởi hành</label>
          <input
            type="date"
            name="ngayKhoiHanh"
            value={formData.ngayKhoiHanh}
            onChange={handleChange}
          />
        </div>

        <h3>Số lượng người</h3>
        <div className="number-group">
          <label>Người lớn</label>
          <div className="number-input">
            <button type="button" onClick={() => changeCount("nguoiLon", -1)}>
              -
            </button>
            <span>{soLuong.nguoiLon}</span>
            <button type="button" onClick={() => changeCount("nguoiLon", 1)}>
              +
            </button>
          </div>
        </div>
        <div className="number-group">
          <label>Trẻ em (&lt;12 tuổi)</label>
          <div className="number-input">
            <button type="button" onClick={() => changeCount("treEm", -1)}>
              -
            </button>
            <span>{soLuong.treEm}</span>
            <button type="button" onClick={() => changeCount("treEm", 1)}>
              +
            </button>
          </div>
        </div>
        <div className="number-group">
          <label>Em bé (&lt;2 tuổi)</label>
          <div className="number-input">
            <button type="button" onClick={() => changeCount("emBe", -1)}>
              -
            </button>
            <span>{soLuong.emBe}</span>
            <button type="button" onClick={() => changeCount("emBe", 1)}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-box">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Hue_Citadel.jpg/220px-Hue_Citadel.jpg"
            alt="Huế"
          />
          <h3>Khám phá cố đô Huế</h3>
          <p>Mã tour : {maTour}</p>
          <p>
            Khởi hành :{" "}
            {new Date(formData.ngayKhoiHanh).toLocaleDateString("vi-VN")}
          </p>
          <p>Thời gian : 3N2Đ</p>
          <p>
            Người lớn :{" "}
            <strong>
              {formatCurrency(prices.nguoiLon)} x {soLuong.nguoiLon}
            </strong>
          </p>
          <p>
            Trẻ em :{" "}
            <strong>
              {formatCurrency(prices.treEm)} x {soLuong.treEm}
            </strong>
          </p>
          <p>
            Em bé :{" "}
            <strong>
              {formatCurrency(prices.emBe)} x {soLuong.emBe}
            </strong>
          </p>
          <p className="tongTien" style={{ color: "red" }}>
            Tổng :{" "}
            <span style={{ color: "red" }}>{formatCurrency(tongTien)}</span>
          </p>
        </div>
        <button onClick={handleSubmit}>Thanh toán ngay</button>
      </div>
    </div>
  );
}

export default memo(Booking);
