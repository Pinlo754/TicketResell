import React from "react";
import "./OrderBoard.css";
import SideBar from "../SideBar/SideBar";

const OrderBoard = () => {
  return (
    <div className="Admin">
      <SideBar />
      <div className="table-container">
        <h4>Orders</h4>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên vé</th>
              <th>Price</th>
              <th>Người bán</th>
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
