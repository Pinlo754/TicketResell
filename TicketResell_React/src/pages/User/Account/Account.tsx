import React from "react";
import NavBar from "../../../components/NavBar";
import assets from "../../../assets/assetsChat";
import "./Account.css";
import MainContent from "../../../components/AccountProfile/MainContent/MainContent";
import SideBar from "../../../components/AccountProfile/SideBar/SideBar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "../../../components/ScrollToTop";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Footer from "../../../components/Footer";
const index = () => {
  return (
    <div className="account-profile">
      <ToastContainer />
      {/* SCROLL TO TOP */}
      <ScrollToTop />

      {/* NAVBAR */}
      <NavBar />

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton />

      <div className="profile">
        <div className="profile-container">
          <SideBar />
          <MainContent />
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex-grow-0">
        <Footer />
      </div>
    </div>
  );
};

export default index;
