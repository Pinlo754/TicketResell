import React from "react";
import "./AdminBoard.css";
import SideBar from "../../components/Admin/SideBar/SideBar";
import DashBoard from "../../components/Admin/AdminBoard/DashBoard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminBoard = () => {
  return (
    <div className="Admin">
      <div className="menu-page">
      <ToastContainer/>
        <SideBar />
        <DashBoard/>
      </div>
    </div>
  );
};

export default AdminBoard;
