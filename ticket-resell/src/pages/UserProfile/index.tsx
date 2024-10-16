import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import ScrollToTop from "../../components/ScrollToTop";

// TICKET
type Ticket = {
  id: number;
  name: string;
  day: string;
  time: string;
  location: string;
  city: string;
  category: string;
  section: string;
  row: number;
  price: number;
  quantity: number;
  description: string;
};
const tickets: Ticket[] = [
  {
    id: 1,
    name: "Event 1",
    day: "Oct 12/2024",
    time: "2:00 PM",
    location: "Ziggo Dome",
    city: "Amsterdam, Netherlands",
    category: "Seat",
    section: "A",
    row: 28,
    price: 100000,
    quantity: 1,
    description: "Vé ngồi"
  },
  {
      id: 2,
      name: "Event 1",
      day: "Oct 12/2024",
      time: "2:00 PM",
      location: "Ziggo Dome",
      city: "Amsterdam, Netherlands",
      category: "Stand",
      section: "A",
      row: 0,
      price: 100000,
      quantity: 1,
      description: "Vé đứng"
  },
  {
      id: 3,
      name: "Event 2",
      day: "Nov 15/2024",
      time: "7:30 PM",
      location: "Madison Square Garden",
      city: "New York, USA",
      category: "Seat",
      section: "B",
      row: 10,
      price: 200000,
      quantity: 2,
      description: "Vé ngồi"
  },
];

// LISTINGS
const RenderTotalTickets = (tickets: Ticket[]) => {
  const navigate: NavigateFunction = useNavigate();

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("vi-VN");
  };

  const [visibleTickets, setVisibleTickets] = useState(5); // Số vé hiển thị ban đầu
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái hiển thị bình luận mở rộng hay không

  const handleShowMore = () => {
    setVisibleTickets((prev) => {
      const newVisibleTickets = prev + 10; // Hiển thị thêm 10 vé mỗi lần nhấn nút
      if (newVisibleTickets >= tickets.length) {
        setIsExpanded(true); // Đánh dấu là đã mở rộng khi đã hiển thị hết vé
      }
      return newVisibleTickets;
    });
  };

  const handleShowLess = () => {
    setVisibleTickets(5); // Rút gọn về 5 vé
    setIsExpanded(false); // Đánh dấu là không mở rộng
  };

  if (tickets.length === 0) {
    return (
      <div className="w-full py-5 mx-auto">
        <p className="text-xl text-center">
          User does not sell any tickets!!!
        </p>
        <div className="flex justify-center mt-3">
          <button
            className="flex flex-col items-center gap-y-1 text-gray-600 group hover:text-[#87CBB9]"
            onClick={() => navigate("/listEvent")}
          >
            Continue shopping for tickets
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-2 group-hover:text-[#87CBB9] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full">
         {/* Hiển thị các vé, giới hạn số lượng theo visibleTicets */}
         {tickets.slice(0, visibleTickets).map((ticket) => (
          <div key={ticket.id} className="pt-4 hover:bg-neutral-200">
            <p className="px-8 text-xl font-medium">{ticket.name}</p>
            <div className="mt-4 ml-2 px-8 flex justify-start flex-wrap gap-2 text-sm text-gray-500">
              {/* Date */}
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd"/>
                </svg>
                <p>
                  {ticket.day}, {ticket.time}
                </p>
              </div>
              {/* Location */}
              <div className="flex items-center">
                |
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                </svg>
                <p>{ticket.location}</p>
              </div>
              {/* City */}
              <div className="flex items-center">
                |
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd"/>
                </svg>
                <p>{ticket.city}</p>
              </div>
            </div>
            <div className="mt-5 ml-2 px-8 flex flex-wrap justify-start gap-x-4 gap-y-1 text-sm text-gray-500">
              <p><span className="font-medium">Category:</span> <span className="text-gray-700">{ticket.category}</span></p>
              <p><span className="font-medium">Section:</span> <span className="text-gray-700">{ticket.section}</span></p>
              {ticket.category === "Seat" && (
                <p><span className="font-medium">Row:</span> <span className="text-gray-700">{ticket.row}</span></p>
              )}
              <p><span className="font-medium">Quantity:</span> <span className="text-gray-700">{ticket.quantity}</span></p>
              <p><span className="font-medium">Price Per Ticket:</span> <span className="text-gray-700">{formatCurrency(ticket.price)} VND</span></p>
            </div>
            <div className="flex justify-end mt-6 pb-4 border-b-2">
              <button 
              className="bg-[#87CBB9] px-3 mr-4 py-2 rounded-sm text-white hover:bg-[#B9EDDD] hover:text-black"
              onClick={() => navigate("/eventDetail")}
              >
                View Page
              </button>
            </div>
          </div>
        ))}

        {/* Hiển thị nút "Show More" nếu chưa hiển thị hết các bình luận */}
        {!isExpanded && visibleTickets < tickets.length && (
            <div className="my-3 flex justify-center">
              <button
                onClick={handleShowMore}
                className="flex items-center text-[#87CBB9] text-sm group cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 group-hover:translate-y-2 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"/>
                </svg>
                Show More ({tickets.length-visibleTickets})
              </button>
            </div>
          )}

          {/* Hiển thị nút "Show Less" nếu đã hiển thị hết các bình luận */}
          {isExpanded && (
            <div className="my-3 flex justify-center">
              <button
                onClick={handleShowLess}
                className="flex items-center text-[#87CBB9] text-sm group cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 group-hover:-translate-y-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
                Show Less
              </button>
            </div>
          )}
      </div>
    );
  }
};

type Comment = {
  id: number;
  name: string;
  avatar: string; // URL ảnh đại diện
  rating: number;
  date: string;
  time: string;
  comment: string;
};

const comments: Comment[] = [
  {
    id: 1,
    name: "Martin Luather",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    rating: 3,
    date: "28/08/2004",
    time: "07:45 AM",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    name: "John Doe",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    rating: 2,
    date: "31/08/2004",
    time: "07:45 AM",
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 3,
    name: "Jane Smith",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    rating: 2,
    date: "25/05/2004",
    time: "07:45 AM",
    comment:
      "It has survived not only five centuries, but also the leap into electronic typesetting.",
  },
  {
    id: 4,
    name: "Martin Luather",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    rating: 3,
    date: "28/08/2004",
    time: "07:45 AM",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 5,
    name: "John Doe",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    rating: 2,
    date: "31/08/2004",
    time: "07:45 AM",
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 6,
    name: "Jane Smith",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    rating: 2,
    date: "25/05/2004",
    time: "07:45 AM",
    comment:
      "It has survived not only five centuries, but also the leap into electronic typesetting.",
  },
  {
    id: 7,
    name: "Martin Luather",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    rating: 3,
    date: "28/08/2004",
    time: "07:45 AM",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 8,
    name: "John Doe",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    rating: 2,
    date: "31/08/2004",
    time: "07:45 AM",
    comment:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
];

const RenderStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating); // Số ngôi sao đầy đủ
  const halfStar = rating % 1 !== 0; // Ngôi sao 1/2 nếu có
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke-width="0">
          <path fill="#FACC15" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
        </svg>
      );
      if (i === fullStars && halfStar) {
        stars.push(
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke-width="0">
            <defs>
              <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#FACC15" /> {/* Màu vàng */}
                <stop offset="50%" stopColor="#D1D5DB" /> {/* Màu xám */}
              </linearGradient>
            </defs>
            <path fill="url(#half-fill)" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
          </svg>
        );
      }
    } else if (stars.length < 5) {
      stars.push(
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke-width="0">
          <path fill="#D1D5DB" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
        </svg>
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

const RenderTotalReviews = (comments: Comment[]) => {

  const [visibleComments, setVisibleComments] = useState(5); // Số bình luận hiển thị ban đầu
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái hiển thị bình luận mở rộng hay không

  const handleShowMore = () => {
    setVisibleComments((prev) => {
      const newVisibleComments = prev + 10; // Hiển thị thêm 10 bình luận mỗi lần nhấn nút
      if (newVisibleComments >= comments.length) {
        setIsExpanded(true); // Đánh dấu là đã mở rộng khi đã hiển thị hết bình luận
      }
      return newVisibleComments;
    });
  };

  const handleShowLess = () => {
    setVisibleComments(5); // Rút gọn về 5 bình luận
    setIsExpanded(false); // Đánh dấu là không mở rộng
  };

  return (
    <div>
      {/* Nếu không có bình luận */}
      {comments.length === 0 ? (
        <div className="w-full py-5 mx-auto">
          <p className="text-xl text-center">User has no reviews!!!</p>
        </div>
      ) : (
        <div>
          {/* Hiển thị các bình luận, giới hạn số lượng theo visibleComments */}
          {comments.slice(0, visibleComments).map((comment) => (
            <div key={comment.id} className="p-8 border-b-2">
              <div className="flex items-center mb-2">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="w-16 h-16 rounded-full mr-4 cursor-pointer"
                />
                <div className="flex justify-between w-full">
                  <div>
                    <p className="font-semibold cursor-pointer">{comment.name}</p>
                    <div className="flex items-center">
                      <RenderStars rating={comment.rating} />
                      <span className="ml-1 text-gray-600">({comment.rating})</span>
                    </div>
                  </div>
                  <p className="text-gray-500">
                    {comment.date}, {comment.time}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))}

          {/* Hiển thị nút "Show More" nếu chưa hiển thị hết các bình luận */}
          {!isExpanded && visibleComments < comments.length && (
            <div className="my-3 flex justify-center">
              <button
                onClick={handleShowMore}
                className="flex items-center text-[#87CBB9] text-sm group cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 group-hover:translate-y-2 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"/>
                </svg>
                Show More ({comments.length-visibleComments})
              </button>
            </div>
          )}

          {/* Hiển thị nút "Show Less" nếu đã hiển thị hết các bình luận */}
          {isExpanded && (
            <div className="my-3 flex justify-center">
              <button
                onClick={handleShowLess}
                className="flex items-center text-[#87CBB9] text-sm group cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 group-hover:-translate-y-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
                Show Less
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const UserProfile = () => {
  const totalTickets = tickets.length;
  const totalReviews = comments.length;

  // Rating
  const totalRating = comments.reduce((acc, comment) => acc + comment.rating,0);
  const averageRating = (totalRating / comments.length).toFixed(1); // Tính trung bình rating

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* SCROLL TO TOP */}
      <ScrollToTop/>

      {/* NAVBAR */} 
      <NavBar/>

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton/>

      {/* MAIN CONTENT */}
      <div className="w-[60%] min-h-screen flex flex-grow justify-between gap-8 mx-auto mt-32">
        <div className="flex w-1/3 h-full bg-[#F4F4F4] rounded-lg drop-shadow-xl">
          <div className="w-full h-fit flex flex-col items-center justify-center mb-3 pt-10 pb-6">
            <div className="relative overflow-hidden rounded-full">
              <img
                src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                alt="User Img"
                className="object-cover w-40 h-40"
              />
            </div>
            <p className="text-3xl font-bold mt-4">Thanh Mai</p>

            {/* Phone */}
            <div className="flex gap-1 items-center mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"/>
              </svg>
              <p>0123456789</p>
            </div>
            {/* Email */}
            <div className="flex gap-1 items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
              </svg>
              <p>maint@gmail.com</p>
            </div>

            {/* SVG */}
            <div className="w-[90%] flex items-center justify-around mt-4">
              {/* Rate trung bình */}
              <div className="flex gap-1 items-center">
                <RenderStars rating={parseFloat(averageRating)} />
                {comments.length ===0 ? <p>0.0</p> : <span>{averageRating}</span>}  
              </div>
              <div className="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-black" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd"/>
                </svg>
                <p>{totalReviews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* LISTINGS & REVIEWS */}
        <div className="w-2/3 flex flex-col">
          {/* Listings */}
          <div className="w-full bg-[#F4F4F4] rounded-lg drop-shadow-xl">
            <p className="bg-[#87CBB9] rounded-t-lg px-8 py-3 text-lg font-medium text-white">
              Listings ({totalTickets})
            </p>
            {RenderTotalTickets(tickets)}
          </div>

          {/* Reviews */}
          <div className="w-full bg-[#F4F4F4] rounded-lg drop-shadow-xl mt-8">
            <p className="bg-[#87CBB9] rounded-t-lg px-8 py-3 text-lg font-medium text-white">
              Reviews ({totalReviews})
            </p>
            {RenderTotalReviews(comments)}
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

export default UserProfile;