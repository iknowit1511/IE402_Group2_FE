import { memo } from "react";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h3>
            <span className="airtrav-icon">✈</span> Airtrav
          </h3>          
          <br></br>

          <p>
            Mọi hành trình đều bắt đầu từ sự tò mò — hãy để chúng tôi dẫn lối bạn
            <br /> đến những trải nghiệm không thể nào quên.
          </p>
          <div className="email-input">
            <input placeholder="Nhập email của bạn" />
            <button className="submit-btn">→</button>
          </div>
        </div>
        <div className="footer-column">
          <h4>Dịch vụ</h4>
          <br></br>
          <p>Tour Guide</p>
          <p>Tour Package</p>
          <p>Tour Advice</p>
        </div>
        <div className="footer-column">
          <h4>Hỗ trợ</h4>          
          <br></br>

          <p>Tài khoản</p>
          <p>Pháp lý</p>
          <p>Liên hệ</p>
        </div>
        <div className="footer-column">
          <h4>Về chúng tôi</h4>          
          <br></br>

          <p>Về Airtrav</p>
          <p>Truyền thông</p>
          <p>Cơ hội việc làm</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">© 2025 ABC LLC. All rights reserved.</p>
        <div className="social-icons">
          <span className="social-icon">🇫</span>
          <span className="social-icon">🇮</span>
          <span className="social-icon">🇾</span>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);