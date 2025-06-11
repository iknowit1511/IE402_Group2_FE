import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { FaRegBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        {" "}
        <Link to="/">Airtrav</Link>
      </div>
      <nav className="nav">
        <a href="#">Khuyến mãi</a>
        <Link to="/Tour">Tours</Link>
        <a href="#">Blog</a>
      </nav>
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
    </header>
  );
};

export default memo(Header);
