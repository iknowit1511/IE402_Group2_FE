import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import PasswordToggle from "../../components/passHide-Unhide";

// import SignUpService from "../../services/handleSignUp";

const SignUp = () => {
  //Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const lastName = document.getElementById("fullName").value;
    const firstName = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const passwordInputs = document.querySelectorAll(".password-toggle__input");
    const password = passwordInputs[0].value.trim();
    const confirmPassword = passwordInputs[1].value.trim();

    if (
      !email ||
      !lastName ||
      !firstName ||
      !password ||
      !confirmPassword ||
      !phone
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (password.length < 8) {
      alert("Mật khẩu phải có 8 ký tự trở lên.");
      return;
    } else if (password !== confirmPassword) {
      alert("Mật khẩu không khớp! Vui lòng kiểm tra lại.");
      return;
    }

    // const userData = {
    //   email,
    //   username,
    //   fullname,
    //   phone,
    //   password,
    // };

    // try {
    //   const result = await SignUpService.signUpRequest(userData);
    //   alert("Đăng ký thành công!");
    //   console.log(result);
    // } catch (error) {
    //   alert("Đăng ký thất bại!");
    //   console.error(error);
    // }
  };

  return (
    <div className="signUp">
      <div className="signUp-form">
        <h2 style={{ fontSize: "30px" }}>Đăng ký</h2>

        <div className="signIn-text">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>

        <div className="social-signUp">
          <button className="facebook-button">
            <FaFacebook style={{ marginRight: "5px", color: "#4776D0" }} />{" "}
          </button>
          <button className="google-button">
            <FcGoogle style={{ marginRight: "5px" }} />
          </button>
          <button className="twitter-button">
            <FaTwitter style={{ marginRight: "5px", color: "#01AEEF" }} />
          </button>
        </div>

        <div className="divider">
          <span>Hoặc tạo tài khoản mới</span>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">
            Tên <span>*</span>
          </label>
          <input type="text" id="fullName" placeholder="Nhập tên của bạn" />

          <label htmlFor="fullName">
            Họ <span>*</span>
          </label>
          <input type="text" id="fullName" placeholder="Nhập họ của bạn" />

          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input type="text" id="email" placeholder="Địa chỉ email" />

          <label htmlFor="phone">
            Số điện thoại <span>*</span>
          </label>
          <input type="text" id="phone" placeholder="Số điện thoại" />

          <label htmlFor="password">
            Mật khẩu <span>*</span>
          </label>
          <PasswordToggle />

          <label htmlFor="password">
            Nhập lại mật khẩu <span>*</span>
          </label>
          <PasswordToggle placeholder="Nhập lại mật khẩu" />

          <button type="submit" className="signUp-button">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(SignUp);
