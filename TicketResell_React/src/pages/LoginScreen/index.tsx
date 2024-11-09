import React from "react";
import useLoginScreen from "./useLoginScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginScreen = () => {
  const {
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
  } = useLoginScreen();

  interface SocialButtonProps {
    icon: string;
    name: string;
  }

  const SocialButton: React.FC<SocialButtonProps> = ({ icon, name }) => (
    <button className="flex gap-2.5 px-2 w-[27%] h-[28px] text-[12px] text-center rounded-xl border border-black border-solid bg-zinc-100">
      <img
        loading="lazy"
        src={icon}
        alt={`${name} icon`}
        className="object-contain shrink-0 aspect-square w-[15px] self-center"
      />
      <span className="my-auto">{name}</span>
    </button>
  );

  return (
    <main className="flex h-screen bg-gradient-to-t from-[#B9EDDD] to-[#577D86] items-center justify-center">
      <ToastContainer/>
      
      <div className="flex flex-col max-w-full">
        <div className="flex flex-col px-7 py-2 w-[389px] h-[440px] rounded-xl bg-zinc-100 shadow-2xl">
          <div className="self-center w-[54%] h-[15%] mt-[12px] max-w-full w-[351px]">
            <div className="flex items-center justify-center">
              <img
                src="/static/media/Logo_festix.6dafeac744167eb4b442.png"
                alt="Festix"
                className="w-8 h-12 mr-3 cursor-pointer"
              />
              <h1 className="text-black text-3xl font-bold ">Festix</h1>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLoginClick();
            }}
          >
            <h2 className="self-start mt-4 text-[19px] font-bold text-black">
              Đăng nhập
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

            <div className="relative flex shrink-0 mt-2 mb-2 h-12 rounded-xl border border-black border-solid bg-zinc-300">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Nhập mật khẩu"
                className="w-full h-full px-2 rounded-xl text-[19px] pr-4"
                aria-label="Password"
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  const hasLetter = /[a-zA-Z]/.test(value);
                  const hasNumber = /\d/.test(value);
                  if (!hasLetter || !hasNumber) {
                    setErrorMessage(
                      "Mật khẩu phải có ít nhất 1 chữ cái và 1 số."
                    );
                  } else {
                    setErrorMessage("");
                  }
                }}
                ref={passwordInputRef}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[17px] h-[17px] cursor-pointer text-gray-600 text-xl"
              />
            </div>
            {errorMessage && (
              <div className="mt-[4px]">
                <span className="text-[#FD0F0F] text-[12px]">
                  {errorMessage}
                </span>
              </div>
            )}

            <a href="/verify-email" className="text-[12px] text-sky-500">
              Quên mật khẩu?
            </a>
            <button
              type="submit"
              className={`px-4 py-2 mt-3 text-[19px] font-bold text-center rounded-2xl w-full ${
                email && password && !disableSubmitButton
                  ? "bg-red-500 text-white"
                  : "bg-red-300 text-gray-800 cursor-not-allowed"
              }`}
              disabled={!email || !password || disableSubmitButton}
            >
              Đăng nhập
            </button>
          </form>

          <div className="flex justify-between mt-2">
            <div className="shrink-0 self-center h-px border border-black border-solid w-[88px]" />
            <div className="text-[12px] ">Hoặc đăng nhập bằng</div>
            <div className="shrink-0 self-center h-px border border-black border-solid w-[88px]" />
          </div>

          <div className="flex mt-1 w-full text-black justify-between">
            <SocialButton
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/3de361cdf1e242cb11fad9d37408c8340ee1f2d414f80374c82e51344ac4de0f?placeholderIfAbsent=true&apiKey=138dce03024d4595be44e44765ba29ec"
              name="Facebook"
            />
            <SocialButton
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/26dad500aab2349c6fd9ed6c0805208bc5139735a58bba3e918183c15ce3be51?placeholderIfAbsent=true&apiKey=138dce03024d4595be44e44765ba29ec"
              name="Google"
            />
            <SocialButton
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e03f7e9f76409e77be0dbb45ea0e6515643106788fb1e562057e5322cb017c73?placeholderIfAbsent=true&apiKey=138dce03024d4595be44e44765ba29ec"
              name="Guess"
            />
          </div>

          <p className="self-center mt-3 text-[12px] text-center text-black">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-sky-500 underline">
              Đăng ký ngay
            </a>
          </p>
        </div>

        <div className="flex self-center text-[15px] mt-[30px] text-[#005555] gap-2">
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

export default LoginScreen;
