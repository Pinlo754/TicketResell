import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
const useLoginScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [showPassword]);

  const resetPassword = () => {
    navigate("verify-email-reset-password?email=" + email);
  };

  const handleLoginClick = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    
    await handleLogin();
    
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const handleLogin = async () => {
    setDisableSubmitButton(true);

    try {
      const response = await axios.post("/api/account/login", {
        email: email,
        password: password,
      });
      const data = response.data;

      if (!data?.token) {
        throw new Error("Failed to login");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", response.data.role[0]);
      console.log("role:" + response.data.role[0]);
      
      if(response.data.role[0] === "User") navigate("/main");
      else if (response.data.role[0] === "Admin") navigate("/Admin");
      else navigate("/staff/main");
    } catch (error) {
      setErrorMessage("Something went wrong");
    } finally {
      setDisableSubmitButton(false); 
    }
  };

  return {
    navigate,
    email,
    setEmail,
    password,
    setPassword,
    disableSubmitButton,
    toggleShowPassword,
    showPassword,
    handleLoginClick,
    resetPassword,
    passwordInputRef,
    errorMessage,
    setErrorMessage,
    toast
  };
};

export default useLoginScreen;
