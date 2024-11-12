import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import useResetPassword from "./useResetPasswordScreen";

const ResetPasswordScreen = () => {
  const {
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
    successMessage,
  } = useResetPassword();

  return (
    <main className="flex h-screen bg-gradient-to-t from-[#B9EDDD] to-[#577D86] items-center justify-center">
      <div className="flex flex-col max-w-full">
        <div className="flex flex-col px-7 py-2 w-[389px] h-[411px] rounded-xl bg-zinc-100 shadow-xl">
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
              handleResetPasswordClick();
            }}
          >
            <h2 className="self-start mt-4 text-[19px] font-bold text-black">
              Đặt lại mật khẩu
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
                readOnly
              />
            </div>

            <div className="relative flex shrink-0 mt-2 h-12 rounded-xl border border-black border-solid bg-zinc-300">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                className="w-full h-full px-2 rounded-xl text-[19px] pr-4"
                placeholder="Nhập mật khẩu mới"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] cursor-pointer text-gray-600 text-xl"
              />
            </div>

            <div className="relative flex shrink-0 mt-2 mb-2 h-12 rounded-xl border border-black border-solid bg-zinc-300">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                className="w-full h-full px-2 rounded-xl text-[12px] pr-4"
                placeholder="Xác nhận mật khẩu"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
              />
            </div>

            {errorMessage && (
              <div className="mt-[4px]">
                <span className="text-[#FD0F0F] text-[12px]">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mt-[4px]">
                <span className="text-[#00FF00] text-[12px]">{successMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className={`px-3 py-2 mt-3 text-[19px] font-bold text-center rounded-xl w-full ${
                email && newPassword && confirmPassword && newPassword === confirmPassword
                  ? "bg-red-500 text-white"
                  : "bg-red-300 text-gray-800 cursor-not-allowed"
              }`}
              disabled={!email || !newPassword || newPassword !== confirmPassword}
            >
              Đặt lại mật khẩu
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

export default ResetPasswordScreen;
