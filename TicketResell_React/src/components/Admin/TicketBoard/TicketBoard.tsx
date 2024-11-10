import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import "./TicketBoard.css";
import axios from "axios";
import assets from "../../../assets/assetsChat";

interface ticketDetail {
  ticketName: string;
  ticketId: string;
  type: string;
  status: string;
  quantity: number;
  price: number;
  userId: string;
  eventId: string;
  image: string;
  event: string;
  sellerName: string;
}

const TicketBoard = () => {
  const [ticket, setTicket] = useState<ticketDetail[]>();
  const [status, setStatus] = useState();
  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5158/api/Ticket/list-ticket"
        );
        if (response.status === 200) {
          const ticketList = response.data;

          const listWithName = await Promise.all(
            ticketList.map(async (item: ticketDetail) => {
              try {
                const responseUser = await axios.get(
                  `http://localhost:5158/api/Account/user-information/${item.userId}`
                );
                if (responseUser.status === 200) {
                  const data = responseUser.data;
                  return {
                    ...item,
                    sellerName: `${data.firstName} ${data.lastName}`,
                  };
                }
                return item;
              } catch (error) {
                console.error(error);
                return item;
              }
            })
          );

          const listWithEvent = await Promise.all(
            listWithName.map(async (item: ticketDetail) => {
              try {
                const responseEvent = await axios.get(
                  `http://localhost:5158/api/Event/${item.eventId}`
                );
                if (responseEvent.status === 200) {
                  const eventData = responseEvent.data;
                  return {
                    ...item,
                    event: eventData.eventName,
                    image: eventData.eventImage,
                  };
                }
                return item;
              } catch (error) {
                console.error(error);
                return item;
              }
            })
          );

          setTicket(listWithEvent);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTicket();
  }, []);console.log();
  
  return (
    <div className="Admin">
      <SideBar />

      <div className="table-container">
        <h4>Tất cả vé</h4>
        <table className="inventory-table">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Tên vé</th>
              <th>Loại vé</th>
              <th>Trạng thái</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Người bán</th>
              <th>Sự kiện</th>
            </tr>
          </thead>
          <tbody>
            {ticket?.map((item, index) => (
              <tr key={index}>
                <td className="ticket-info">
                  {item.ticketName}
                  <span>
                    <img
                      src={item.image}
                      alt="Customer Photo"
                      className="avatar"
                    />
                  </span>
                </td>
                <td>{item.type}</td>
                <td>
                  <span className={`status ${item.status}`}>
                    {(() => {
                      switch (item.status) {
                        case "Available":
                          return "Đang bán";
                        case "Sold":
                          return "Đã bán";
                        case "Pending":
                          return "Chờ duyệt";
                        case "Cancelled":
                          return "Bị từ chối";
                        default:
                          return item.status;
                      }
                    })()}
                  </span>
                </td>
                <td>{item.quantity}</td>
                <td>{item.price} VND</td>
                <td>{item.sellerName}</td>
                <td>{item.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketBoard;
