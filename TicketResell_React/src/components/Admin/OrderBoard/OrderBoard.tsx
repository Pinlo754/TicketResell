import React, { useEffect } from "react";
import "./OrderBoard.css";
import SideBar from "../SideBar/SideBar";
import axios from "axios";

const OrderBoard = () => {
  useEffect(() => {
    const getListOrder = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7286/api/Admin/list-order"
        );
        if (response.status === 200) {
          const ticketList = response.data;

          // const listWithName = await Promise.all(
          //   ticketList.map(async (item: ticketDetail) => {
          //     try {
          //       const responseUser = await axios.get(
          //         `http://localhost:5158/api/Account/user-information/${item.userId}`
          //       );
          //       if (responseUser.status === 200) {
          //         const data = responseUser.data;
          //         return {
          //           ...item,
          //           sellerName: `${data.firstName} ${data.lastName}`,
          //         };
          //       }
          //       return item;
          //     } catch (error) {
          //       console.error(error);
          //       return item;
          //     }
          //   })
          // );
        }
      } catch (error) {
        console.error(error);
      }
      getListOrder();
    };
  }, []);
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
              <th>Số lượng</th>
              <th>Ngày tạo</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Order Id</td>
              <td>Tên vé</td>
              <td>100.000</td>
              <td>Tên</td>
              <td>2</td>
              <td>Ngày Giờ</td>
              <td>$160.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderBoard;
