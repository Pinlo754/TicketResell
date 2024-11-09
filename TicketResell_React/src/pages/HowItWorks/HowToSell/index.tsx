import CoverSection from "../../../components/CoverSection";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ScrollToTop from "../../../components/ScrollToTop";
import hts from "../../../assets/hts.png";
import useHowToSell from "./useHowToSell";

const HowToSell = () => {

    const {
        steps,
        navigate,
    } = useHowToSell();

    return (
      <div className="w-screen min-h-screen flex flex-col">
        {/* SCROLL TO TOP */}
        <ScrollToTop />

        {/* NAVBAR */}
        <NavBar />

        {/* SCROLL TO TOP BUTTON */}
        <ScrollToTopButton />

        {/* MAIN CONTENT */}
        <div className="w-full min-h-screen flex-grow">
          {/* COVER SECTION */}
          <CoverSection
            title="Hãy bắt đầu bán vé!"
            description="Cách phổ biến nhất để bán vé không cần dùng đến với những người hâm mộ chân chính. Miễn phí cho người bán và người mua chỉ trả giá gốc của vé."
            image={hts}
          />

          {/* CONTENT */}
          <div className="w-[70%] mx-auto">
            {/* Tiêu đề */}
            <div className="flex gap-8 my-20">
              <div>
                <p className="text-4xl font-bold">
                  Bán vé không thể đơn giản hơn
                </p>
              </div>
              <div className="max-w-xl">
                <p className="text-xl">
                  Với quy trình 5 bước đơn giản, bạn có thể bán vé thành công
                  đến hàng triệu người dùng đang tìm kiếm. Hơn 75% vé đã bán chỉ
                  trong vòng 48 giờ, mang lại sự tiện lợi và nhanh chóng cho cả
                  người bán và người mua.
                </p>
              </div>
            </div>

            {/* Các bước */}
            <div className="grid grid-cols-3 gap-10 content-start">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex gap-3 items-center">
                    <div
                      className={`flex items-center justify-center rounded-full w-6 h-6 ${step.color} text-center text-white font-medium`}
                    >
                      <p>{index + 1}</p>
                    </div>
                    <p className="text-3xl font-medium">{step.title}</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-xl">{step.description}</p>
                  </div>
                </div>
              ))}

              {/* Button */}
              <div className="flex items-center justify-center">
                <button
                  className="px-4 py-3 rounded-3xl flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 group"
                  onClick={() => navigate("/sell")}
                >
                  <span className="font-medium text-xl text-white">
                    Hãy bán vé ngay
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-2 text-white transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <div className="flex-grow-0">
          <Footer />
        </div>
      </div>
    );
};

export default HowToSell;