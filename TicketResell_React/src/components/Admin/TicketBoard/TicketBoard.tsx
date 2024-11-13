import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import "./TicketBoard.css";
import axios from "axios";
import assets from "../../../assets/assetsChat";
import * as XLSX from "xlsx";

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
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState<ticketDetail[]>([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get("/api/Ticket/list-ticket");
        if (response.status === 200) {
          const ticketList = response.data;

          const listWithName = await Promise.all(
            ticketList.map(async (item: ticketDetail) => {
              try {
                const responseUser = await axios.get(
                  `/api/Account/user-information/${item.userId}`
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
                  `/api/Event/${item.eventId}`
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
  }, [token]);

  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const input = e.target.value;
      if (input && ticket) {
        const inputResult = ticket.filter((item) =>
          item.ticketName.toLowerCase().includes(input.trim().toLowerCase())
        );
        if (inputResult.length > 0) {
          setSearchResult(inputResult);
          setShowSearch(true);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // hiển thị định dạng tiền tệ VN
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  //Xuất excel
  const exportToExcel = () => {
    // Tạo workbook và worksheet từ bảng HTML
    const table = document.getElementsByClassName("inventory-table")[0];
    if (table) {
      const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
      // Xuất file Excel
      XLSX.writeFile(workbook, "DanhSachVe.xlsx");
    } else {
      console.error("Không tìm thấy bảng với class 'inventory-table'");
    }
  };
  return (
    <div className="Admin">
      <SideBar />

      <div className="table-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4 style={{ width: "50%" }}>Tất cả vé</h4>
          <button onClick={() => exportToExcel()} className="export-button">
            Xuất file
          </button>
        </div>
        <div
          className="ls-search"
          style={{ marginBottom: "10px", borderRadius: "10px" }}
        >
          <img src={assets.search_icon} alt="" />
          <input
            onChange={inputHandler}
            style={{ width: "100%" }}
            type="text"
            placeholder="Tìm kiếm theo tên vé...."
          />
        </div>
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
            {showSearch
              ? searchResult?.map((item, index) => (
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
                    <td>{formatVND(item.price)}</td>
                    <td>{item.sellerName}</td>
                    <td>{item.event}</td>
                  </tr>
                ))
              : ticket?.map((item, index) => (
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
                    <td> </td>
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
                    <td>{formatVND(item.price)}</td>
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
