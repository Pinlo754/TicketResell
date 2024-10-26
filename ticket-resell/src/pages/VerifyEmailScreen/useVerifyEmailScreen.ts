import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useVerifyEmailScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isSendingOTP, setIsSendingOTP] = useState<boolean>(true);
  const navigate = useNavigate(); 


  type chatData = {
    id: string;
    lastMessage: string;
    messageId: string;
    messageSeen: boolean;
    reUserId: string;
    updatedAt: Date;
  };

  const chat = {
    id : "",
    lastMessage: "",
    messageId: "",
    messageSeen: false,
    reUserId: "",
    updatedAt: new Date(),
  }

  const handleResendOTP = async () => {
    if (isSendingOTP) return;
    setIsSendingOTP(true);
  }

  const handleSendOtp = async () => {
    if (!email) {
      setErrorMessage("Vui lòng nhập email.");
      return;
    }

    try {
      const response = await axios.post("/api/account/confirmation-email", { email, code });
      console.log(response.data.message);
      if (response.data.userId) {
        const seUserId = response.data.userId;
        const response1 = await axios.post("/api/Chat/post-chat", { seUserId,  chat });
        console.log(response1.data.message);
        navigate('/');
      } else {
        setErrorMessage("User object not found in the response.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.errors[0] || "Đã có lỗi xảy ra.");
      } else {
        setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  return {
    email,
    setEmail,
    handleSendOtp,
    errorMessage,
    successMessage,
    code,
    setCode,
  };
};

export default useVerifyEmailScreen;
