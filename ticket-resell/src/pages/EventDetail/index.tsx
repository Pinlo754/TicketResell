import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import ScrollToTop from "../../components/ScrollToTop";

// SORT
type SortOption = {
    label: string;
    value: string;
  }
  const sortOptions: SortOption[] = [
    { label: "First listed", value: "first" },
    { label: "Latest listed", value: "latest" },
    { label: "Price (Low to High)", value: "price_low" },
    { label: "Price (High to Low)", value: "price_high" },
  ];

  // TICKET 
  type Ticket = {
    id: number;
    img: string;
    category: string;
    section: string;
    type: string;
    row: number;
    price: number;
    quantity: number;
    description: string;
  }
  const tickets: Ticket[] = [
    { 
        id: 1,
        img: "https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg",
        category: "E-Ticket",
        section: "A",
        type: "Seat",
        row: 28,
        price: 100000,
        quantity: 1,
        description: "Vé ngồi",
    },
    { 
        id: 2,
        img: "https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg",
        category: "E-Ticket",
        section: "B",
        type: "Stand",
        row: 0,
        price: 200000,
        quantity: 3,
        description: "Vé đứng",
    },
    { 
        id: 3,
        img: "https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg",
        category: "E-Ticket",
        section: "C",
        type: "Seat",
        row: 31,
        price: 300000,
        quantity: 10,
        description: "Vé ngồi",
    },
  ];

const EventDetail = () => {

    const navigate: NavigateFunction = useNavigate();

   // Tạo state để lưu số lượng cho từng ticket
   const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    // Khởi tạo state số lượng bằng cách lấy ticket.id làm key, mỗi vé bắt đầu với số lượng là 1
    const initialQuantities: Record<number, number> = {};
    tickets.forEach(ticket => {
      initialQuantities[ticket.id] = 1;
    });
    return initialQuantities;
  });

  // Hàm xử lý tăng số lượng cho vé với ticketId tương ứng
  const handleIncrease = (ticketId: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [ticketId]: Math.min(prevQuantities[ticketId] + 1, tickets.find(ticket => ticket.id === ticketId)?.quantity || 1),
    }));
  };

  // Hàm xử lý giảm số lượng cho vé với ticketId tương ứng
  const handleDecrease = (ticketId: number) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [ticketId]: Math.max(prevQuantities[ticketId] - 1, 1),
    }));
  };

  // Hàm định dạng tiền tệ
    const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN');
  };
    
    return (
        <div className="w-screen min-h-screen flex flex-col">
            
            {/* SCROLL TO TOP */}
            <ScrollToTop/>

            {/* NAVBAR */} 
            <NavBar/>

            {/* SCROLL TO TOP BUTTON */}
            <ScrollToTopButton/>

            {/* MAIN CONTENT */}
            <div className="w-full flex-grow">
                {/* BACKGROUND */}
                <div className="w-full relative">
                    {/* Background */}
                    <div
                    className="absolute inset-0 bg-cover bg-center blur-2xl bg-opacity-80"
                    style={{ backgroundImage:'url(https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg)'}}
                    > </div>
                    {/* Overlay màu tối */}
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 pt-32 mx-auto text-center text-white flex flex-col justify-center items-center">
                        {/* Img */}
                        <div className="relative py-10">
                            <div className="overflow-hidden rounded-lg">
                            <img
                                src="https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg"
                                alt="Event"
                                className="object-cover w-46 h-56 hover:scale-110 transition-transform duration-300"
                            />
                            </div>
                        </div>

                        {/* Tên sự kiện */}
                        <h1 className="mt-4 text-4xl font-bold  sm:text-5xl">
                        Gewoon Boef
                        </h1>
                        <div className="mt-6 text-lg flex justify-center gap-x-8">
                            {/* Date */}
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                                </svg>
                                <p>Sat, Oct 12, 8:00 PM</p>
                            </div>
                            {/* Venue */}
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                </svg>
                                <p>Ziggo Dome</p>
                            </div>
                            {/* City */}
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
                                </svg>
                                <p>Amsterdam, Netherlands</p>
                            </div>
                        </div>
                        {/* Subcribe */}
                        <div className="flex justify-center">
                            <button className="mt-8 px-4 py-2 flex items-center rounded-lg bg-[#87CBB9] hover:bg-[#B9EDDD] hover:text-black group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 origin-top transition-transform duration-300 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                </svg>
                                    Subcribe
                            </button>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="relative z-10 pb-12 flex justify-between mt-10">
                        <button 
                        className="bg-transparent text-white font-semibold ml-10 group flex items-center"
                        onClick={() => navigate("/sell")}
                        >
                            Sell your tickets on Festix
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                        <p className="text-white font-semibold mr-10">128 available • 200 sold • 150 wanted</p>
                    </div>
                </div>

                {/* LIST TICKETS */}
                <div className="w-[60%] mx-auto pt-10">
                    {/* Sort: CHƯA XONG */}
                    <div className="w-full bg-black grid grid-cols-1 md:grid-cols-4 gap-5 mt-10 mb-10 px-3 py-3 rounded-lg text-white">
                        <div>
                            <button className="bg-transparent text-xl">
                                <span className="font-medium">Sort: </span>
                            </button>
                        </div>
                    </div>

                    {/* List */}
                    {tickets.map((ticket) => (
                        <div 
                        key={ticket.id} 
                        className="bg-[#F4F4F4] w-full flex rounded-lg mt-4 shadow-md cursor-pointer group hover:shadow-2xl"
                        onClick={() => navigate("/ticketDetail")}
                        >
                            <div className="flex items-center justify-center w-1/5 my-3">
                                <div className="relative overflow-hidden rounded-full">
                                 <img 
                                 src={ticket.img}
                                 alt={ticket.section}
                                 className="object-cover w-28 h-28 group-hover:scale-110 transition-transform duration-300"
                                 />
                                </div>
                            </div>
                            <div className="w-3/5 my-auto">
                                <div className="flex gap-1.5">
                                    <p className="font-bold text-lg">Section {ticket.section} • {ticket.type}</p>
                                    {ticket.type === "Seat" && (
                                        <p className="font-bold text-gray-400 text-lg mr-10">• Row {ticket.row}</p>
                                    )}
                                </div>
                             <p><span className="font-medium">Quantity:</span> {ticket.quantity}</p>
                             <p className="text-end mr-4 text-red-500 font-semibold">{formatCurrency(ticket.price)} VND/ Ticket</p>
                             <p className="text-sm text-gray-500">"{ticket.description}"</p>
                            </div>
                             <div className="w-1/5 flex flex-col border-l-2">
                                <div className="flex justify-center items-center mt-4">
                                    {/* Button giảm số lượng */}
                                    <button
                                        onClick={() => handleDecrease(ticket.id)}
                                        className={`px-4 py-2 rounded-sm border-2 ${
                                            quantities[ticket.id] === 1 
                                            ? 'cursor-not-allowed bg-gray-100 border-gray-200' 
                                            : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
                                        }`}
                                        disabled={quantities[ticket.id] === 1}
                                    >
                                        -
                                    </button>
                                    {/* Hiển thị số lượng hiện tại */}
                                    <p className="text-center mx-1 py-2 w-16 rounded-sm border-2 border-gray-300 cursor-not-allowed">
                                    {quantities[ticket.id]}
                                    </p>
                                    {/* Button tăng số lượng */}
                                    <button
                                        onClick={() => handleIncrease(ticket.id)}
                                        className={`px-4 py-2 rounded-sm border-2 ${
                                            quantities[ticket.id] === ticket.quantity 
                                            ? 'cursor-not-allowed bg-gray-100 border-gray-200' 
                                            : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
                                        }`}
                                        disabled={quantities[ticket.id] === ticket.quantity}
                                    >
                                        +
                                    </button>
                                </div>

                             {/* Button */}
                             <button className="bg-[#87CBB9] w-[87%] text-white py-2 mt-3 mx-auto rounded-sm hover:bg-[#B9EDDD] hover:text-black">Add to cart</button>
                             <button className="bg-[#87CBB9] w-[87%] text-white py-2 mt-1.5 mb-4 mx-auto rounded-sm hover:bg-[#B9EDDD] hover:text-black">Buy</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
                
            {/* FOOTER */}
            <div className="flex-grow-0">
                <Footer />
            </div>
        </div>
    )
};

export default EventDetail;