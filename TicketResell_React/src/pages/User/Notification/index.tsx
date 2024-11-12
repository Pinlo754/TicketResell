import SideBar from "../../../components/AccountProfile/SideBar/SideBar";
import ScrollToTop from "../../../components/ScrollToTop";
import NavBar from "../../../components/NavBar";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Footer from "../../../components/Footer";
import useNotiOrder from "./useNotification";
import TopBar from "../../../components/AccountProfile/TopBar";

const Notification = () => {

  const {
    
  } = useNotiOrder();

    return (
      <div className="w-screen min-h-screen flex flex-col">
        {/* SCROLL TO TOP */}
        <ScrollToTop />

        {/* NAVBAR */}
        <NavBar />

        {/* SCROLL TO TOP BUTTON */}
        <ScrollToTopButton />

        {/* MAIN CONTENT */}
        <div className="bg-gradient-to-b from-[#B9EDDD] to-[#569DAA] h-100vh flex flex-grow p-[20px]">
          <div className="w-[1050px] mx-auto mt-[12vh]">
            <div className="flex flex-row rounded-lg h-[83vh] bg-white shadow-xl flex">
              {/* Menu bên */}
              <div className="basic-1/3">
                <SideBar />
              </div>

              {/* Thông báo */}
              <div className="basic-2/3 grow py-6">
            
                <div className="overflow-y-auto h-[70vh] mt-4">
                  <div className="group border-t flex items-center py-4 hover:bg-gray-100 px-6">
                    {/* Hình */}
                    <div className="w-fit flex justify-start overflow-hidden">
                      <img
                        src="https://azpet.com.vn/wp-content/uploads/2024/09/z5830909341356_ae216374bd46c4cce44abc75bd3b736c-scaled.jpg"
                        alt="NotiOrder"
                        className="w-24 h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Nội dung */}
                    <div className="w-1/2 grow px-4">
                      <p className="text-lg font-semibold">Đơn đã hoàn tất</p>
                      <p className="text-gray-500 text-sm">
                        Đơn <span className="font-bold">"mã"</span> đã hoàn
                        thành. Bạn hãy đánh giá người bán trước ngày{" "}
                        <span className="font-bold">11/11/2024</span> để giúp
                        người mua khác hiểu hơn về người bán này nhé!
                      </p>
                    </div>

                    {/* Button */}
                    <div className="w-fit flex justify-end">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-[#077eff] hover:text-[#077eff] transition-colors">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
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

export default Notification;