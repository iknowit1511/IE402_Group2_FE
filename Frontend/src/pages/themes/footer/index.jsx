import { memo } from "react";
import "./style.scss";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-columns">
          <div>
            <h3>Airtrav</h3>
            <p>
              Mọi hành trình đều bắt đầu từ sự tò
              <br /> mò — hãy để chúng tôi dẫn lối bạn
              <br /> đến những trải nghiệm không thể nào quên.
            </p>
            <input placeholder="Nhập email của bạn" />
          </div>
          <div>
            <h4>Dịch vụ</h4>
            <p>Tour Guide</p>
            <p>Tour Package</p>
            <p>Tour Advice</p>
          </div>
          <div>
            <h4>Hỗ trợ</h4>
            <p>Tài khoản</p>
            <p>Pháp lý</p>
            <p>Liên hệ</p>
          </div>
          <div>
            <h4>Về chúng tôi</h4>
            <p>Về Airtrav</p>
            <p>Truyền thông</p>
            <p>Cơ hội việc làm</p>
          </div>
        </div>
        <p className="copyright">© 2021 ABC LLC. All rights reserved.</p>
      </footer>
    </>
  );
};

export default memo(Footer);
