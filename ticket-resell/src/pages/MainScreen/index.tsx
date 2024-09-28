import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Event = {
  id: number;
  img: string;
  day: string;
  time: string;
  name: string;
  location: string;
  quantity: number;
};

const events = [
  {
    id: 1,
    img : "https://cdn0-production-images-kly.akamaized.net/xYEcqMdBWw6pN0mFBFD5_5uIjz8=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3396365/original/023706600_1615209973-concert-768722_1280.jpg",
    day: "Today",
    time: "12:00 PM",
    name: "Event 1",
    location: "District 9, Ho Chi Minh city",
    quantity: 28,
  },
  {
    id: 2,
    img: "https://cdn0-production-images-kly.akamaized.net/xYEcqMdBWw6pN0mFBFD5_5uIjz8=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3396365/original/023706600_1615209973-concert-768722_1280.jpg",
    day: "Tomorrow",
    time: "1:00 PM",
    name: "Event 2",
    location: "District 1, Ho Chi Minh city",
    quantity: 18,
  },
  {
    id: 3,
    img: "https://cdn0-production-images-kly.akamaized.net/xYEcqMdBWw6pN0mFBFD5_5uIjz8=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3396365/original/023706600_1615209973-concert-768722_1280.jpg",
    day: "Mon",
    time: "2:00 PM",
    name: "Event 3",
    location: "District 2, Ho Chi Minh city",
    quantity: 5,
  },
];

// Component tùy chỉnh mũi tên điều hướng
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-[#8ACDD7] text-white p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-[#8ACDD7] text-white p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
      </svg>
    </div>
  );
};

const MainScreen = () => {
  const navigate: NavigateFunction = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Số lượng card hiển thị cùng lúc
    slidesToScroll: 1,
    autoplay: true, // Tự động chuyển
    autoplaySpeed: 3000, // Chuyển sau 3 giây
    arrows: true, // Hiển thị mũi tên điều hướng
    nextArrow: <NextArrow />, // Mũi tên kế tiếp
    prevArrow: <PrevArrow />, // Mũi tên quay lại
    responsive: [
      {
        breakpoint: 1024, // Độ rộng màn hình
        settings: {
          slidesToShow: 2, // Số lượng card hiển thị trên màn hình nhỏ
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Số lượng card hiển thị trên màn hình nhỏ hơn
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-screen h-dvh">
      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 w-full bg-transparent p-4 z-10">
      <div className="max-w-8xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-3xl font-bold hover:text-gray-200 cursor-pointer">Festix</div>
          {/* Menu */}
         <ul className="flex space-x-6">
            <li className="text-white hover:text-gray-200 cursor-pointer">Home</li>
            <li className="text-white hover:text-gray-200 cursor-pointer">Event List</li>
            <li className="text-white hover:text-gray-200 cursor-pointer">About</li>

            {/* Search */}
            <li className="text-white">
              <div className="relative bg-white/30 backdrop-blur rounded-lg px-3 py-1 flex items-center hover:bg-white/40">
                <div className="absolute left-2 pointer-events-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3a7.5 7.5 0 015.775 12.425l5.35 5.35a.75.75 0 11-1.06 1.06l-5.35-5.35A7.5 7.5 0 1110.5 3zm0 1.5a6 6 0 100 12 6 6 0 000-12z" />
                    </svg>
                  </div>
                <input type="text" placeholder="Search" className="pl-8 pr-3 text-current bg-transparent outline-none w-full placeholder-white caret-gray-400 focus:text-gray-400"/>
              </div>
            </li>

            {/* Notification */}
            <li className="text-white hover:text-gray-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </li>

            {/* Chat */}
            <li className="text-white hover:text-gray-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </li>

            {/* Cart */}
            <li className="text-white hover:text-gray-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </li>

            {/* Q&A */}
            <li className="text-white hover:text-gray-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </li>
            <li className="text-white hover:text-gray-200 cursor-pointer">Login</li>
          </ul>
        </div>
     </nav>

      {/* BANNER */}
      <div className="w-screen h-2/3 flex">
        {/* Section 1 */}
        <div className="bg-[#FF7878] w-1/2 flex flex-col justify-center items-center">
          {/* Headline */}
          <h1 className="font-montserrat text-6xl text-white font-bold mb-2">Sell</h1>
          {/* Sub-Headline */}
          <div className="flex items-center">
            <p className="font-open-sans text-white text-lg mb-3">Turn your unused tickets into cash</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 text-white hover:text-gray-200 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </div>
          {/* Button */}
          <button className="font-poppins bg-white text-[#8ACDD7] px-6 py-3 rounded-full font-semibold flex items-center hover:translate-x-3 transition ease-in-out delay-150 duration-300 hover:shadow-xl hover:ring-2 hover:ring-[#8ACDD7] ">
            Make some money
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-2 mr-0 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Section 2 */}
        <div className="bg-[#8ACDD7] w-1/2 flex flex-col justify-center items-center">
          {/* Headline */}
          <h1 className="font-montserrat text-6xl text-white font-bold mb-4">Buy</h1>
          {/* Sub-Headline */}
          <div className="flex items-center">
            <p className="font-open-sans text-white text-lg mb-3">Find last-minute tickets at great prices</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 text-white hover:text-gray-200 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </div>
          {/* Button */}
          <button className="bg-white text-[#FF6F61] px-6 py-3 rounded-full font-semibold flex items-center hover:translate-x-3 transition ease-in-out delay-150 duration-300 hover:shadow-xl hover:ring-2 hover:ring-[#FF6F61]">
            See what's out there
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-2 mr-0 text-current " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* EVENT CARDS */}
      <div className=" w-screen py-10">
        <h1 className="text-4xl text-center font-bold">Popular Events</h1>
        <h4 className="text-center">Don’t miss out on your favorite events</h4>

        {/* Card-Container */}
        <div className="w-full h-fit flex flex-row justify-center items-center py-5">
          <div className="relative w-[90%] max-w-screen-xl h-fit mx-auto">
            {/* Card */}
            <Slider {...settings} className="flex justify-center items-center gap-10">
              {events.map((ev) => (
                <div key={ev.id} className="bg-[#F4F4F4] w-80 h-fit rounded-lg shadow-md hover:shadow-2xl transition duration-300 group">
                  {/* Card-Img */}
                  <div className="overflow-hidden rounded-t-lg">
                    <img
                      src={ev.img}
                      alt={ev.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {/* Card-Content */}
                  <div className="py-2 px-4 text-center">
                    <div className="flex place-content-center items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-2 text-red-600 cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                      </svg>
                      <p className="text-red-600 font-medium">{ev.day}, {ev.time}</p>
                    </div>
                    <h3 className="font-bold text-xl">{ev.name}</h3>
                    <p className="text-sm">{ev.location}</p>
                    {/* Card-Button */}
                    <div className="flex justify-center">
                      <button className="my-2 px-2 py-1 bg-[#8ACDD7] rounded-2xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 text-white cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
                        </svg>
                        <p className="text-white">{ev.quantity}</p>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* Button */}
        <div className="flex justify-center py-2">
          <button className="outline outline-2 rounded-sm text-[#8ACDD7] w-[100px] h-[50px] mx-auto hover:bg-[#8ACDD7] hover:text-white">View More</button>
        </div>
      </div>
      
      {/* HERO-SECTION */}
      <div className="w-screen h-[70vh] flex justify-center overflow-hidden">
        {/* Hero-Img */}
        <div 
        className="relative bg-cover bg-center w-5/6" 
        style={{ backgroundImage: 'url(https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg)', backgroundAttachment: 'fixed', }}
        >
          {/* Overlay màu tối */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          {/* Hero-Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
            <h1 className="text-4xl mb-4 font-bold">Can’t Attend? Sell Your Tickets Instantly – Safe and Easy!</h1>
            <div className="w-1/2">
              <p className="mb-8">Don't let your tickets go to waste! Festix provides a fast and secure way to resell your tickets in just a few clicks,
              ensuring peace of mind with every transaction.</p>
            </div>
            <button className="px-6 py-3 text-lg font-medium bg-transparent border border-white hover:bg-white hover:text-[#FF6F61] transition">
            Sell Now
            </button>
          </div>
        </div>
      </div>

      <button 
      className="bg-[yellow] text-black w-[100px] h-[50px] mx-auto" 
      onClick={() => navigate(-1)}
      >
         Test navigate button
      </button>
    </div>
    
  );
};

export default MainScreen;
