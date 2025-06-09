import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

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
        <img src="/assets/avatar.jpg" alt="avatar" className="avatar" />
      </div>
    </header>
  );
};

export default memo(Header);
