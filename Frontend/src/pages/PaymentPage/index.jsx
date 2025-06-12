import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./style.css";

export default function Payment() {
  const location = useLocation();
  const { formData, soLuong, maTour, tenTour, tongTien } = location.state || {};

  const [payment, setPayment] = useState("");

  const handlePay = () => {
    alert(`Thanh toán bằng ${payment}`);
  };

  return (
    <div className="checkout-page">
      <h1 style={{ fontSize: "32px" }}>Thanh toán</h1>
      <div className="order-box">
        <h2>Mã đơn hàng: {maTour}</h2>
        <p>Tên tour: {tenTour}</p>
        <p>Số tiền: {tongTien?.toLocaleString("vi-VN")}đ</p>
      </div>

      <h1>Chọn phương thức thanh toán</h1>
      <div className="payment-options">
        <button onClick={() => setPayment("VNPAY")}>VNPay</button>
        <button onClick={() => setPayment("MOMO")}>MOMO</button>
        <button onClick={() => setPayment("Credit Card")}>
          {" "}
          <FaCreditCard style={{ marginRight: "10px" }} />
          Thẻ tín dụng
        </button>
      </div>
      <button className="pay-button" onClick={handlePay}>
        Thanh toán ngay
      </button>
    </div>
  );
}
