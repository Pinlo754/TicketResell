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
                  Đây là quy trình 5 bước để bán hàng thành công. Với hàng triệu
                  người dùng tích cực, vé được mua hết nhanh chóng. Hơn 75% tổng
                  số vé đã bán chỉ mất chưa đến 48 giờ để mua được.
                </p>
              </div>
            </div>

            {/* Các bước */}
            <div className="grid grid-cols-3 gap-10 content-start">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="flex gap-3 items-center">
                            <div className={`flex items-center justify-center rounded-full w-6 h-6 ${step.color} text-center text-white font-medium`}>
                                <p>{index+1}</p>
                            </div>
                            <p className="text-3xl font-medium">{step.title}</p>
                        </div>
                        <div className="mt-3">
                            <p className="text-xl">{step.description}</p>
                        </div>
                    </div>
                ))}
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