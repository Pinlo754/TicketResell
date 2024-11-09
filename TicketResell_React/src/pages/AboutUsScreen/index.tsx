import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import ScrollToTop from "../../components/ScrollToTop";

const AboutUsScreen = () => {

    return (
      <div className="w-screen min-h-screen flex flex-col">
        {/* SCROLL TO TOP */}
        <ScrollToTop />

        {/* NAVBAR */}
        <NavBar />

        {/* SCROLL TO TOP BUTTON */}
        <ScrollToTopButton />

        {/* MAIN CONTENT */}
        <div className="w-full min-h-screen flex-grow pb-10 text-center">
          <div
            className="relative bg-cover bg-center w-full"
            style={{
              backgroundImage:
                "url(https://streetline-film.com/wp-content/uploads/2018/10/events-background-1.jpg)",
              backgroundAttachment: "fixed",
            }}
          >
            {/* Overlay màu tối */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative pt-40 pb-20 z-10 flex flex-col items-center justify-center text-center h-full">
              {/* Title */}
              <h1 className="text-5xl font-bold mb-2 text-white">Festix</h1>
              <p className="text-lg text-gray-200 max-w-4xl mx-auto mb-8">
                Nơi kết nối những khoảnh khắc đáng nhớ thông qua mỗi tấm vé sự
                kiện
              </p>
            </div>
          </div>

          {/* Vision */}
          <section className="mb-8 mt-10">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Tầm Nhìn
            </h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              Tầm nhìn của chúng tôi là trở thành nền tảng mua bán vé đáng tin
              cậy nhất tại Việt Nam, nơi mọi người có thể dễ dàng tiếp cận và
              tham gia vào các sự kiện yêu thích. Chúng tôi luôn nỗ lực phát
              triển để đem lại nhiều tiện ích và sự hài lòng tối đa cho khách
              hàng.
            </p>
          </section>

          {/* Mission */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Sứ Mệnh
            </h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              Chúng tôi hướng đến việc cung cấp những trải nghiệm tuyệt vời qua
              các sự kiện. Với Ticket Resell, mỗi tấm vé không chỉ là một chiếc
              thẻ vào cửa, mà còn là một cơ hội để tận hưởng những khoảnh khắc
              đáng nhớ với bạn bè và gia đình.
            </p>
          </section>

          {/* Values */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <ul className="text-gray-600 text-lg max-w-4xl mx-auto list-disc list-inside">
              <li className="mb-4">
                Đáng tin cậy: Chúng tôi đảm bảo các giao dịch an toàn và minh
                bạch.
              </li>
              <li className="mb-4">
                Khách hàng là trọng tâm: Mọi hoạt động của chúng tôi đều hướng
                đến sự hài lòng của khách hàng.
              </li>
              <li className="mb-4">
                Sáng tạo và không ngừng cải tiến: Chúng tôi luôn tìm kiếm cách
                mới để cải thiện trải nghiệm của khách hàng.
              </li>
              <li className="mb-4">
                Trách nhiệm xã hội: Festix cam kết tham gia vào các hoạt
                động cộng đồng và bảo vệ quyền lợi của khách hàng.
              </li>
            </ul>
          </section>

          {/* Commitment */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Cam Kết
            </h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              Đảm bảo chất lượng và độ tin cậy của từng giao dịch là ưu tiên
              hàng đầu của chúng tôi. Festix cam kết cung cấp vé thật,
              minh bạch về giá cả, và luôn bảo vệ quyền lợi của người mua. Chúng
              tôi xây dựng nền tảng tin cậy để khách hàng có thể yên tâm sử
              dụng.
            </p>
          </section>

          {/* Our Team */}
          <section className="">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              Đội ngũ Festix bao gồm những chuyên gia am hiểu trong lĩnh
              vực sự kiện và công nghệ. Chúng tôi luôn sẵn sàng hỗ trợ bạn từ
              khâu tìm kiếm vé đến khi tham gia sự kiện. Với sự tận tâm và kinh
              nghiệm, chúng tôi đảm bảo sẽ mang đến cho bạn dịch vụ tốt nhất.
            </p>
          </section>
        </div>

        {/* FOOTER */}
        <div className="flex-grow-0">
          <Footer />
        </div>
      </div>
    );
};

export default AboutUsScreen;