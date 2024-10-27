import React from 'react';
import "./CheckOut.css"
import assets from '../../assets/assetsChat';
import { useNavigate } from 'react-router-dom';
const CheckOut = () => {
  const navigate = useNavigate();
  return (
    <div className="checkout-page">
      <div className="checkout-section">
        <h1 className="checkout-title">Thanh toán</h1>

        <div className="ticket-item">
          <div className="ticket-header">
            <img src="/api/placeholder/120/80" alt="Event" className="ticket-image" />
            <div className="ticket-info">
              <span className="ticket-title">Tên vé</span>
              <span>Sự kiện: Concert</span>
            </div>
            <div className="ticket-price">200.000VND</div>
          </div>

          <div className="ticket-details">
            <div className="detail-item">
              <span className="detail-label">Ngày diễn ra</span>
              <span className="detail-value">31 tháng 12, 2024</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Vị trí</span>
              <span className="detail-value">Hồ Chí Minh</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Loại vé</span>
              <span className="detail-value">VIP  A</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Số lượng</span>
              <span className="detail-value">2 vé</span>
            </div>
          </div>

          <div className="seller-info">
            <div className="seller-avatar"></div>
            <div>
              <div>Ticket Owner</div>
              <div className="rating">
                <span className="star">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span>4.9 (124 đánh giá)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h2 className="section-title">Phương thức thanh toán</h2>
          <div className="payment-method">
            <div className="payment-icon"><img src={assets.card} alt="" /></div>
            <div>
              <div style={{ fontWeight: 500 }}>Ví</div>
              <div style={{ fontSize: '0.875rem', color: '#666' }}>Số dư: 300.000VND</div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2 className="section-title">Phương thức liên lạc</h2>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input type="tel" id="phone" required placeholder="Nhập số điện thoại của bạn" />
          </div>
        </div>
      </div>

      <div className="summary-section">
        <h2 className="summary-title">Tổng thanh toán</h2>
        <div className="summary-row">
          <span>Giá vé (2x)</span>
          <span>400.00VND</span>
        </div>
        <div className="summary-row">
          <span>Phí dịch vụ</span>
          <span>40.000VND</span>
        </div>
        <div className="summary-row">
          <span>Tổng</span>
          <span>420.000VND</span>
        </div>
        <button className="checkout-btn">Xác nhận đơn hàng</button>
        <button onClick={()=>navigate("/cart") } className="checkout-btn" style={{backgroundColor:"red", marginTop:"10px"}}>Hủy</button>
      </div>
    </div>
  );
};

export default CheckOut;
