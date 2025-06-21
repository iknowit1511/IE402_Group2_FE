import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import PasswordToggle from "../../components/passHide-Unhide";
// import SignInService from "../../services/handleSignIn";
// import { setToken, removeToken } from "../../services/authToken";
// import { UserInfo } from "../../services/handleUserInfo";

const LogIn = () => {
  //   const navigate = useNavigate();

  //   const HandleSubmit = async (e) => {
  //     e.preventDefault();

  //     let username = document.getElementById("username").value.trim();
  //     let password = document.getElementById("password").value.trim();

  //     if (!username || !password) {
  //       alert("Vui lòng nhập đầy đủ thông tin!");
  //       return;
  //     }

  //     try {
  //       removeToken();
  //       const signInResult = await SignInService(username, password);
  //       const token = signInResult.result.token;
  //       setToken(token); // Lưu token vào sessionStorage
  //       alert("Đăng nhập thành công!");

  //       const userInfo = await UserInfo(token);
  //       console.log(userInfo);

  //       if (userInfo.result.role.name === "USER") {
  //         navigate("/"); // Chuyển hướng đến trang chủ
  //       } else if (userInfo.result.role.name === "ADMIN") {
  //         navigate("/admin"); // Chuyển hướng đến trang admin
  //       }
  //     } catch (error) {
  //       alert("Sai mật khẩu hoặc tên người dùng!");
  //       console.error(error);
  //     }
  //   };

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
    <>
      <div className="login">
        <div className="login-form">
          <h2 style={{ fontSize: "30px" }}>Đăng nhập</h2>

          <p className="signup-text">
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
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

          {/* <form onSubmit={handleLogin}> */}
          <form>
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input type="text" id="email" placeholder="Địa chỉ Email" />
            <label htmlFor="password">
              Mật khẩu <span>*</span>
            </label>
            <PasswordToggle />
            <button type="submit" className="login-button">
              Đăng nhập
            </button>

            <p className="forgot-password">
              <Link to="/Forgot-Password">Quên mật khẩu?</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(LogIn);
