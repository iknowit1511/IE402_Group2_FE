import React, { memo, useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.scss";

function Booking() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Nhận dữ liệu từ trang chi tiết tour
  const tourData = location.state?.tourData;
  const selectedDate = location.state?.selectedDate;
  const guestCount = location.state?.guestCount;

  // Fallback từ URL params nếu không có state
  const maTour = searchParams.get("maTour") || tourData?.id || "TTH-xxxxx";
  const tenTour =
    searchParams.get("tenTour") ||
    tourData?.title ||
    "Huế mộng mơ - Dấu ấn cố đô";
  const [formData, setFormData] = useState({
    hoTen: "",
    sdt: "",
    email: "",
    noiKhoiHanh: "",
    ngayKhoiHanh: selectedDate || tourData?.startDate || "",
  });

  const [soLuong, setSoLuong] = useState({
    nguoiLon: guestCount || 1,
    treEm: 0,
    emBe: 0,
  });

  // Sử dụng giá từ tourData nếu có, không thì dùng giá mặc định
  const prices = {
    nguoiLon: tourData.price || 2000000,
    treEm: tourData.price ? Math.floor(tourData.price * 0.6) : 1200000, // 60% giá người lớn
    emBe: tourData.price ? Math.floor(tourData.price * 0.15) : 300000, // 15% giá người lớn
  };

  // Kiểm tra nếu không có dữ liệu tour
  useEffect(() => {
    if (!tourData && !searchParams.get("maTour")) {
      // Thử lấy từ sessionStorage
      const savedData = sessionStorage.getItem("tourBookingData");
      if (!savedData) {
        alert("Không có dữ liệu tour. Vui lòng chọn tour trước khi đặt.");
        navigate("/tour");
      }
    }
  }, [tourData, searchParams, navigate]);

  const formatCurrency = (value) => value.toLocaleString("vi-VN") + "đ";

  const tongTien =
    soLuong.nguoiLon * prices.nguoiLon +
    soLuong.treEm * prices.treEm +
    soLuong.emBe * prices.emBe;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeCount = (type, delta) => {
    setSoLuong((prev) => {
      const newValue = Math.max(0, prev[type] + delta);
      return { ...prev, [type]: newValue };
    });
  };

  const handleSubmit = () => {
    const data = {
      ...formData,
      ...soLuong,
      maTour,
    };
    console.log("Dữ liệu gửi đi:", data);
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2>Thông tin khách hàng</h2>
        <div className="form-row row-2">
          <div className="form-group">
            <label>Họ và Tên</label>
            <input
              type="text"
              name="hoTen"
              placeholder="Họ và tên"
              value={formData.hoTen}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="sdt"
              placeholder="Số điện thoại"
              value={formData.sdt}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row row-2">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-subgroup">
            <div className="form-group">
              <label>Nơi khởi hành</label>
              <input
                type="text"
                name="noiKhoiHanh"
                placeholder="Nơi khởi hành"
                value={formData.noiKhoiHanh}
                onChange={handleChange}
              />
            </div>
            {/* <div className="form-group">
              <label>Ngày khởi hành</label>
              <input
                type="date"
                name="ngayKhoiHanh"
                value={formData.ngayKhoiHanh}
                onChange={handleChange}
              />
            </div> */}
          </div>
        </div>

        <h3>Số lượng người</h3>
        <div className="number-group">
          <label>Người lớn</label>
          <div className="number-input">
            <button type="button" onClick={() => changeCount("nguoiLon", -1)}>
              -
            </button>
            <span>{soLuong.nguoiLon}</span>
            <button type="button" onClick={() => changeCount("nguoiLon", 1)}>
              +
            </button>
          </div>
        </div>
        <div className="number-group">
          <label>Trẻ em (&lt;12 tuổi)</label>
          <div className="number-input">
            <button type="button" onClick={() => changeCount("treEm", -1)}>
              -
            </button>
            <span>{soLuong.treEm}</span>
            <button type="button" onClick={() => changeCount("treEm", 1)}>
              +
            </button>
          </div>
        </div>
        <div className="number-group">
          <label>Em bé (&lt;2 tuổi)</label>
          <div className="number-input">
            <button type="button" onClick={() => changeCount("emBe", -1)}>
              -
            </button>
            <span>{soLuong.emBe}</span>
            <button type="button" onClick={() => changeCount("emBe", 1)}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-box">
          <img src="/images/image1.jpg" alt="Huế" />
          <h3>{tenTour}</h3>
          <p>Mã tour : {maTour}</p>
          <p>Khởi hành : {formData.ngayKhoiHanh}</p>
          <p>Thời gian : 3N2Đ</p>
          <p>
            Người lớn :{" "}
            <strong>
              {formatCurrency(prices.nguoiLon)} x {soLuong.nguoiLon}
            </strong>
          </p>
          <p>
            Trẻ em :{" "}
            <strong>
              {formatCurrency(prices.treEm)} x {soLuong.treEm}
            </strong>
          </p>
          <p>
            Em bé :{" "}
            <strong>
              {formatCurrency(prices.emBe)} x {soLuong.emBe}
            </strong>
          </p>
          <p className="tongTien" style={{ color: "red" }}>
            Tổng :{" "}
            <span style={{ color: "red" }}>{formatCurrency(tongTien)}</span>
          </p>
        </div>
        <div className="submit-button">
          <Link
            to="/payment"
            state={{
              formData,
              soLuong,
              maTour,
              tenTour,
              tongTien,
            }}
          >
            <button onClick={handleSubmit}>Thanh toán ngay</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(Booking);
