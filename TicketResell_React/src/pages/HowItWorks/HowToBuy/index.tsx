import CoverSection from "../../../components/CoverSection";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ScrollToTop from "../../../components/ScrollToTop";
import htb from "../../../assets/htb.png";

const HowToBuy = () => {

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
              image= {htb}
            />
        </div>
        {/* FOOTER */}
        <div className="flex-grow-0">
          <Footer />
        </div>
      </div>
    );
};

export default HowToBuy;