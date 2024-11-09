import CoverSection from "../../../components/CoverSection";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ScrollToTop from "../../../components/ScrollToTop";
import htb from "../../../assets/htb.png";
import useHowToBuy from "./useHowToBuy";

const HowToBuy = () => {

  const {
    steps,
    navigate,
  } = useHowToBuy();

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
            title="Hãy bắt đầu mua vé!"
            description="Mua vé từ những người hâm mộ khác một cách an toàn và dễ dàng. Cam kết chỉ bán vé hợp pháp với giá cạnh tranh."
            image={htb}
          />

          {/* CONTENT */}
          <div className="w-[70%] mx-auto">
            {/* Tiêu đề */}
            <div className="flex gap-8 my-20">
              <div>
                <p className="text-4xl font-bold">
                  Mua vé nhanh chóng và dễ dàng
                </p>
              </div>
              <div className="max-w-xl">
                <p className="text-xl">
                  Với quy trình đơn giản chỉ trong vài bước, bạn có thể sở hữu
                  vé cho sự kiện yêu thích của mình. Với hàng triệu vé được mua
                  thành công mỗi năm, chúng tôi mang đến một trải nghiệm mua vé
                  an toàn và tiện lợi cho bạn.
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
                  className="px-4 py-3 rounded-3xl flex items-center bg-gradient-to-r from-purple-600 to-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-purple-600 group"
                  onClick={() => navigate("/main")}
                >
                  <span className="font-medium text-xl text-white">
                    Hãy mua vé ngay
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

export default HowToBuy;