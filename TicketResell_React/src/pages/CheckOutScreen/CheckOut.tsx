import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import assets from "../../assets/assetsChat";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  id: string;
  sellerId: string;
}

interface GroupedOrderInfo {
  sellerId: string;
  userImg: string;
  userName: string;
  items: OrderDetailItem[];
}

interface TicketAvailability {
  ticketId: string;
  available: number;
  requested: number;
}

const CheckOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subtotal, totalQuantity, selectedItems } = location.state || {};
  const [orderDetail, setOrderDetail] = useState<OrderDetailItem[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [displayOrder, setDisplayOrder] = useState<GroupedOrderInfo[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activePayment, setActivePayment] = useState("");
  const [unavailableTickets, setUnavailableTickets] = useState<
    TicketAvailability[]
  >([]);

  //  kiểm tra xem vé có khả dụng không trc khi tạo đơn
  const checkTicketAvailability = async () => {
    try {
      const unavailable: TicketAvailability[] = [];
      for (const item of orderDetail) {
        const response = await axios.get(
          `/api/Ticket/get-ticket/${item.id}`
        );

        if (response.status === 200) {
          const ticketData = response.data;
          const availableQuantity = ticketData.quantity;

          if (availableQuantity < item.quantity) {
            unavailable.push({
              ticketId: item.id,
              available: availableQuantity,
              requested: item.quantity,
            });
          }
        }
      }

      if (unavailable.length > 0) {
        setUnavailableTickets(unavailable);
        setShowPopup(true);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error checking ticket availability:", error);
      return false;
    }
  };

  //Đặt hàng
  const submit = async () => {
    if (!name || !phone || !email) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi thanh toán!");
      return;
    }
    const isAvailable = await checkTicketAvailability();

    if (!isAvailable) {
      return;
    }

    const detail = orderDetail.map((item) => {
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
        paymentMethod: activePayment,
      };
    });
    const data = {
      userId: localStorage.getItem("userId"),
      totalAmount: subtotal,
      orderDetails: detail,
    };
    //  try {
    //    const response = await axios.post(
    //      "https://localhost:7286/api/Order/create",
    //      data
    //    );
    //    if (response.status === 201) {
    //      const url = response.data.paymentUrl;
    //      window.open(url);
    //    }
    //  } catch (error) {
    //    console.error(error);
    //  }

     try {
       const response = await axios.post(
         "/api/Wallet/create",
          data
          );
          if (response.status === 200) {    
           toast.success("Đặt hàng thành công! Vui lòng kiểm tra email để nhận vé.");
           navigate("/order-confirmation?vnp_TxnRef=" + response.data.order.orderId +"&Amount=" + response.data.order.totalAmount + "&PayDate=" + response.data.order.orderDate + "&vnp_ResponseCode=00");
          }
     } catch (error) {
       console.error(error);
     }
  };

  // hiển thị order theo id của người bán (chỉ để hiển thị)
  const groupOrdersWithUserInfo = (
    array: OrderDetailItem[]
  ): GroupedOrderInfo[] => {
    // nhóm các ticket theo id người bán
    const grouped = array.reduce<{ [key: string]: OrderDetailItem[] }>(
      (acc, item) => {
        const sellerId = item.sellerId;
        if (!acc[sellerId]) {
          acc[sellerId] = [];
        }
        acc[sellerId].push(item);
        return acc;
      },
      {}
    );

    // chuyển sang array
    return Object.entries(grouped).map(([sellerId, items]) => {
      // Lấy userImg và userName từ item đầu tiên của mỗi nhóm
      const firstItem = items[0];
      return {
        sellerId,
        userImg: firstItem.userImg,
        userName: firstItem.userName,
        items,
      };
    });
  };

    // hiển thị định dạng tiền tệ VN
    const formatVND = (amount: number) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };

  // lấy data từ shopping cart
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderData = await Promise.all(
          selectedItems.map(async (item: selectedTicket) => {
            const response = await axios.get(
              `/api/Ticket/get-ticket/${item.ticketId}`
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
                id: item.ticketId,
                sellerId: order.userId,
              };
            }
          })
        );
        const order = await Promise.all(
          orderData.map(async (item) => {
            const response = await axios.get(
              `/api/Event/${item.eventId}`
            );
            if (response.status === 200) {
              const event = response.data;
              const dateTime = (time: Date) => {
                const date = new Date(time);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return `Ngày ${day} tháng ${month} năm ${year}`;
              };
              return {
                ...item,
                eventName: event.eventName, // nối thêm event vào
                eventImage: event.eventImage,
                location: event.location,
                time: dateTime(event.eventTime),
              };
            }
            return null;
          })
        );
        setOrderDetail(order);
        setDisplayOrder(groupOrdersWithUserInfo(order));
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
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Không đủ vé</h2>
            <div className="popup-message">
              {unavailableTickets.map((ticket, index) => {
                const ticketInfo = orderDetail.find(
                  (item) => item.id === ticket.ticketId
                );
                return (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    Vé "{ticketInfo?.name}" chỉ còn {ticket.available} vé (bạn
                    yêu cầu {ticket.requested} vé)
                  </div>
                );
              })}
            </div>
            <button className="popup-button" onClick={() => navigate("/main")}>
              Quay về trang chủ
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
      <div className="checkout-section">
        <h1 className="checkout-title">Thanh toán</h1>

        {displayOrder.map((item) => (
          <div className="ticket-item">
            {item.items.map((ticket) => (
              <div className={item.items.length > 1 ? "ticket" : ""}>
                <div className="ticket-header">
                  <img
                    src={ticket.eventImage}
                    alt="Event"
                    className="ticket-image"
                  />

                  <div className="ticket-info">
                    <span className="ticket-title">{ticket.name}</span>
                    <span>Sự kiện: {ticket.eventName}</span>
                  </div>

                  <div className="ticket-price">{formatVND(ticket.price)}</div>
                </div>

                <div className="ticket-details">
                  <div className="detail-item">
                    <span className="detail-label">Ngày diễn ra</span>
                    <span className="detail-value">{ticket.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Vị trí</span>
                    <span className="detail-value">{ticket.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Loại vé</span>
                    <span className="detail-value">{ticket.type}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Số lượng</span>
                    <span className="detail-value">{ticket.quantity} vé</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="seller-info">
              <div className="seller-avatar">
                <img src={item.userImg} alt="" />
              </div>
              <div>
                <div>{item.userName}</div>
              </div>
            </div>
          </div>
        ))}

        <div className="payment-section">
          <h2 className="section-title">Phương thức thanh toán</h2>
          <div  onClick={()=>setActivePayment("VNPay")} className={`payment-method ${activePayment === "VNPay" ? "active" : ""}`}>
            <div className="payment-icon">
              <img src={assets.card} alt="" />
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>VNPay</div>
            </div>
          </div>
          <div onClick={()=>setActivePayment("Vi")} className={`payment-method ${activePayment === "Vi" ? "active" : ""}`}>
            <div className="payment-icon">
              <img src={assets.card} alt="" />
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>Ví</div>
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
            <input
              type="email"
              value={email}
              required
              placeholder="Nhập email của bạn"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="summary-section">
        <h2 className="summary-title">Tổng thanh toán</h2>
        <div className="summary-row">
          <span>Giá vé ({totalQuantity}x)</span>
          <span>{formatVND(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Tổng</span>
          <span>{formatVND(subtotal)}</span>
        </div>
        <button className="checkout-btn" onClick={() => submit()}>
          Xác nhận đơn hàng
        </button>
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
