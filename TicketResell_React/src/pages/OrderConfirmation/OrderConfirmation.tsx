import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import success from "../../assets/success.png";
import cancel from "../../assets/cancel.png";
import useOrderConfirmation from "./useOrderConfirmation";

const OrderConfirmation = () => {
  const { user, orderId, amount, payDate, isSuccess } = useOrderConfirmation();
  return (
    <div className="cart">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="cart-wrapper flex flex-col items-center">
        {isSuccess ? (
          <>
            <img src={success} alt="success image" className="w-32 h-32 mb-6" />
            <p className="text-3xl font-bold text-green-600 mb-4">
              Thanh toán thành công
            </p>
            <p className="text-lg text-gray-700">
              Người mua:{" "}
              {user && user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : "User info not available"}
            </p>
            <p className="text-lg text-gray-700">
              ID đơn hàng: <span className="font-semibold">{orderId}</span>
            </p>
            <p className="text-lg text-gray-700">
              Số tiền thanh toán:{" "}
              <span className="font-semibold">{amount}</span>
            </p>
            <p className="text-lg text-gray-700">
              Ngày thanh toán: <span className="font-semibold">{payDate}</span>
            </p>
            <p className="text-center text-gray-600 mt-6">
              Chúng tôi đã gửi email chứa thông tin đơn hàng đến bạn.              
            </p>
            <p className="text-center text-gray-600">
            Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ.
            </p>
          </>
        ) : (
          <>
            <img src={cancel} alt="success image" className="w-32 h-32 mb-6 mt-20" />
            <p className="text-3xl font-bold text-green-600">
              Thanh toán thất bại
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
