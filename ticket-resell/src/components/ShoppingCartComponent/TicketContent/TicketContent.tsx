import React, { useState } from "react";
import "./TicketContent.css";
import { TbMinus, TbPlus, TbX } from "react-icons/tb";
import assets from "../../../assets/assetsChat";
import { useNavigate } from "react-router-dom";
const TicketContent = () => {
  const navigate = useNavigate();
  const [ownerSelected, setOwnerSelected] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Imagine Dragon ",
      subtitle: "Ngồi, khu A, hàng 28",
      type: "Event",
      price: 800,
      quantity: 2,
      selected: false
    },
    {
      id: 2,
      title: "Tên vé là",
      subtitle: "Ngồi, khu A, hàng 28",
      type: "Event",
      price: 400,
      quantity: 3,
      selected: false
    }
  ]);
  // Handle owner checkbox selection
  const handleOwnerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setOwnerSelected(isChecked);
    setTickets(tickets.map(ticket => ({
      ...ticket,
      selected: isChecked
    })));
  };

  // Handle individual ticket selection
  const handleTicketSelect = (ticketId:number) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, selected: !ticket.selected }
        : ticket
    ));
  };

  // Handle quantity changes
  const handleQuantityChange = (ticketId:number, change:number) => {
    setTickets(tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const newQuantity = Math.max(1, ticket.quantity + change);
        return {
          ...ticket,
          quantity: newQuantity
        };
      }
      return ticket;
    }));
  };

  return (
    <div className="ticket-content">
      <div className="ticket-owner">
      <input 
          type="checkbox" 
          name="check-all" 
          id="check"
          checked={ownerSelected}
          onChange={handleOwnerSelect}
        />
        <div className="owner-info">
          <img src={assets.hongle} alt="" />
          <p>User is the owner of this ticket</p>
        </div>
        <svg
          onClick={() => navigate("/chat")}
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-current"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </div>
      {tickets.map(ticket => (
        <div className="ticket-detail" key={ticket.id}>
          <input 
            type="checkbox" 
            className="check-ticket" 
            id={`check-${ticket.id}`}
            checked={ticket.selected}
            style={{width:"30px"}}
            onChange={() => handleTicketSelect(ticket.id)}
          />
          <div className="ticket-info">
            <div className="ticket-image">
              <img src={assets.ticket} alt="ticket" />
            </div>

            <div className="ticket-title">
              <div style={{fontSize:"20px"}}>{ticket.title}</div>
              <span style={{fontSize:"12px", color:"red"}}>{ticket.subtitle}</span>
            </div>
          </div>

          <div className="ticket-type">Types: {ticket.type}</div>

          <div className="ticket-unit-price">${ticket.price}</div>

          <div className="ticket-quantity">
            <TbMinus 
              onClick={() => handleQuantityChange(ticket.id, -1)}
              style={{ cursor: 'pointer' }}
            /> 
            {ticket.quantity} 
            <TbPlus 
              onClick={() => handleQuantityChange(ticket.id, 1)}
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className="ticket-total-price">
            ${ticket.price * ticket.quantity}
          </div>

          <div className="ticket-remove">
            <TbX style={{ cursor: 'pointer' }} />
          </div>
        </div>
      ))}

    </div>
  );
};

export default TicketContent;