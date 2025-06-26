import { memo, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import PasswordToggle from "../../components/passHide-Unhide";
import ApiService from "../../services/apiService";

const LogIn = () => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!userEmail || !userPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      setLoading(false);
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      const response = await ApiService.loginUser({ userEmail, userPassword });
      console.log("Login response:", response);
      if (response && response.statusCode === 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.userRole);
        console.log("Role:", response.userRole);

        if (response.userRole === "USER") {
          navigate("/", { replace: true });
        } else if (response.userRole === "ADMIN") {
          navigate("/admin", { replace: true });
        }
      } else {
        setError("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.message || "Đăng nhập thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   let email = document.getElementById("email").value.trim();
  //   let password = document.getElementById("password").value.trim();

  //   if (!email || !password) {
  //     setError("Vui lòng điền đầy đủ thông tin.");
  //     setLoading(false);
  //     setTimeout(() => setError(""), 5000);
  //     return;
  //   }

  //   console.log("Dữ liệu gửi đi:", { email, password });
  // };
  return (
    <div className="login">
      <div className="login-form">
        <h2 style={{ fontSize: "30px" }}>Đăng nhập</h2>
        {error && <div className="error-message">{error}</div>}
        <p className="signup-text">
          Chưa có tài khoản? <span onClick={() => navigate("/sign-up")}>Đăng ký</span>
        </p>

        <div className="social-signIn">
          <button className="facebook-button">
            <FaFacebook style={{ marginRight: "5px", color: "#4776D0" }} />
          </button>
          <button className="google-button">
            <FcGoogle style={{ marginRight: "5px" }} />
          </button>
          <button className="twitter-button">
            <FaTwitter style={{ marginRight: "5px", color: "#01AEEF" }} />
          </button>
        </div>

        <div className="divider">
          <span>Hoặc tiếp tục với email</span>
        </div>

        <form onSubmit={handleLogin}>
          <label htmlFor="userEmail">
            Email <span>*</span>
          </label>
          <input
            type="email"
            id="userEmail"
            placeholder="Địa chỉ Email"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
          />
          <label htmlFor="userPassword">
            Mật khẩu <span>*</span>
          </label>
            <input
            value={userPassword}
            onChange={(e) => setPassword(e.target.value.trim())}
            required
            type="password"
            id="userPassword"
            placeholder="Mật khẩu"
            className="password-toggle__input"

          />
          <button
            type="submit"
            className={`login-button ${loading ? "loading-btn" : ""}`}
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
          <p className="forgot-password">
            <span onClick={() => navigate("/forgot-password")}>Quên mật khẩu?</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default memo(LogIn);