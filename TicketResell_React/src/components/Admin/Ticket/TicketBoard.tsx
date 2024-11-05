import React from "react";
import SideBar from "../SideBar/SideBar";
import "./TicketBoard.css";
const TicketBoard = () => {
  return (
    <div className="Admin">
      <SideBar />
      <div className="table-container">
        <h4>Tất cả vé</h4>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Tên vé</th>
              <th>Loại vé</th>
              <th className="nho">Trạng thái</th>
              <th className="nho">Số lượng</th>
              <th className="nho">Giá</th>
              <th>Người bán</th>
              <th>Loại sự kiện</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product Title</td>
              <td>Brand Name</td>
              <td className="nho">Đã bán </td>
              <td className="nho">50</td>
              <td className="nho">200.000</td>
              <td>Category Name</td>
              <td>Category Name</td>
            </tr>
            <tr>
              <td>Product Title</td>
              <td>Brand Name</td>
              <td className="nho">Đã bán </td>
              <td className="nho">50</td>
              <td className="nho">200.000</td>
              <td>Category Name</td>
              <td>Category Name</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketBoard;
