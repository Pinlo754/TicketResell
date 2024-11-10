import React, { useEffect, useState } from "react";
import "./OrderBoard.css";
import SideBar from "../SideBar/SideBar";
import axios from "axios";

interface orderDetails {
  orderId: string;
  status: string;
  orderDate: Date;
  totalAmount: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
}

interface userInfo {
  orderId: string;
}

const OrderBoard = () => {
  const [order, setOrder] = useState<orderDetails[]>();
  useEffect(() => {
    const getListOrder = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7286/api/Admin/list-order"
        );
        if (response.status === 200) {
          const orderList = response.data;
          const orderListDetail = await Promise.all(
            orderList.map(async (item: orderDetails) => {
              try {
                const responseOrder = await axios.get(
                  `http://localhost:5158/api/Order/get-user-orders/${item.userId}`
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
  }, []);

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
      <div className="table-container">
        <h4>Đơn hàng</h4>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Người mua</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((item) => (
              <tr style={{cursor:"pointer"}} >
                <td>{item.orderId}</td>
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
