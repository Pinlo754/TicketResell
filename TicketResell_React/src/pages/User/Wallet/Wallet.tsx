import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import assets from "../../../assets/assetsChat";
import "./Wallet.css";
import { toast, ToastContainer } from "react-toastify";
import upload from "../../../lib/upload";
import axios from "axios";
import walletIcon from "../../../assets/wallet.png";
import avatar_icon from "../../../assets/avatar_icon.png";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ScrollToTop from "../../../components/ScrollToTop";
import SideBar from "../../../components/AccountProfile/SideBar/SideBar";
const Wallet = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");

  const token = localStorage.getItem("token");
  const uId = localStorage.getItem("userId");

  const transactions = [
    {
      transactionId: "1",
      amount: 0.5,
      transactionType: "Withdraw",
      time: "2023-10-01 10:00:00",
      balanceAfter: 1.5,
    },
    {
      transactionId: "2",
      amount: 1.2,
      transactionType: "Deposit",
      time: "2023-10-05 14:30:00",
      balanceAfter: 2.7,
    },
    {
      transactionId: "3",
      amount: 0.3,
      transactionType: "Withdraw",
      time: "2023-10-10 09:15:00",
      balanceAfter: 2.4,
    },
    {
      transactionId: "4",
      amount: 0.3,
      transactionType: "Withdraw",
      time: "2023-10-10 09:15:00",
      balanceAfter: 2.4,
    },
    {
      transactionId: "5",
      amount: 0.3,
      transactionType: "Withdraw",
      time: "2023-10-10 09:15:00",
      balanceAfter: 2.4,
    },
    {
      transactionId: "6",
      amount: 0.3,
      transactionType: "Withdraw",
      time: "2023-10-10 09:15:00",
      balanceAfter: 2.4,
    },
    {
      transactionId: "7",
      amount: 0.3,
      transactionType: "Withdraw",
      time: "2023-10-10 09:15:00",
      balanceAfter: 2.4,
    },
    // Thêm các giao dịch khác nếu cần
  ];

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
    <div className="flex flex-col items-center p-8 bg-gray-100 max-h-full w-full">
      <div className="w-full flex justify-between">
        {/* Thông tin cá nhân */}
        <div className="w-[48%] max-w-3xl bg-white rounded-lg shadow-md p-4 mb-4 flex">
        <img
            src={avatar_icon}
            alt="wallet icon"
            className="w-[84px] h-[84px]"
          />
          <div className="text-center flex-grow">
            <h2 className="text-lg font-semibold mb-2 mt-2">Nguyễn Thanh Phong</h2>
            <p className="">ID ví: hsad79au8</p>
          </div>
        </div>

        {/* Số dư ví */}
        <div className="w-[48%] max-w-3xl bg-blue-100 rounded-lg shadow-md p-4 mb-4 flex">
          <img
            src={walletIcon}
            alt="wallet icon"
            className="w-[84px] h-[84px]"
          />
          <div className="text-center flex-grow">
            <h2 className="text-lg font-semibold mb-2">Số dư</h2>
            <p className="text-xl font-bold">5.000.00 VND</p>
          </div>
        </div>
      </div>

      {/* Danh sách biến động số dư */}
      <div className="w-full bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-[30px] font-semibold mb-2">Biến động số dư</h2>
        <ul
          className="space-y-2 overflow-y-auto"
          style={{ maxHeight: "270px" }}
        >
          {transactions.map((transaction) => (
            <div>
            <li
              key={transaction.transactionId}
              className="flex justify-between"
            >
              <div>
                <span className="font-bold text-xl">
                  {transaction.transactionType}{" "}
                </span>
                <p>{new Date(transaction.time).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span
                  className={
                    transaction.transactionType === "Deposit"
                      ? "text-green-500 text-2xl font-bold"
                      : "text-red-500 text-2xl font-bold"
                  }
                >
                  {transaction.transactionType === "Deposit" ? "+" : "-"}
                  {Math.abs(transaction.amount)} VND
                </span>
                <p className="ml-2 text-gray-500">
                  (Balance: {transaction.balanceAfter} VND)
                </p>
              </div>
            </li>
            <div className="w-[90%] mx-auto h-px bg-gray-300 my-4" />
            </div>
          ))}
        </ul>
      </div>

      {/* Button Rút và Nạp tiền */}
      <div className="w-full max-w-3xl flex justify-between mt-auto px-2">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow w-[350px]">
          Nạp tiền
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow w-[350px]">
          Rút tiền
        </button>
      </div>
    </div>
</div>
      </div>

      {/* FOOTER */}
      <div className="flex-grow-0">
        <Footer />
      </div>
    </div>
  );
};
export default Wallet;
