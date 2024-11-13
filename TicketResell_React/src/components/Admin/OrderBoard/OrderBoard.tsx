import React, { useEffect, useState } from "react";
import "./OrderBoard.css";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import assets from "../../../assets/assetsChat";
import { useNavigate } from "react-router-dom";

interface orderDetails {
  orderId: string;
  status: string;
  orderDate: Date;
  totalAmount: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
  ticketName: string
}

interface userInfo {
  orderId: string;
}

const OrderBoard = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState<orderDetails[]>([]);
  const [order, setOrder] = useState<orderDetails[]>();
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getListOrder = async () => {
      try {
        const response = await axios.get(
          "/api/Admin/list-order"
        );
        if (response.status === 200) {
          const orderList = response.data;
          const orderListDetail = await Promise.all(
            orderList.map(async (item: orderDetails) => {
              try {
                const responseOrder = await axios.get(
                  `/api/Order/get-user-orders/${item.userId}`
                );
                if (responseOrder.status === 200) {
                  const data = responseOrder.data;
                  const detailUser = data.find(
                    (order: userInfo) => order.orderId === item.orderId
                  );
                  return {
                    ...item,
                    name: detailUser.userName,
                    email: detailUser.receiverEmail,
                    phone: detailUser.receiverPhone,
                    ticketName: detailUser.ticketName,
                    status: detailUser.status // Lấy status của order detail
                  };
                }
                return item;
              } catch (error) {
                console.error(error);
                return item;
              }
            })
          );
          setOrder(orderListDetail);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getListOrder();
  },[token]);
  
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

  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const input = e.target.value;
      if (input && order ) {
        const inputResult = order.filter((item) =>
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
  }
  return (
    <div className="Admin">
      <SideBar />
      <div className="table-container">
        <h4>Đơn hàng</h4>
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
        <table className="orders-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên vé</th>
              <th>Người mua</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {showSearch ?  
            searchResult?.map((item,index) => (
              <tr key={index} style={{cursor:"pointer"}} onClick={()=>navigate("./detail",{state:{orderId: item.orderId, userId: item.userId, total: item.totalAmount, orderDate: item.orderDate }})} >
                <td>{item.orderId}</td>
                <td>{item.ticketName}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <span className={item.status}>
                    {(() => {
                      switch (item.status) {
                        case "Pending":
                          return "Chờ duyệt";
                        default:
                          return item.status;
                      }
                    })()}
                  </span>
                </td>
                <td>{dateTime(item.orderDate)}</td>
                <td>{formatVND(item.totalAmount)}</td>
              </tr>
            ))
            :order?.map((item,index) => (
              <tr key={index} style={{cursor:"pointer"}} onClick={()=>navigate("./detail", {state:{orderId: item.orderId, userId: item.userId, total: item.totalAmount, orderDate: item.orderDate }})}  >
                <td>{item.orderId}</td>
                <td>{item.ticketName}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <span className={item.status}>
                    {(() => {
                      switch (item.status) {
                        case "Pending":
                          return "Chờ duyệt";
                        default:
                          return item.status;
                      }
                    })()}
                  </span>
                </td>
                <td>{dateTime(item.orderDate)}</td>
                <td>{formatVND(item.totalAmount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBoard;
