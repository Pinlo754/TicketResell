import { useState } from "react";
import axios from "axios";

const useVerifyEmailScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const [isSendingOTP, setIsSendingOTP] = useState<boolean>(true);

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
      const response = await axios.post("/api/account/send-otp", { email });

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
    OTP,
    setOTP,
  };
};

export default useVerifyEmailScreen;
