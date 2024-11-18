import React, { useState } from "react";
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
import useWallet from "./useWallet";

const Wallet = () => {
  const {
    wallet,
    transactions,
    isModalOpen,
    handleSubmit,
    transactionType,
    amount,
    setAmount,
    setIsModalOpen,
    openModal,
    user,
    setAccountNumber,
    setAccountName,
    setBankName,
    accountNumber,
    accountName,
    bankName
  } = useWallet();

  

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
          <div className="basic-1/3">
            <SideBar />
          </div>
          <div className="flex flex-col items-center p-8 bg-gray-100 max-h-full w-full">
            {/* Nội dung ví */}
            <div className="w-full flex justify-between">
              <div className="w-[48%] max-w-3xl bg-white rounded-lg shadow-md p-4 mb-4 flex">
                <img
                  src={user?.userImage ? user.userImage : avatar_icon}
                  alt="wallet icon"
                  className="w-[84px] h-[84px]"
                />
                <div className="text-center flex-grow">
                  <h2 className="text-lg font-semibold mb-2 mt-2">
                    {user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "User info not available"}
                  </h2>
                  <p className="">
                    ID ví:{" "}
                    {wallet?.walletId ? wallet.walletId : "Không tìm được ví"}
                  </p>
                </div>
              </div>
              <div className="w-[48%] max-w-3xl bg-blue-100 rounded-lg shadow-md p-4 mb-4 flex">
                <img
                  src={walletIcon}
                  alt="wallet icon"
                  className="w-[84px] h-[84px]"
                />
                <div className="text-center flex-grow">
                  <h2 className="text-lg font-semibold mb-2">Số dư</h2>
                  <p className="text-xl font-bold">
                    {wallet?.balance
                      ? wallet.balance + " VND"
                      : "0 VND"}
                  </p>
                </div>
              </div>
            </div>

            {/* Danh sách biến động số dư */}
            <div className="w-full bg-white rounded-lg shadow-md p-4 mb-8">
              <h2 className="text-[30px] font-semibold mb-2">
                Biến động số dư
              </h2>
              <ul
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: "270px" }}
              >
                {transactions.map((transaction) => (
                  <div key={transaction.transactionId}>
                    <li className="flex justify-between">
                      <div>
                        <span className="font-bold text-xl">
                          {transaction.transactionType}{" "}
                        </span>

                        <span
                          className={
                            transaction.status === "Pending"
                              ? "text-yellow-500 ml-2"
                              : transaction.status === "Completed"
                              ? "text-green-500 ml-2"
                              : "text-red-500 ml-2"
                          }
                        >
                          ({transaction.status})
                        </span>

                        <p>{new Date(transaction.time).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={
                            (transaction.transactionType === "Deposit" || transaction.transactionType === "Sell ticket")
                              ? "text-green-500 text-2xl font-bold"
                              : "text-red-500 text-2xl font-bold"
                          }
                        >
                          {(transaction.transactionType === "Deposit" || transaction.transactionType === "Sell ticket")
                            ? "+"
                            : "-"}
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
              <button
                onClick={() => openModal("deposit")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow w-[350px]"
              >
                Nạp tiền
              </button>
              <button
                onClick={() => openModal("withdraw")}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow w-[350px]"
              >
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {transactionType === "deposit" ? "Nạp tiền" : "Rút tiền"}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Số tiền
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Nhập số tiền"
              />
            </div>

            {/* Hiển thị các trường thông tin tài khoản khi rút tiền */}
            {transactionType === "withdraw" && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="accountNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Số tài khoản
                  </label>
                  <input
                    id="accountNumber"
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Nhập số tài khoản"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="accountName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên tài khoản
                  </label>
                  <input
                    id="accountName"
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Nhập tên tài khoản"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="bankName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ngân hàng
                  </label>
                  <input
                    id="bankName"
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Nhập tên ngân hàng"
                  />
                </div>
              </>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
