import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useVerifyEmailResetPassword = () => {  
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get("email");
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [location]);

const requestPasswordReset = async () => {
  try {
    const response = await axios.post("/api/account/request-password-reset", {
      email,
    });

    if (response.status === 200) {
      const message = response.data.message; // lấy thông báo từ phản hồi
      toast.success(message); // Hiển thị thông báo nếu thành công
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        toast.error("Người dùng không được tìm thấy.");
      } else {
        toast.error("Đã có lỗi xảy ra trong quá trình xử lý yêu cầu.");
      }
    } else {
      toast.error("Không thể kết nối đến máy chủ.");
    }
  }
};



  return {
    email,
    setEmail,
    errorMessage,
    successMessage,
    requestPasswordReset
  };
};

export default useVerifyEmailResetPassword;
