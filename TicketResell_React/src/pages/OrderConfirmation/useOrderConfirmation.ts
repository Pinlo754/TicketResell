import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useOrderConfirmation = () => {
  const userId = localStorage.getItem("userId") || "";
  const [user, setUser] = useState<any>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [payDate, setPayDate] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  useEffect(() => {
    fetchUser();
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("vnp_TxnRef");
    setOrderId(orderId);
    const amount = urlParams.get("vnp_Amount");
    if (amount) {
      setAmount(
        (parseInt(amount) / 100).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      );
    }
    const amountInt = urlParams.get("Amount");
    if (amountInt) {
      setAmount(
        parseInt(amountInt).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })
      );
    }
    const payDateStr = urlParams.get("vnp_PayDate");
    if (payDateStr) {
      const year = payDateStr.slice(0, 4);
      const month = payDateStr.slice(4, 6);
      const day = payDateStr.slice(6, 8);
      const hour = payDateStr.slice(8, 10);
      const minute = payDateStr.slice(10, 12);
      const second = payDateStr.slice(12, 14);

      const formattedPayDate = `${day}-${month}-${year} ${hour}:${minute}:${second}`;
      setPayDate(formattedPayDate);
    }
    const dateParam = urlParams.get("PayDate");
    console.log(dateParam);
    if (dateParam) {
      const utcDate = new Date(dateParam);
      const localDate = new Date(utcDate.getTime());
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, "0");
      const day = String(localDate.getDate()).padStart(2, "0");
      const hours = String(localDate.getHours()).padStart(2, "0");
      const minutes = String(localDate.getMinutes()).padStart(2, "0");
      const seconds = String(localDate.getSeconds()).padStart(2, "0");

      // Ghép thành chuỗi định dạng dd/mm/yyyy hh:mm:ss
      const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      setPayDate(formattedDateTime);
    } else {
      console.error("Giá trị của PayDate không hợp lệ hoặc không tồn tại.");
    }

    const responseCode = urlParams.get("vnp_ResponseCode");
    setIsSuccess(responseCode === "00");
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "/api/Account/user-information/" + userId
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching wallet:", error);
      toast.error("Không tìm người dùng này.");
    }
  };

  return {
    user,
    orderId,
    amount,
    payDate,
    isSuccess,
  };
};

export default useOrderConfirmation;
