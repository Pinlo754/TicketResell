import SideBar from "../../../components/AccountProfile/SideBar/SideBar";
import ScrollToTop from "../../../components/ScrollToTop";
import NavBar from "../../../components/NavBar";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Footer from "../../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiShoppingCart, FiDollarSign, FiTruck, FiPackage, FiStar } from 'react-icons/fi';
import ProgressBarIcon from "../../../components/ProgressBarIcon";
import axios from "axios";
import Feedback from "../../../components/Feedback";

const PurchaseDetail = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { selectedOrder } = location.state || {};

   // Define the current stage (e.g., 3 means up to "Đã Giao Cho ĐVVC" is complete)
   const [currentStage, setCurrentStage] = useState(1);

   // Define steps with `isComplete` set based on the current stage
   const steps = [
     {
       label: 'Đơn Hàng Đã Đặt',
       icon: <FiShoppingCart />,
       timestamp: '14:21 08-11-2024',
       isCompleted: currentStage >= 1,
     },
     {
       label: 'Đã Xác Nhận Thông Tin Thanh Toán',
       icon: <FiDollarSign />,
       timestamp: '14:51 08-11-2024',
       isCompleted: currentStage >= 2,
     },
     {
       label: 'Đã Giao Cho ĐVVC',
       icon: <FiTruck />,
       timestamp: '16:14 09-11-2024',
       isCompleted: currentStage >= 3,
     },
     {
       label: 'Đã Nhận Được Hàng',
       icon: <FiPackage />,
       timestamp: '11:18 11-11-2024',
       isCompleted: currentStage >= 4,
     },
     {
       label: 'Đánh Giá',
       icon: <FiStar />,
       isCompleted: currentStage >= 5,
     },
   ];

   // Function to update the stage (for example, to simulate progressing through stages)
  const nextStage = () => {
    if (currentStage < steps.length) {
      setCurrentStage(currentStage + 1);
    }
  };

  type Seller = {
    Id: string;
    firstName: string;
    lastName: string;
    userImage: string;
  };
  
  type Event = {
    eventId: string;
    eventName: string;
    eventImage: string;
    eventTime: string;
    location: string;
    city: string;
  };

  type Ticket = {
    ticketId: string,
    ticketName: string,
    ticketType: string,
    price: number,
    quantity: number,
    eventId: string,
    userId: string,
  };

    type Order = {
      orderId: string,
      createdAt: string,
      ticketId: string,
      quantity: number,
      totalAmount: number,
      status: string,
      userName: string,
      receiverPhone: string,
      receiverEmail: string,
      paymentMethod: string,
      ticket: Ticket,
      seller: Seller;
      event: Event;
    };
  
  type Comment = {
    commentId: string;
    userId: string;
    rating: number;
    time: string;
    comment: string;
    toUserId: string;
  };

      const userId = localStorage.getItem("userId");
      const [showFeedback, setShowFeedback] = useState(false);
      const [comments, setComments] = useState<Comment[]>([]);
      const commentIds = comments.map(comment => comment.commentId);

      useEffect(() => {
        if (userId != null) {
            fetchComments();
        };
      },[]);

      const fetchComments = async () => {
        try {
          const response = await axios.get(`/api/Comment/list-comment/${userId}`);
          const commentsData: Comment[] = response.data;
          setComments(commentsData);
          
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

      const handleComplete = async (
        orderId: string,
        sellerId: string,
        amount: Number
      ) => {
        try {
          const response = await axios.get(`/api/Wallet/get-by-user/${sellerId}`);
          try {
            const finalresponse = await axios.post(
              "/api/Wallet/sell-ticket?walletId=" +
                response.data.walletId +
                "&amount=" +
                amount
            );
          } catch (error) {
            console.log("Error fetching wallet:", error);
          }
        } catch (error) {
          console.error("Error fetching wallet:", error);
        }
    
        try {
          const response = await axios.put(`/api/Order/update/${orderId}`, {
            orderId: orderId,
            status: "Complete",
          });
          if (response.status === 200) {
            alert("Đơn đã hoàn thành!");
            selectedOrder.status = "Complete";
            navigate("/user/purchase/orderDetail", {
              state: { selectedOrder: selectedOrder },
            });
          }
        } catch (error) {
          console.error("Error completing order:", error);
        }
      };
      
      const handleRefund = async (orderId: string) => {
        try {
          const response = await axios.put(`/api/Order/update/${orderId}`, {
            orderId: orderId,
            status: "Refund"
          })
          if (response.status === 200) {
            alert("Yêu cầu đã gửi thành công!");
            selectedOrder.status = "Refund";
            navigate("/user/purchase/orderDetail", {
              state: { selectedOrder: selectedOrder },
            });
          }
      } catch (error) {
        console.error("Error completing order:", error);
      }
      };

      const handleCloseFeedback = () => {
        setShowFeedback(false);
    };

    const formattedDateTime = (dateParam: string | Date): string => {
      const utcDate = new Date(dateParam);
      const localDate = new Date(utcDate.getTime()); // Convert to local time if needed
      
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0
      const day = String(localDate.getDate()).padStart(2, "0");
      const hours = String(localDate.getHours()).padStart(2, "0");
      const minutes = String(localDate.getMinutes()).padStart(2, "0");
      const seconds = String(localDate.getSeconds()).padStart(2, "0");
    
      // Return the formatted date string
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

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
              <div className="basic-2/3 grow">
                <div className="flex justify-between pt-6 px-6">
                  {/* Navigate */}
                  <div
                    className="flex space-x-1 items-center cursor-pointer text-gray-500 hover:text-[#077eff]"
                    onClick={() => navigate("/user/purchase")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                    <span>TRỞ LẠI</span>
                  </div>

                  {/* Mã đơn */}
                  <div>
                    <p>
                      Mã đơn:{" "}
                      <span className="font-medium">
                        {selectedOrder.orderId}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Phân cách */}
                <div className="relative flex items-center my-4">
                  <div className="absolute inset-0 border-t border-gray-300"></div>

                  <div className="absolute inset-0 border-t border-gray-400 top-1"></div>
                </div>

                <div className="overflow-y-auto h-[70vh]">
                  {/* Tiến trình đơn hàng */}
                  <div className="py-4 px-6">
                    <ProgressBarIcon steps={steps} />
                    <button
                      onClick={nextStage}
                      className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                      Next Stage
                    </button>
                  </div>

                  {/* Phân cách */}
                  <div className="relative flex items-center mt-4">
                    <div className="flex-grow border-t border-dashed border-gray-300"></div>
                  </div>

                  <div className="bg-[#F0F8FF] flex justify-between px-6 py-6">
                    <div>
                      <p className="text-lg font-medium">Thông tin nhận vé</p>

                      {/* Name */}
                      <div className="flex items-center mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                        <span>{selectedOrder.userName}</span>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                          />
                        </svg>
                        <span>{selectedOrder.receiverPhone}</span>
                      </div>

                      {/* Email */}
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                        <span>{selectedOrder.receiverEmail}</span>
                      </div>
                      {selectedOrder.status === "Pending" && (
                              <p className="text-gray-500 text-sm mt-2">
                              Nếu vé nhận được có vấn đề, bạn có thể gửi Yêu cầu hoàn
                              tiền trước{" "}
                              <span className="font-medium">{formattedDateTime(selectedOrder.event.eventTime)}</span>
                            </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                    {selectedOrder.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleComplete(selectedOrder.orderId, selectedOrder.ticket.userId, selectedOrder.totalAmount )}
                                  className="border rounded p-2 bg-[#B9EDDD] hover:bg-[#87CBB9] hover:text-white"
                                >
                                  Xác nhận vé
                                </button>
                                <button
                                  onClick={() => handleRefund(selectedOrder.orderId)}
                                  className="border rounded p-2 hover:bg-[#87CBB9] hover:text-white"
                                >
                                  Yêu cầu hoàn tiền
                                </button>
                              </>
                            )}
                            {selectedOrder.status === "Complete" && commentIds.includes(selectedOrder.orderId) && (
                              <button
                                onClick={() => {
                                  setShowFeedback(true);
                                }}
                                className="rounded p-2 bg-[#B9EDDD] hover:bg-[#87CBB9] hover:text-white"
                              >
                                Đánh giá
                              </button>
                            )}
                    </div>
                  </div>

                  {/* Phân cách */}
                  <div className="relative flex items-center">
                    <div className="flex-grow border-t border-dashed border-gray-300"></div>
                  </div>

                  <div className="bg-gray-100">
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
                              src={selectedOrder.seller.userImage}
                              alt="Seller"
                              className="w-8 h-8 rounded-full group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          {/* Tên người bán */}
                          <p className="font-semibold">
                            {selectedOrder.seller.firstName}{" "}
                            {selectedOrder.seller.lastName}
                          </p>
                        </div>

                        {/* Status */}
                        <div>
                          <p
                            className={`${
                              selectedOrder.status === "Pending"
                                ? "text-yellow-500"
                                : selectedOrder.status === "Complete"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {selectedOrder.status === "Pending"
                              ? "ĐÃ MUA"
                              : selectedOrder.status === "Complete"
                              ? "HOÀN THÀNH"
                              : "HOÀN TIỀN"}
                          </p>
                        </div>
                      </div>

                      {/* DS vé */}
                            <div
                              className="border-t cursor-pointer"
                              onClick={() => navigate("/ticketDetail")}
                            >
                              <div
                                className={`flex items-center gap-3 my-2
                                `}
                              >
                                {/* Hình sự kiện */}
                                <div className="overflow-hidden">
                                  <img
                                    src={selectedOrder.event.eventImage}
                                    alt="Event"
                                    className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                <div className="flex-1 flex flex-col">
                                  {/* Tên sự kiện */}
                                  <p className="font-semibold text-lg">
                                    {selectedOrder.event.eventName}
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
                                    {formattedDateTime(selectedOrder.event.eventTime)}
                                    </p>
                                  </div>

                                  {/* Thông tin vé */}
                                  <div className="flex gap-3">
                                    {/* Tên vé */}
                                    <p className="text-sm text-gray-500">
                                      <span className="font-medium">
                                        Tên vé:
                                      </span>{" "}
                                      {selectedOrder.ticket.ticketName}
                                    </p>

                                    {/* Loại vé */}
                                    <p className="text-sm text-gray-500">
                                      <span className="font-medium">
                                        Loại vé:
                                      </span>{" "}
                                      {selectedOrder.ticket.type === "Seat"
                                        ? "Ngồi"
                                        : "Đứng"}
                                    </p>
                                  </div>

                                  {/* Số lượng vé */}
                                  <div>
                                    <p className="text-xs">
                                      x{selectedOrder.quantity}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-col text-right">
                                  {/* Giá vé */}
                                  <p className="text-[#87CBB9] font-semibold">
                                    {selectedOrder.ticket.price} VND
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

                    <div className="p-4 flex justify-end">
                      {/* Tổng tiền */}
                      <p className="text-lg text-gray-500">
                        Thành tiền:{" "}
                        <span className="font-semibold text-xl text-[#87CBB9]">
                          {selectedOrder.totalAmount} VND
                        </span>
                      </p>
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

                    <div className="p-4 flex justify-end">
                      <p className="text-gray-500">
                        Phương thức thanh toán:{" "}
                        <span className="text-[#87CBB9]">
                          {selectedOrder.paymentMethod}
                        </span>
                      </p>
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

        {/* FEEDBACK FORM */}
        {showFeedback && selectedOrder && (
          <div className="pt-12 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Feedback onClose={handleCloseFeedback} order={selectedOrder}/> 
          </div>
        )}
      </div>
    );
};

export default PurchaseDetail;