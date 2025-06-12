import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import "./style.css";

export default function Payment() {
  const [payment, setPayment] = useState("");

  const handlePay = () => {
    alert(`Thanh toán bằng ${payment}`);
  };

  return (
    <div className="checkout-page">
      <h1 style={{ fontSize: "32px" }}>Thanh toán</h1>
      <div className="order-box">
        <h2>Mã đơn hàng: #12345</h2>
        <p>Tên tour: Huế mộng mơ - Dấu ấn cố đô</p>
        <p>Số tiền: 5.200.000đ</p>
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
