import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const useVerifyEmailScreen = () => {
  const [email, setEmail] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isSendingOTP, setIsSendingOTP] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [location]);
  
  type chatData = {
    id: string;
    lastMessage: string;
    messageId: string;
    messageSeen: boolean;
    reUserId: string;
    updatedAt: Date;
  };

  const chat = {
    id: "",
    lastMessage: "",
    messageId: "",
    messageSeen: false,
    reUserId: "",
    updatedAt: new Date(),
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post("/api/account/resend-email-code", {
        email,
      });
      if (response.data) {
      console.log(response.data.message);
     toast.success("OTP sent successfully");
    }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Đã có lỗi xảy ra.");
      }
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      setErrorMessage("Vui lòng nhập email.");
      return;
    }

    try {
      const response = await axios.post("/api/account/confirmation-email", {
        email,
        code,
      });
      console.log(response.data.message);
      if (response.data.userId) {
        const seUserId = response.data.userId;
        const response1 = await axios.post("/api/Chat/post-chat", {
          seUserId,
          chat,
        });
        const response2 = await axios.post("/api/Wallet/create-wallet?userId=" + response.data.userId);
        console.log(response2.data);
        console.log(response1.data.message);
        alert("Confirm email successfully, please login again.");
        navigate("/");
      } else {
        setErrorMessage("User object not found in the response.");
        toast.error("User object not found in the response.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Đã có lỗi xảy ra.");
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
    handleResendOTP,
    toast
  };
};

export default useVerifyEmailScreen;
