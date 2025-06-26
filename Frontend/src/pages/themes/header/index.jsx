import React, { useState, useEffect, memo } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import ApiService from "../../../services/apiService";
import "./style.scss";

const Header = () => {
    const [active, setActive] = useState(false);
    const [headerClass, setHeaderClass] = useState("header");
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleHeader = () => setActive(!active);

    useEffect(() => {
        const handleScroll = () => {
            setHeaderClass(window.scrollY > 10 ? "header headerWithBg" : "header");
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout this user?")) {
            ApiService.logout();
            navigate("/");
        }
    };

    return (
        <div className={headerClass}>
            <div className="logoDiv">
                <NavLink to="/" className="logo-link">
                    <span className="logo-text">Airtrav</span>
                </NavLink>
            </div>

            <div className={`nav ${active ? "showNav" : ""}`}>
                <ul className="menu flex">
                    <li className="listItem">
                        <NavLink to="/promotions" className="nav-link">Khuyến mãi</NavLink>
                    </li>
                    <li className="listItem">
                        <NavLink to="/tour" className="nav-link">Tours</NavLink>
                    </li>
                    <li className="listItem">
                        <NavLink to="/blog" className="nav-link">Blog</NavLink>
                    </li>
                </ul>
            </div>

            <div className="user-info flex">
                <span>
                    <Link to="/faq" className="user-link">FAQ</Link>
                </span>
                <FaRegBell
                    className="notification-icon"
                    size="20px"
                />
                {isAuthenticated ? (
                    <>
                        {isUser && (
                            <span>
                                <Link to="/profile" className="user-link">Profile</Link>
                            </span>
                        )}
                        {isAdmin && (
                            <span>
                                <Link to="/admin" className="user-link">Admin</Link>
                            </span>
                        )}
                        <span onClick={handleLogout} className="user-link logout">
                            Logout
                        </span>
                    </>
                ) : (
                    <>
                        <span>
                            <Link to="/login" className="user-link">Sign In</Link>
                        </span>
                        <span>
                            <Link to="/sign-up" className="user-link">Sign Up</Link>
                        </span>
                    </>
                )}
            </div>

            <div onClick={toggleHeader} className="toggleIcon">
                <CgMenuGridO className="icon" />
            </div>
        </div>
    );
};

export default memo(Header);