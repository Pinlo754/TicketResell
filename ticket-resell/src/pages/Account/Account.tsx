import React from "react";
import NavBar from "../../components/NavBar";
import assets from "../../assets/assetsChat";
import "./Account.css";
import MainContent from "../../components/AccountProfile/MainContent/MainContent";
import SideBar from "../../components/AccountProfile/SideBar/SideBar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const index = () => {
  return (
    <div className="account-profile">
      <ToastContainer/>
      <NavBar />
      <div className="profile">
        <div className="profile-container">
          <SideBar />
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default index;
