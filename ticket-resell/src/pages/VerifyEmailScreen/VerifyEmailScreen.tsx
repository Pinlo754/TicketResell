import React from "react";
import useVerifyEmailScreen from "./useVerifyEmailScreen";

const VerifyEmailScreen = () => {
  const {
    email,
    setEmail,
    handleSendOtp,
    errorMessage,
    successMessage,
    code,
    setCode,
  } = useVerifyEmailScreen();

  return (
    <main className="flex h-screen bg-gradient-to-t from-[#B9EDDD] to-[#577D86] items-center justify-center">
      <div className="flex flex-col max-w-full">
        <div className="flex flex-col px-28 py-6 w-[1536px] h-[1644px] rounded-xl bg-zinc-100 shadow-2xl">
          <div className="self-center w-[54%] h-[15%] mt-[46px] max-w-full text-[90px] text-center text-black bg-zinc-300 w-[351px]">
            LOGO
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendOtp();
            }}
          >
            <h2 className="self-start mt-16 text-[76px] font-bold text-black">
              Xác thực Email
            </h2>

            <div className="flex shrink-0 mt-8 h-48 rounded-2xl border border-black border-solid bg-zinc-300">
              <input
                type="email"
                value={email}
                placeholder="Nhập email"
                className="w-full h-full px-8 rounded-xl text-[76px]"
                aria-label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className="flex shrink-0 mt-8 h-48 rounded-2xl border border-black border-solid bg-zinc-300">
              <input
                type="otp-email"
                value={code}
                placeholder="Nhập OTP"
                className="w-full h-full px-8 rounded-xl text-[76px]"
                aria-label="OTP"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                required
              />
              <div
                className={`w-[450px] text-[60px] text-[red] bg-[white] rounded-2xl font-bold cursor-pointer flex items-center justify-center`}
                onClick={() => console.log("enter resend otp")}
              >
                Gửi OTP
              </div>
            </div>

            {errorMessage && (
              <div className="mt-[16px]">
                <span className="text-[#FD0F0F] text-[48px]">
                  {errorMessage}
                </span>
              </div>
            )}

            {successMessage && (
              <div className="mt-[16px]">
                <span className="text-[#00FF00] text-[48px]">
                  {successMessage}
                </span>
              </div>
            )}

            <button
              type="submit"
              className={`px-16 py-8 mt-12 text-[76px] font-bold text-center rounded-2xl w-full ${
                email
                  ? "bg-red-500 text-white"
                  : "bg-red-300 text-gray-800 cursor-not-allowed"
              }`}
              disabled={!email}
            >
              Gửi mã OTP
            </button>
          </form>

          <p className="self-center mt-12 text-[48px] text-center text-black">
            <a href="/" className="text-sky-500 underline">
              Đăng nhập
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

export default VerifyEmailScreen;
