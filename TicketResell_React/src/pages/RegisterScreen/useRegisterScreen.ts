import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useRegisterScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

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
        confirmPassword
      });

      // Xử lý phản hồi nếu đăng ký thành công
      console.log(response.data.message);
      navigate("/verify-email?email=" + email)     
    } catch (error: any) {
        setErrorMessage("Đã có lỗi xảy ra với server. Vui lòng thử lại." + error.message);      
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
