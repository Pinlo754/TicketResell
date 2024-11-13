import React, { useEffect } from "react";
import "./AdminBoard.css";
import SideBar from "../../components/Admin/SideBar/SideBar";
import DashBoard from "../../components/Admin/AdminBoard/DashBoard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AdminBoard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const role = localStorage.getItem("role")
    if(role === "Staff") navigate("/staff/main");
  else if (role === "Admin") navigate("/Admin");
  else navigate("/main");
  }, []);
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
