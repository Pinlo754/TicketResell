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
        <div className="flex flex-col px-7 py-2 w-[389px] h-[411px] rounded-xl bg-zinc-100 shadow-2xl">
          <div className="self-center w-[54%] h-[15%] mt-[12px] max-w-full w-[88px]">
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
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendOtp();
            }}
          >
            <h2 className="self-start mt-4 text-[19px] font-bold text-black">
              Xác thực Email
            </h2>

            <div className="flex shrink-0 mt-2 h-12 rounded-xl border border-black border-solid bg-zinc-300">
              <input
                type="email"
                value={email}
                placeholder="Nhập email"
                className="w-full h-full px-2 rounded-xl text-[19px]"
                aria-label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>

            <div className="flex shrink-0 mt-2 h-12 rounded-xl border border-black border-solid bg-[white]">
              <input
                type="otp-email"
                value={code}
                placeholder="Nhập OTP"
                className="w-full h-full px-2 rounded-xl text-[19px]"
                aria-label="OTP"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                required
              />
              <div
                className={`w-[120px] text-[12px] text-[red] bg-[white] rounded-xl font-bold cursor-pointer flex items-center justify-center`}
                onClick={() => console.log("enter resend otp")}
              >
                Gửi OTP
              </div>
            </div>

            {errorMessage && (
              <div className="mt-[4px]">
                <span className="text-[#FD0F0F] text-[12px]">
                  {errorMessage}
                </span>
              </div>
            )}

            {successMessage && (
              <div className="mt-[4px]">
                <span className="text-[#00FF00] text-[12px]">
                  {successMessage}
                </span>
              </div>
            )}

            <button
              type="submit"
              className={`px-4 py-2 mt-3 text-[19px] font-bold text-center rounded-2xl w-full ${
                email
                  ? "bg-red-500 text-white"
                  : "bg-red-300 text-gray-800 cursor-not-allowed"
              }`}
              disabled={!email}
            >
              Gửi mã OTP
            </button>
          </form>

          <p className="self-center mt-3 text-[12px] text-center text-black">
            <a href="/" className="text-sky-500 underline">
              Đăng nhập
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

export default VerifyEmailScreen;
