import React from "react";
import useRegisterScreen from "./useRegisterScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterScreen = () => {
  const {
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
  } = useRegisterScreen();

  return (
    <main className="flex h-screen bg-gradient-to-t from-[#B9EDDD] to-[#577D86] items-center justify-center">
      <div className="flex flex-col max-w-full">
        <div className="flex flex-col px-7 py-2 w-[389px] h-[411px] rounded-xl bg-zinc-100 shadow-2xl">
          <div className="self-center w-[54%] h-[15%] mt-[12px] max-w-full text-[22px] text-center text-black bg-zinc-300 w-[88px]">
            LOGO
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleRegisterClick(); }}>
            <h2 className="self-start mt-4 text-[19px] font-bold text-black">
              Đăng ký
            </h2>
            <div className="flex shrink-0 mt-2 h-12 rounded-xl border border-black border-solid bg-zinc-300">
              <input
                type="email"
                value={email}
                placeholder="Nhập email"
                className="w-full h-full px-2 rounded-xl text-[19px]"
                aria-label="Email"
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  setErrorMessage("");
                }}
                required
              />
            </div>

            <div className="relative flex shrink-0 mt-2 mb-2 h-12 rounded-2xl border border-black border-solid bg-zinc-300">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="w-full h-full px-8 rounded-xl text-[76px] pr-16"
                aria-label="Password"
                placeholder="Nhập mật khẩu"
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  if (value.length < 8) {
                    setErrorMessage("Mật khẩu phải có ít nhất 8 ký tự.");
                  } else {
                    setErrorMessage("");
                  }
                }}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={toggleShowPassword}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 w-[70px] h-[70px] cursor-pointer text-gray-600 text-4xl"
              />
            </div>

            <div className="relative flex shrink-0 mb-8 h-48 rounded-2xl border border-black border-solid bg-zinc-300">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                className="w-full h-full px-8 rounded-xl text-[76px] pr-16"
                placeholder="Nhập mật khẩu"
                aria-label="Confirm Password"
                onChange={(e) => {
                  const value = e.target.value;
                  setConfirmPassword(value);
                  if (value !== password) {
                    setErrorMessage("Mật khẩu không khớp.");
                  } else {
                    setErrorMessage("");
                  }
                }}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={toggleShowPassword}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 w-[70px] h-[70px] cursor-pointer text-gray-600 text-4xl"
              />
            </div>

            {errorMessage && (
              <div className="mt-[16px]">
                <span className="text-[#FD0F0F] text-[48px]">
                  {errorMessage}
                </span>
              </div>
            )}

            <button
              type="submit"
              className={`px-16 py-8 mt-12 text-[76px] font-bold text-center rounded-2xl w-full ${
                email && password && confirmPassword && password === confirmPassword
                  ? "bg-red-500 text-white"
                  : "bg-red-300 text-gray-800 cursor-not-allowed"
              }`}
              disabled={!email || !password || !confirmPassword || password !== confirmPassword}
            >
              Đăng ký
            </button>
          </form>

          <p className="self-center mt-12 text-[48px] text-center text-black">
            Đã có tài khoản?{" "}
            <a href="/" className="text-sky-500 underline">
              Đăng nhập ngay
            </a>
          </p>
        </div>

        <div className="flex self-center text-[60px] mt-[120px] text-[#005555] gap-6">
          <a href="#">Quy chế hoạt động sàn</a>
          <p>•</p>
          <a href="#">Đăng ký ngay</a>
          <p>•</p>
          <a href="#">Liên hệ hỗ trợ</a>
        </div>
      </div>
    </main>
  );
};

export default RegisterScreen;
