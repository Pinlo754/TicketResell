import usePurchase from "./usePurchase";
import SideBar from "../../../components/AccountProfile/SideBar/SideBar";
import ScrollToTop from "../../../components/ScrollToTop";
import NavBar from "../../../components/NavBar";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Footer from "../../../components/Footer";
import TopBar from "../../../components/AccountProfile/TopBar";
import Feedback from "../../../components/Feedback";

const Purchase = () => {

    const {
      navigate,
      comments,
      commentIds,
      orders,
      selectedOrder,
      setSelectedOrder,
      tabs,
      handleOpenFeedback,
      handleCloseFeedback,
      showFeedback,
      setShowFeedback,
      handleComplete,
      handleRefund,
      formattedDateTime,
    } = usePurchase();
      
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

              {/* Nội dung */}
              <div className="basic-2/3 grow p-6">
                {/* Menu trên */}
                <div className="flex justify-center">
                  <TopBar tabs={tabs} />
                </div>

                <div className="overflow-y-auto h-[70vh] mt-4">
                  {/* Orders */}
                  {orders.map((order) => (
                    <div key={order.orderId} className="bg-gray-100 mt-6">
                      <div className="p-4">
                        <div className="flex justify-between items-center pb-2">
                          {/* Thông tin người bán */}
                          <div
                            onClick={() => navigate("/userProfile")}
                            className="flex items-center gap-3 group cursor-pointer"
                          >
                            {/* Avt người bán */}
                            <div className="overflow-hidden rounded-full">
                              <img
                                src={order.seller.userImage}
                                alt="Seller"
                                className="w-8 h-8 rounded-full group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>

                            {/* Tên người bán */}
                            <p className="font-semibold">
                             {order.seller.firstName} {order.seller.lastName} 
                            </p>
                          </div>

                          {/* Status */}
                          <div>
                            <p
                              className={`${
                                order.status === "Pending"
                                  ? "text-yellow-500"
                                  : order.status === "Complete"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {order.status === "Pending"
                                ? "ĐÃ MUA"
                                : order.status === "Complete"
                                ? "HOÀN THÀNH"
                                : "HOÀN TIỀN"}
                            </p>
                          </div>
                        </div>

                            <div
                              key={order.ticket.ticketId}
                              className="border-t cursor-pointer"
                              onClick={() => {
                                navigate("/user/purchase/orderDetail", {
                                  state: { selectedOrder: order },
                                });
                              }}
                            >
                              <div
                                className={`flex items-center gap-3 my-2`}
                              >
                                {/* Hình sự kiện */}
                                <div className="overflow-hidden">
                                  <img
                                    src={order.event.eventImage}
                                    alt="Event"
                                    className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-1 flex flex-col">
                                  {/* Tên sự kiện */}
                                  <p className="font-semibold text-lg">
                                    {order.event.eventName}
                                  </p>

                                  {/* Date */}
                                  <div className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-4 h-4 pr-1 text-red-600 cursor-pointer"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                    <p className="text-red-600 font-medium text-xs">
                                      {formattedDateTime(order.event.eventTime)}
                                    </p>
                                  </div>

                                  {/* Thông tin vé */}
                                  <div className="flex gap-3">
                                    {/* Tên vé */}
                                    <p className="text-sm text-gray-500">
                                      <span className="font-medium">
                                        Tên vé:
                                      </span>{" "}
                                      {order.ticket.ticketName}
                                    </p>

                                    {/* Loại vé */}
                                    <p className="text-sm text-gray-500">
                                      <span className="font-medium">
                                        Loại vé:
                                      </span>{" "}
                                      {order.ticket.type === "Seat"
                                        ? "Ngồi"
                                        : "Đứng"}
                                    </p>
                                  </div>

                                  {/* Số lượng vé */}
                                  <div>
                                    <p className="text-xs">x{order.quantity}</p>
                                  </div>
                                </div>

                                <div className="flex flex-col text-right">
                                  {/* Giá vé */}
                                  <p className="text-[#87CBB9] font-semibold">
                                    {order.ticket.price} VND
                                  </p>
                                </div>
                              </div>
                            </div>
                      </div>

                      {/* Separator with decorative dot border */}
                      <div className="relative flex items-center">
                        {/* Left semi-circle */}
                        <div className="absolute left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2"></div>
                        {/* Dashed line */}
                        <div className="flex-grow border-t border-dashed border-gray-300"></div>
                        {/* Right semi-circle */}
                        <div className="absolute right-0 w-2 h-2 bg-white rounded-full translate-x-1/2"></div>
                      </div>

                      <div className="p-4">
                        {/* Tổng tiền */}
                        <div className="flex justify-end">
                          <p className="text-sm">
                            Thành tiền:{" "}
                            <span className="font-semibold text-lg text-[#87CBB9]">
                              {order.totalAmount} VND
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          {/* Chú ý */}
                          <div>
                            {order.status === "Pending" && (
                              <p className="text-xs text-gray-500">
                                Cần Xác nhận vé hoặc gửi Yêu cầu hoàn tiền sau khi sự kiện diễn ra 1 ngày
                            </p>
                            )}
                          </div>

                          {/* Button */}
                          <div className="flex gap-4">
                            {order.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleComplete(order.orderId, order.ticket.userId, order.totalAmount )}
                                  className="border rounded p-2 bg-[#B9EDDD] hover:bg-[#87CBB9] hover:text-white"
                                >
                                  Xác nhận vé
                                </button>
                                <button
                                  onClick={() => handleRefund(order.orderId)}
                                  className="border rounded p-2 hover:bg-[#87CBB9] hover:text-white"
                                >
                                  Yêu cầu hoàn tiền
                                </button>
                              </>
                            )}
                            {order.status === "Complete" && commentIds.includes(order.orderId) && (
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowFeedback(true);
                                }}
                                className="rounded p-2 bg-[#B9EDDD] hover:bg-[#87CBB9] hover:text-white"
                              >
                                Đánh giá
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex-grow-0">
          <Footer />
        </div>

        {/* FEEDBACK FORM */}
        {showFeedback && selectedOrder && (
          <div className="pt-12 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Feedback onClose={handleCloseFeedback} order={selectedOrder}/> 
          </div>
        )}
      </div>
    );
  }

export default Purchase;