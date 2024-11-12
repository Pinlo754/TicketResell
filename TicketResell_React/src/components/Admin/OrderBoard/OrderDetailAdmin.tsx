import React, { useEffect, useState } from "react";
import "./OrderDetailAdmin.css";
import SideBar from "../SideBar/SideBar";
import assets from "../../../assets/assetsChat";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface orderDetails {
  orderId: string;
  orderDate: Date;
  eventName: string;
  email: string;
  phone: string;
  ticketName: string;
  price: number;
  eventImage: string;
  quantity: number;
  receiverEmail: string;
  receiverPhone: string;
  userName: string;
  ticketId: string;
  paymentMethod: string
}

const OrderDetailAdmin = () => {
  const location = useLocation();
  const { orderId, userId, total, orderDate } = location.state || {};
  const [buyerEmail, setBuyerEmail] = useState("");
  const [price, setPrice] = useState(0);
  const [typeTicket, setTypeTicket] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerImage, setSellerImage] = useState("");
  const [orderDetail, setOrderDetail] = useState<orderDetails>();

  const getUser = async (id: string) => {
    try {
      const response = await axios.get(`/api/Account/user-information/${id}`);
      if (response.status === 200) {
        const email = response.data.email;
        const name = response.data.firstName + " " + response.data.lastName;
        const image = response.data.userImage
        return {
          email,
          name,
          image
        };
      } else {
        console.error("Can't get user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSellerIdFromTicket = async (id: string) => {
    try {
      const response = await axios.get(`/api/Ticket/get-ticket/${id}`);
      if (response.status === 200) {
        const id = response.data.userId;
        const type = response.data.type;
        setTypeTicket(type)
        return id
      } else {
        console.error("Can't get user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getOrderDetail = async () => {
    try {
      const response = await axios.get(`/api/Order/get-user-orders/${userId}`);
      if (response.status === 200) {
        const data = response.data;
        const detailUser = data.find(
          (order: orderDetails) => order.orderId === orderId
        );
        setPrice(detailUser.price)
        setOrderDetail(detailUser);
        return detailUser;
      } else {
        console.error("Can't get buyer data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !orderId) return;

      try {
        // Lấy thông tin order
        const orderData = await getOrderDetail();
        if (!orderData) return;

        // lấy thông tin người mua
        const buyer = await getUser(userId);
        if (buyer) {
          setBuyerEmail(buyer.email);
        }

        // lấy thông tin người bán
        if (orderData.ticketId) {
          const sellerId = await getSellerIdFromTicket(orderData.ticketId);
          if (sellerId) {
            const seller = await getUser(sellerId);
            if (seller) {
              setSellerName(seller.name);
              setSellerImage(seller.image)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, orderId]); 

  // hiển thị định dạng tiền tệ VN
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // hiển thị ngày tháng
  const dateTime = (time: Date) => {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  return (
    <div className="Admin">
      <SideBar />
      <div className="table-container" style={{ overflowY: "scroll" }}>
        <div className="ticket-item" style={{ backgroundColor: "white" }}>
          <div className="ticket" style={{ backgroundColor: "white" }}>
            <div className="ticket-header">
              <img src={orderDetail?.eventImage} alt="Event" className="ticket-image" />

              <div className="ticket-info">
                <span className="ticket-title">{orderDetail?.ticketName}</span>
                <span>Sự kiện: {orderDetail?.eventName}</span>
              </div>

              <div className="ticket-price">{formatVND(price)}</div>
            </div>

            <div className="ticket-details">
              <div className="detail-item">
                <span className="detail-label">Vị trí</span>
                <span className="detail-value">kaldfsjalkj</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Loại vé</span>
                <span className="detail-value">{typeTicket}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Số lượng</span>
                <span className="detail-value">{orderDetail?.quantity} vé</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Ngày tạo</span>
                <span className="detail-value">{dateTime(orderDate)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tài khoản mua</span>
                <span className="detail-value">{buyerEmail}</span>
              </div>
            </div>
          </div>

          <div className="seller-info">
            <div className="seller-avatar">
              <img src={sellerImage} alt="" />
            </div>
            <div>{sellerName}</div>
          </div>
        </div>

        <div className="payment-section">
          <h2 className="section-title">Phương thức thanh toán</h2>
          <div className="payment-method">
            <div className="payment-icon">
              <img src={assets.card} alt="" />
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>{orderDetail?.paymentMethod}</div>
              <div style={{ fontSize: "0.875rem", color: "#666" }}></div>
            </div>
          </div>
        </div>

        <div
          className="contact-form"
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "15px",
          }}
        >
          <h2 className="section-title">Thông tin liên lạc</h2>
          <div className="form-group">
            <span>{`Họ và tên: ${orderDetail?.userName}`}</span>
          </div>

          <div className="form-group">
            <span>{`Số điện thoại: ${orderDetail?.receiverPhone}`}</span>
          </div>

          <div className="form-group" style={{ marginBottom: "0" }}>
            <span>{`Email: ${orderDetail?.receiverEmail}`}</span>
          </div>
        </div>
      </div>

      <div className="summary-section">
        <h2 className="summary-title">Tổng thanh toán</h2>
        <div className="summary-row">
          <span>Giá vé (6x)</span>
        </div>
        <div className="summary-row">
          <span>Tổng</span>
          <span>{formatVND(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAdmin;
