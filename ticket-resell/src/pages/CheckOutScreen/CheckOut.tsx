import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import assets from "../../assets/assetsChat";
import { useLocation, useNavigate } from "react-router-dom";
import { link } from "fs";
import axios from "axios";

interface selectedTicket {
  ticketId: string;
  sellerName: string;
  quantity: number;
  sellerImg: string;
}

interface OrderDetailItem {
  name: string;
  type: string;
  price: number;
  quantity: number;
  userName: string;
  userImg: string;
  eventId: string;
  eventName: string;
  eventImage: string;
  location: string;
  time: string;
  id: string
}

const CheckOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subtotal, totalQuantity, selectedItems } = location.state || {};
  const [orderDetail, setOrderDetail] = useState<OrderDetailItem[]>([]);
  const [email,setEmail] = useState("")
  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")

  const submit = (() =>{
    const detail = orderDetail.map((item)=>{
      return {
        ticketId: item.id,
        ticketName: item.name,
        ticketType: item.type,
        eventImage: item.eventImage,
        eventName: item.eventName,
        userName: name,
        receiverPhone: phone,
        receiverEmail: email,
        price: item.price,
        quantity: item.quantity,
        paymentMethod: "VNPay",
      }
    })
  
    const data = {
      userId: localStorage.getItem("userId"),
      totalAmount: 6000000,
      orderDetails: detail
    }
    
    const put = async () => {
      try {
        const response = await axios.post("https://localhost:7286/api/Order/create", data)
        if(response.status === 201){
          console.log(response.data + "succes");
          const url = response.data.paymentUrl
          window.open(url)
        }
      } catch (error) {
        console.error(error)
      }
    }
    put()
  })
  
  // lấy data từ shopping cart
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderData = await Promise.all(
          selectedItems.map(async (item: selectedTicket) => {
            const response = await axios.get(
              `https://localhost:7286/api/Ticket/get-ticket/${item.ticketId}`
            );
            if (response.status === 200) {
              const order = response.data;
              return {
                name: order.ticketName,
                type: order.type,
                price: order.price,
                quantity: item.quantity,
                userName: item.sellerName,
                userImg: item.sellerImg,
                eventId: order.eventId,
                id: item.ticketId
              };
            }
            return null;
          })
        );

        const order = await Promise.all(
          orderData.map(async (item) => {
            const response = await axios.get(
              `https://localhost:7286/api/Event/${item.eventId}`
            );
            if (response.status === 200) {
              const event = response.data;
              return {
                ...item,
                eventName: event.eventName, // nối thêm event vào
                eventImage: event.eventImage,
                location: event.location,
                time: event.eventTime, 
              };
            }
            return null;
          })
        );
        setOrderDetail(order);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    if (selectedItems) {
      fetchOrderData();
    }
  }, [selectedItems]);
  return (
    <div className="checkout-page">
      <div className="checkout-section">
        <h1 className="checkout-title">Thanh toán</h1>

        {orderDetail.map((item) => (
          <div className="ticket-item">
            <div className="ticket-header">
              <img
                src={item.eventImage}
                alt="Event"
                className="ticket-image"
              />
              <div className="ticket-info">
                <span className="ticket-title">{item.name}</span>
                <span>Sự kiện: {item.eventName}</span>
              </div>
              <div className="ticket-price">{item.price} VND</div>
            </div>

            <div className="ticket-details">
              <div className="detail-item">
                <span className="detail-label">Ngày diễn ra</span>
                <span className="detail-value">{item.time}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Vị trí</span>
                <span className="detail-value">{item.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Loại vé</span>
                <span className="detail-value">{item.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Số lượng</span>
                <span className="detail-value">{item.quantity} vé</span>
              </div>
            </div>

            <div className="seller-info">
              <div className="seller-avatar"><img src={item.userImg} alt="" /></div>
              <div>
                <div>{item.userName}</div>
                <div className="rating">
                  <span className="star">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </span>
                  <span>4.9 (124 đánh giá)</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="payment-section">
          <h2 className="section-title">Phương thức thanh toán</h2>
          <div className="payment-method">
            <div className="payment-icon">
              <img src={assets.card} alt="" />
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>VNPay</div>
              <div style={{ fontSize: "0.875rem", color: "#666" }}>
                Số dư: 300.000VND
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2 className="section-title">Phương thức liên lạc</h2>
          <div className="form-group">
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              id="phone"
              required
              placeholder="Nhập tên của bạn"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              required
              placeholder="Nhập số điện thoại của bạn"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gmail">Email</label>
            <input type="email" value={email} required placeholder="Nhập email của bạn"  onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>
      </div>

      <div className="summary-section">
        <h2 className="summary-title">Tổng thanh toán</h2>
        <div className="summary-row">
          <span>Giá vé ({totalQuantity}x)</span>
          <span>{subtotal} VND</span>
        </div>
        {/* <div className="summary-row">
          <span>Phí dịch vụ</span>
          <span>40.000VND</span>
        </div> */}
        <div className="summary-row">
          <span>Tổng</span>
          <span>{subtotal} VND</span>
        </div>
        <button className="checkout-btn" onClick={()=>submit()}>Xác nhận đơn hàng</button>
        <button
          onClick={() => navigate("/cart")}
          className="checkout-btn"
          style={{ backgroundColor: "red", marginTop: "10px" }}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
