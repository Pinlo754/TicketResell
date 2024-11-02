import React, { useEffect, useState } from "react";
import "./TicketContent.css";
import { TbMinus, TbPlus, TbX } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../../../assets/assetsChat";

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

// 
  const handleCheckboxChange = (ticketId: string) => {
    const newSelected = new Set(selectedTickets);
    if (newSelected.has(ticketId)) {
      newSelected.delete(ticketId);
    } else {
      newSelected.add(ticketId);
    }
    setSelectedTickets(newSelected);
    calculateTotals(cardData, newSelected);
  };

  const updateQuantity = async (ticketId: string, newQuantity: number) => {
    try {
      // Create request body according to API specification
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

  const handleQuantityChange = async (
    ticketId: string,
    delta: number,
    currentQuantity: number
  ) => {
    const newQuantity = currentQuantity + delta;
    let maxQuantity = newQuantity
    try {
        const response = await axios.get(`http://localhost:5158/api/Ticket/get-ticket/${ticketId}`) 
        if (response.status === 200) {
          const info = response.data
          maxQuantity = info.quantity  
        }     
    } catch (error) {
      
    }
    if (newQuantity < 1 || newQuantity > maxQuantity ) {
      toast.warn(`Chỉ còn ${maxQuantity} vé còn lại`)
      return;
    }
    updateQuantity(ticketId, newQuantity);
  };

  const handleRemoveTicket = async (ticket: string, id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5158/api/Cart/remove-cart/`,
        {
          params: {
            userId: id,
            ticketId: ticket
          }
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

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Cart/get-cart/${user}`
        );
        if (response.status === 200) {
          setCardData(response.data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    
    if (user) {
      getCart();
    }
  }, [user]);
  return cardData.length>0 ? (
    <div>
      {cardData?.map((item) => (
        <div className="ticket-content" key={item.ticketId}>
          <div className="ticket-detail">
            <input
              type="checkbox"
              className="check-ticket"
              checked={selectedTickets.has(item.ticketId)}
              onChange={() => handleCheckboxChange(item.ticketId)}
            />
            <div className="ticket-info">
              <div className="ticket-image">
                <img src={item.eventImage} alt="" />
              </div>

              <div className="ticket-title">
                {item.ticketName}
                <div style={{ color: "red", fontSize: "10px" }}>
                  {`${item.ticketType}, khu ${item.ticketSection}, hàng ${item.ticketRow}`}
                </div>
              </div>
            </div>

            <div className="ticket-owner">
              <div className="owner-info">
                <img src={item.sellerImage} alt="" />
                <p>{item.firstName + " " + item.lastName}</p>
              </div>
            </div>
            <div className="ticket-type">{"Sự kiện: " + item.eventName}</div>

            <div className="ticket-unit-price">${item.price}</div>

            <div className="ticket-quantity">
              <TbMinus
                className="quantity-btn"
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
                className="quantity-btn"
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
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <div
              className="ticket-remove"
              onClick={() => handleRemoveTicket(item.ticketId,item.userId)}>
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
  )
};

export default TicketContent;
