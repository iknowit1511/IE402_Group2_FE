import React, { useState } from "react";
import "./style.css";

export default function Payment() {
  const [payment, setPayment] = useState("");

  const handlePay = () => {
    alert(`Thanh toán bằng ${payment}`);
  };

  return (
    <div className="checkout-page">
      <h1>Thanh toán</h1>
      <div className="order-box">
        <h2>Mã đơn: #12345</h2>
        <p>Tên tour: Huế</p>
        <p>Số tiền: 5.200.000đ</p>
      </div>

      <h1>Chọn phương thức thanh toán</h1>
      <div className="payment-options">
        <button onClick={() => setPayment("VNPAY")}>VNPAY</button>
        <button onClick={() => setPayment("MOMO")}>MOMO</button>
        <button onClick={() => setPayment("Credit Card")}>Thẻ tín dụng</button>
      </div>
      <button className="pay-button" onClick={handlePay}>
        Thanh toán ngay
      </button>
    </div>
  );
}
