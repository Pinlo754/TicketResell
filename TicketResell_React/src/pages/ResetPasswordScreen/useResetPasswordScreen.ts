import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const useResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [Token, setToken] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const { token } = useParams<{ token: string }>();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [location]);
  const handleResetPasswordClick = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp.");
      return;
    }

    try {
      const response = await axios.post("/api/account/reset-password", {
        email,
        newPassword,
        token
      });
      // Xử lý phản hồi thành công
      setSuccessMessage("Đặt lại mật khẩu thành công. Vui lòng đăng nhập.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {      
        setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");      
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
