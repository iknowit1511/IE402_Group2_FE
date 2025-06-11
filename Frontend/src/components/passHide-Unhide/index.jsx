import React, { useState, memo } from "react";
import "./style.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordToggle = ({ placeholder = "Mật khẩu" }) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // Khởi tạo state với giá trị false

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Cập nhật giá trị ngược lại (true -> false hoặc false -> true)
  };

  return (
    <div className="password-toggle">
      <input
        id="password"
        className="password-toggle__input"
        type={passwordVisible ? "text" : "password"}
        placeholder={placeholder}
      />
      <span className="eyeIcon" onClick={togglePasswordVisibility}>
        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
      </span>
    </div>
  );
};

export default memo(PasswordToggle);
