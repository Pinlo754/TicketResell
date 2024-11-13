import React, { useEffect, useMemo, useState } from "react";
import assets from "../../../assets/assetsChat";
import "./DashBoard.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import axios from "axios";

interface orderDetails {
  orderDate: Date;
  userId: String;
  orderId: string;
  ticketName: string;
  quantity: number;
  price: number;
}

const data = [
  { name: "Tháng 5", Total: 1_200_000 },
  { name: "Tháng 6", Total: 2200100 },
  { name: "Tháng 7", Total: 800000 },
  { name: "Tháng 8", Total: 160330 },
  { name: "Tháng 9", Total: 93100 },
  { name: "Tháng 10", Total: 1000300 },
  { name: "Tháng 11", Total: 1700000 },
  { name: "Tháng 12", Total: 100170 },
];

const DashBoard = () => {
  const [numberTicket, setNumberTicket] = useState(0);
  const [numberAccount, setNumberAccount] = useState(0);
  const [numberOrder, setNumberOrder] = useState(0);
  const [recentOrderList, setRecentOrderList] = useState<orderDetails[]>([]);
  
  const getNumberAccount = async () => {
    try {
      const response = await axios.get("/api/Admin/list-user");
      if (response.status === 200) {
        setNumberAccount(response.data.length);
      } else {
        console.error("Can't get data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const getNumberOrder = async () => {
    try {
      const response = await axios.get("/api/Admin/list-order");
      if (response.status === 200) {
        const data = response.data;
        setNumberOrder(data.length);
        const recentOrders = getSortedRecentOrders(data);
        const recentOrdersList = await Promise.all(
          recentOrders.map(async (item: orderDetails) => {
            try {
              const response = await axios.get(
                `/api/Order/get-user-orders/${item.userId}`
              );
              if (response.status === 200) {
                const data = response.data;
                const detailUser = data.find(
                  (order: orderDetails) => order.orderId === item.orderId
                );
                return {
                  ...item,
                  quantity: detailUser.quantity,
                  price: detailUser.price,
                  ticketName: detailUser.ticketName,
                };
              }
              return item;
            } catch (error) {
              console.error(error);
              return item;
            }
          })
        );
        setRecentOrderList(recentOrdersList);
      } else {
        console.error("Can't get data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const getNumberTicket = async () => {
    try {
      const response = await axios.get("/api/Ticket/list-ticket");
      if (response.status === 200) {
        setNumberTicket(response.data.length);
      } else {
        console.error("Can't get data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const getSortedRecentOrders = (orders: orderDetails[] | undefined) => {
    if (!orders) return [];

    return orders
      .sort((a, b) => {
        const dateA = new Date(a.orderDate);
        const dateB = new Date(b.orderDate);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 4);
  };

  
  // Hiển thị định dạng tiền tệ VN
  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  useEffect(() => {
    getNumberOrder();
    getNumberTicket();
    getNumberAccount();
  }, []);

  return (
    <div className="dashboard">
      <h4 className="dashboard-title">Dashboard</h4>

      <div className="cards-container">
        <div className="dashboard-card">
          <div className="card-content">
            <div className="icon-wrapper orders">
              <svg
                viewBox="0 0 1024 1024"
                focusable="false"
                data-icon="shopping-cart"
                width="2em"
                height="2em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 00-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 100 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 00-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 00-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-title">Đơn hàng</div>
              <div className="stat-value">{numberOrder}</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <div className="icon-wrapper inventory">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="shopping"
                width="2em"
                height="2em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-title">Tất cả vé</div>
              <div className="stat-value">{numberTicket}</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <div className="icon-wrapper customers">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="user"
                width="2em"
                height="2em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-title">Tài Khoản</div>
              <div className="stat-value">{numberAccount}</div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <div className="icon-wrapper revenue">
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="dollar-circle"
                width="2em"
                height="2em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm47.7-395.2l-25.4-5.9V348.6c38 5.2 61.5 29 65.5 58.2.5 4 3.9 6.9 7.9 6.9h44.9c4.7 0 8.4-4.1 8-8.8-6.1-62.3-57.4-102.3-125.9-109.2V263c0-4.4-3.6-8-8-8h-28.1c-4.4 0-8 3.6-8 8v33c-70.8 6.9-126.2 46-126.2 119 0 67.6 49.8 100.2 102.1 112.7l24.7 6.3v142.7c-44.2-5.9-69-29.5-74.1-61.3-.6-3.8-4-6.6-7.9-6.6H363c-4.7 0-8.4 4-8 8.7 4.5 55 46.2 105.6 135.2 112.1V761c0 4.4 3.6 8 8 8h28.4c4.4 0 8-3.6 8-8.1l-.2-31.7c78.3-6.9 134.3-48.8 134.3-124-.1-69.4-44.2-100.4-109-116.4zm-68.6-16.2c-5.6-1.6-10.3-3.1-15-5-33.8-12.2-49.5-31.9-49.5-57.3 0-36.3 27.5-57 64.5-61.7v124zM534.3 677V543.3c3.1.9 5.9 1.6 8.8 2.2 47.3 14.4 63.2 34.4 63.2 65.1 0 39.1-29.4 62.6-72 66.4z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <div className="stat-title">Lợi nhuận</div>
              <div className="stat-value">890,686,000</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div style={{ width: "40%" }} className="recent-orders">
          <h5>Đơn gần đây</h5>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Tên vé</th>
                <th style={{ width: "30%" }}>Số lượng</th>
                <th style={{textAlign:"center"}}>Giá</th>
              </tr>
            </thead>
            <tbody>
              {recentOrderList?.map((item, index) => (
                <tr key={index}>
                  <td>{item.ticketName}</td>
                  <td className="gia-tri-bang">{item.quantity}</td>
                  <td className="gia-tri-bang">{formatVND(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="chart-container">
          <div className="title">Lợi nhuận</div>
          <ResponsiveContainer width="100%">
            <AreaChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#87CBB9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#87CBB9" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="name" stroke="gray" />

              <CartesianGrid strokeDasharray="3 3" className="chartGrid" />

              <Tooltip
                formatter={(value: number) => value.toLocaleString("vi-VN")}
              />

              <Area
                type="monotone"
                dataKey="Total"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#total)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
