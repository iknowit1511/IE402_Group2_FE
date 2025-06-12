import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { FaRegBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">Airtrav</Link>
        </div>
      </div>

      <div className="header-center">
        <nav className="nav">
          <a href="#">Khuyến mãi</a>
          <Link to="/Tour">Tours</Link>
          <a href="#">Blog</a>
        </nav>
      </div>

      <div className="header-right">
        <div className="logIn-button">
          <Link to="/login">
            <button className="login-btn">Đăng nhập</button>
          </Link>
          <br />
          <Link to="/register">
            <button className="register-btn">Đăng ký</button>
          </Link>
        </div>

        <div className="user-info">
          <span>FAQ</span>
          <FaRegBell
            className="notification-icon"
            style={{ marginRight: "5px", color: "#3F3545" }}
            size="20px"
          />
          <Link to="/account">
            <img
              src={require("../../../assets/avatar.jpg")}
              alt="avatar"
              className="avatar"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
