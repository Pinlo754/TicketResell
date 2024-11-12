import React, { useEffect, useState } from "react";
import "./TicketContent.css";
import { TbMinus, TbPlus, TbX } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../../../assets/assetsChat";
import { useNavigate } from "react-router-dom";

interface Cart {
  firstName: string;
  lastName: string;
  userId: string;
  sellerId: string;
  ticketId: string;
  ticketName: string;
  ticketRow: string;
  ticketType: string;
  ticketSection: string;
  quantity: number;
  price: number;
  eventName: string;
  eventImage: string;
  sellerImage: string;
  availableQuantity: number;
}

interface CartUpdateRequest {
  userId: string;
  ticketId: string;
  quantity: number;
}

interface TicketContentProps {
  onTotalChange: (
    subtotal: number,
    totalQuantity: number,
    selectedItems: {
      ticketId: string;
      sellerName: string;
      quantity: number;
      sellerImg: string;
    }[]
  ) => void;
}

const TicketContent: React.FC<TicketContentProps> = ({ onTotalChange }) => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<Cart[]>([]);
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(
    new Set()
  );
  const user = localStorage.getItem("userId");

  //Tính total money, total quantity, và thông tin gửi về component cha
  const calculateTotals = (cards: Cart[], selected: Set<string>) => {
    let subtotal = 0;
    let totalQuantity = 0;

    cards.forEach((item) => {
      if (selected.has(item.ticketId)) {
        subtotal += item.price * item.quantity;
        totalQuantity += item.quantity;
      }
    });
    const selectedItems = cards
      .filter((item) => selected.has(item.ticketId)) // Lọc vé được chọn
      .map((item) => ({
        ticketId: item.ticketId,
        sellerName: item.firstName + " " + item.lastName,
        quantity: item.quantity,
        sellerImg: item.sellerImage,
      }));
    onTotalChange(subtotal, totalQuantity, selectedItems);
  };

  //xử lí checkbox
  const handleCheckboxChange = (ticketId: string) => {
    // Kiểm tra xem vé còn hàng không
    const ticket = cardData.find((item) => item.ticketId === ticketId);
    if (ticket && ticket.availableQuantity === 0) {
      toast.error("Vé này đã hết hàng!");
      return;
    }

    const newSelected = new Set(selectedTickets);
    if (newSelected.has(ticketId)) {
      newSelected.delete(ticketId);
    } else {
      newSelected.add(ticketId);
    }
    setSelectedTickets(newSelected);
    calculateTotals(cardData, newSelected);
  };

  //cập nhật số lượng vé
  const updateQuantity = async (ticketId: string, newQuantity: number) => {
    try {
      const updateRequest: CartUpdateRequest = {
        userId: user || "",
        ticketId: ticketId,
        quantity: newQuantity,
      };

      const response = await axios.put(
        "http://localhost:5158/api/Cart/update-cart",
        updateRequest
      );

      if (response.status === 200) {
        const updatedData = cardData.map((item) =>
          item.ticketId === ticketId ? { ...item, quantity: newQuantity } : item
        );
        setCardData(updatedData);
        calculateTotals(updatedData, selectedTickets);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Server hiện đang gặp lỗi. Thử lại sau");
    }
  };

  //Thay đổi số lượng vé muốn mua
  const handleQuantityChange = async (
    ticketId: string,
    delta: number,
    currentQuantity: number
  ) => {
    const newQuantity = currentQuantity + delta;
    let maxQuantity = newQuantity;
    try {
      const response = await axios.get(
        `http://localhost:5158/api/Ticket/get-ticket/${ticketId}`
      );
      if (response.status === 200) {
        const info = response.data;
        maxQuantity = info.quantity;
      }
    } catch (error) {}
    if (newQuantity < 1 || newQuantity > maxQuantity) {
      toast.warn(`Chỉ còn ${maxQuantity} vé còn lại`);
      return;
    }
    updateQuantity(ticketId, newQuantity);
  };

  // xử lí xóa vé ra khỏi cart
  const handleRemoveTicket = async (ticket: string, id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5158/api/Cart/remove-cart/`,
        {
          params: {
            userId: id,
            ticketId: ticket,
          },
        }
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing ticket:", error);
      alert("Server hiện đang gặp lỗi. Thử lại sau");
    }
  };

  // Kiểm tra số lượng vé có sẵn và cập nhật cardData
  const checkTicketAvailability = async (cartItems: Cart[]) => {
    try {
      const updatedItems = await Promise.all(
        cartItems.map(async (item) => {
          try {
            const response = await axios.get(
              `http://localhost:5158/api/Ticket/get-ticket/${item.ticketId}`
            );
            if (response.status === 200) {
              const availableQuantity = response.data.quantity;

              // Nếu số lượng trong giỏ nhiều hơn số lượng có sẵn, điều chỉnh xuống
              const adjustedQuantity =
                item.quantity > availableQuantity
                  ? availableQuantity
                  : item.quantity;

              // Cập nhật số lượng trong cart nếu cần điều chỉnh
              if (adjustedQuantity !== item.quantity) {
                await updateQuantity(item.ticketId, adjustedQuantity);
              }

              return {
                ...item,
                availableQuantity,
                quantity: adjustedQuantity,
              };
            }
            return item;
          } catch (error) {
            console.error(`Error checking ticket ${item.ticketId}:`, error);
            return item;
          }
        })
      );
      setCardData(updatedItems);
    } catch (error) {
      console.error("Error checking ticket availability:", error);
    }
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


  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Cart/get-cart/${user}`
        );
        if (response.status === 200) {
          const cartItems = response.data;
          await checkTicketAvailability(cartItems);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (user) {
      getCart();
    }
  }, [user]);

  return cardData.length > 0 ? (
    <div>
      {cardData?.map((item) => (
        <div className="ticket-content" key={item.ticketId}>
          <div className="ticket-detail">
            <input
              type="checkbox"
              className="check-ticket"
              checked={selectedTickets.has(item.ticketId)}
              onChange={() => handleCheckboxChange(item.ticketId)}
              disabled={item.availableQuantity === 0}
            />
            <div className="ticket-info"  style={{cursor:"pointer"}}  onClick={() => navigate(`/ticketDetail/${item.ticketId}`)}>
              <div className="ticket-image">
                <img src={item.eventImage} alt="" />
              </div>

              <div className="ticket-title">
                {item.ticketName}
                <div style={{ color: "red", fontSize: "10px" }}>
                  {`${item.ticketType}, khu ${item.ticketSection}, hàng ${item.ticketRow}`}
                </div>
                {item.availableQuantity === 0 && (
                  <div className="out-of-stock">Hết hàng</div>
                )}
                {item.availableQuantity > 0 && (
                  <div className="stock-info">Còn {item.availableQuantity} vé</div>
                )}
              </div>
            </div>

            <div className="ticket-owner">
              <div className="owner-info">
                <img src={item.sellerImage} alt="" />
                <p>{item.firstName + " " + item.lastName}</p>
              </div>
            </div>
            <div className="ticket-type">{"Sự kiện: " + item.eventName}</div>

            <div className="ticket-unit-price">{formatVND(item.price)}</div>

            <div className="ticket-quantity">
              <TbMinus
                className={`quantity-btn ${item.availableQuantity === 0 ? 'disabled' : ''}`}
                onClick={() =>
                  handleQuantityChange(
                    item.ticketId,
                    -1,
                    item.quantity
                  )
                }
              />
              {item.quantity}
              <TbPlus
                className={`quantity-btn ${item.quantity >= (item.availableQuantity || 0) ? 'disabled' : ''}`}
                onClick={() =>
                  handleQuantityChange(
                    item.ticketId,
                    1,
                    item.quantity
                  )
                }
              />
            </div>

            <div className="ticket-total-price">
              {formatVND(item.price * item.quantity)}
            </div>

            <div
              className="ticket-remove"
              onClick={() => handleRemoveTicket(item.ticketId, item.userId)}>
              <TbX />
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="welcome">
      <img src={assets.cart} alt="" />
      <p>Tiếp tục mua sắm với Festix nhé!</p>
    </div>
  );
};
export default TicketContent;
