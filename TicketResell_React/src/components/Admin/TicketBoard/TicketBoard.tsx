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
  const [ticket, setTicket] = useState<(ticketDetail)[]>();
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
  }, []);
  return (
    <div className="Admin">
      <SideBar />

      <div className="table-container">
        <h4>Tất cả vé</h4>
        <table className="inventory-table">
          <thead>
            <tr>
              <th style={{textAlign:"left"}}>Tên vé</th>
              <th>Loại vé</th>
              <th className="nho">Trạng thái</th>
              <th className="nho">Số lượng</th>
              <th className="nho">Giá</th>
              <th>Người bán</th>
              <th>Sự kiện</th>
              <th className="nho">Quản lí</th>
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
                <td className="nho">{item.status}</td>
                <td className="nho">{item.quantity}</td>
                <td className="nho">{item.price} VND</td>
                <td>{item.sellerName}</td>
                <td>{item.event}</td>
                <td className="nho">
                  <button className="update">Ẩn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketBoard;
