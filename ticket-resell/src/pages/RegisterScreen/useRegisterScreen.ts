import { useState } from "react";
import axios from "axios";

const useRegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegisterClick = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu không khớp.");
      return;
    }

    try {
      const response = await axios.post("/api/account/register", {
        email,
        password,
      });

      // Xử lý phản hồi nếu đăng ký thành công
      console.log(response.data.message);
      // Có thể điều hướng đến trang đăng nhập hoặc trang khác sau khi đăng ký thành công
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
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    toggleShowPassword,
    handleRegisterClick,
    errorMessage,
    setErrorMessage,
  };
};

export default useRegisterScreen;
