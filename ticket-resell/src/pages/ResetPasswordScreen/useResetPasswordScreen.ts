import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleResetPasswordClick = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp.");
      return;
    }

    try {
      const response = await axios.post("/api/account/reset-password", {
        email,
        newPassword,
      });

      // Xử lý phản hồi thành công
      setSuccessMessage("Đặt lại mật khẩu thành công. Vui lòng đăng nhập.");
      setTimeout(() => {
        navigate("/login"); // Chuyển hướng về trang đăng nhập
      }, 2000);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        // Xử lý lỗi từ phản hồi của server
        setErrorMessage(error.response.data.errors[0] || "Đã có lỗi xảy ra.");
      } else {
        setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    }
  };

  return {
    email,
    setEmail,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    toggleShowPassword,
    handleResetPasswordClick,
    errorMessage,
    setErrorMessage,
    successMessage,
  };
};

export default useResetPassword;
