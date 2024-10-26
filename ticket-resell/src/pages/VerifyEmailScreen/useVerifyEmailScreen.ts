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
      navigate('/')
      setSuccessMessage("Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.");
      setErrorMessage("");
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
