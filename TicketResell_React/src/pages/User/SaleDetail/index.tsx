import SideBar from "../../../components/AccountProfile/SideBar/SideBar";
import ScrollToTop from "../../../components/ScrollToTop";
import NavBar from "../../../components/NavBar";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiShoppingCart, FiDollarSign, FiTruck, FiPackage, FiStar } from 'react-icons/fi';
import ProgressBarIcon from "../../../components/ProgressBarIcon";

const SaleDetail = () => {
    const navigate = useNavigate();

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
 
   type Buyer = {
     buyerId: string;
     buyerName: string;
     buyerAvatar: string;
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
   };
 
     type Order = {
       orderId: string,
       orderDate: string,
       totalPrice: number,
       status: string,
       paymentMethod: string,
       tickets: Ticket[],
       buyer: Buyer;
       events: Event[];
     };
 
     const order: Order = 
       {
         orderId: "o001",
         orderDate: "2024-11-01",
         totalPrice: 500000,
         status: "Pending",
         paymentMethod: "Credit Card",
         tickets: [
           {
             ticketId: "t001",
             ticketName: "Concert Ticket - VIP",
             ticketType: "VIP",
             price: 10000,
             quantity: 1,
             eventId: "e001",
           },
           {
             ticketId: "t002",
             ticketName: "Concert Ticket - Standard",
             ticketType: "Standard",
             price: 10000,
             quantity: 2,
             eventId: "e001",
           },
         ],
         buyer: {
           buyerId: "s001",
           buyerName: "Nguyen Van A",
           buyerAvatar: "https://example.com/avatar-a.jpg",
         },
         events: [
           {
             eventId: "e001",
             eventName: "Music Concert 2024",
             eventImage: "https://example.com/event-image1.jpg",
             eventTime: "18:00",
             location: "Stadium A",
             city: "Ho Chi Minh City",
           },
         ],
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
                     onClick={() => navigate(-1)}
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
                       Mã đơn: <span className="font-medium">abcd</span>
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
                       {/* Phone */}
                       <div className="flex items-center mt-1">
                           <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                             <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                           </svg>
                           <span>123-456-7890</span>
                         </div>
 
                           {/* Email */}
                           <div className="flex items-center">
                             <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                               <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                             </svg>
                             <span>info@mysite.com</span>
                           </div>
                       <p className="text-gray-500 text-sm mt-2">
                         Bạn phải xác nhận đơn trước <span className="font-medium">26-11-2024</span>
                       </p>
                     </div>
                     <div className="flex flex-col space-y-2">
                       <button className="p-2 bg-[#077eff] text-white rounded ">
                         Xác nhận
                       </button>
                     </div>
                   </div>
 
                   {/* Phân cách */}
                   <div className="relative flex items-center">
                     <div className="flex-grow border-t border-dashed border-gray-300"></div>
                   </div>
 
                   <div key={order.orderId} className="bg-gray-100">
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
                                 src={order.buyer.buyerAvatar}
                                 alt="Buyer"
                                 className="w-8 h-8 rounded-full group-hover:scale-110 transition-transform duration-300"
                               />
                             </div>
 
                             {/* Tên người bán */}
                             <p className="font-semibold">{order.buyer.buyerName}</p>
                           </div>
 
                           {/* Status */}
                           <div>
                             <p className="text-[#87CBB9]">HOÀN THÀNH</p>
                           </div>
                         </div>
 
                         {/* DS vé */}
                         {order.tickets.map((ticket, index) => {
                           // Find the corresponding event based on eventId
                           const event = order.events.find(e => e.eventId === ticket.eventId);
 
                           return (
                             <div 
                             key={ticket.ticketId} 
                             className="border-t cursor-pointer"
                             onClick={() => navigate("/ticketDetail")}
                             >
                               <div
                                 className={`flex items-center gap-3 ${
                                   index === order.tickets.length - 1 ? "mt-2" : "my-2"
                                 }`}
                               >
 
                                 {/* Hình sự kiện */}
                                 <div className="overflow-hidden">
                                   <img
                                     src={event?.eventImage}
                                     alt="Event"
                                     className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
                                   />
                                 </div>
                                 <div className="flex-1 flex flex-col">
 
                                   {/* Tên sự kiện */}
                                   <p className="font-semibold text-lg">
                                     {event?.eventName}
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
                                       {event?.eventTime}
                                     </p>
                                   </div>
 
                                   {/* Thông tin vé */}
                                   <div className="flex gap-3">
 
                                     {/* Tên vé */}
                                     <p className="text-sm text-gray-500">
                                       <span className="font-medium">Tên vé:</span> {ticket.ticketName}
                                     </p>
 
                                     {/* Loại vé */}
                                     <p className="text-sm text-gray-500">
                                       <span className="font-medium">Loại vé:</span> {" "}
                                       {ticket.ticketType === "Seat" ? "Ngồi" : "Đứng"}
                                     </p>
                                   </div>
 
                                   {/* Số lượng vé */}
                                   <div>
                                     <p className="text-xs">x{ticket.quantity}</p>
                                   </div>
                                 </div>
           
                                 <div className="flex flex-col text-right">
 
                                   {/* Giá vé */}
                                   <p className="text-[#87CBB9] font-semibold">{ticket.price} VND</p>
 
                                   {/* Chú ý */}
                                   <div className="w-fit mt-1">
                                     <p className="border border-gray-500 text-gray-500 text-[10px] p-0.5">
                                       Hoàn tiền trong 15 ngày
                                     </p>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           );
                         })}
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
                               {order.totalPrice} VND
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
                         <p className="text-gray-500">Phương thức thanh toán: <span className="text-[#87CBB9]">VNPay</span></p>
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

export default SaleDetail;