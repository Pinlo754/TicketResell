import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import commitent from "../../assets/Commitment.png";
import helpCenter from "../../assets/HelpCenter.jpg";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

// EVENT CARDS
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

// SLIDE - MŨI TÊN
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-[#8ACDD7] text-white p-2 rounded-full hover:bg-white hover:ring-2 hover:ring-[#8ACDD7] hover:text-[#8ACDD7] cursor-pointer"
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
      className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-[#8ACDD7] text-white p-2 rounded-full hover:bg-white hover:ring-2 hover:ring-[#8ACDD7] hover:text-[#8ACDD7] cursor-pointer"
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

  // SLIDE
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

  // TEST BUTTON
  const handleClick = (buttonType: string) => {
    switch (buttonType) {
      case 'makeSome':
        console.log('Bạn đã bấm nút Make some money');
        break;
      case 'seeWhat':
        console.log('Bạn đã bấm nút See what');
        break;
      case 'viewMore':
        console.log('Bạn đã bấm nút View More');
        break;
        case 'sellNow':
        console.log('Bạn đã bấm nút Sell Now');
        break;
        case 'ourStory':
        console.log('Bạn đã bấm nút Our Story');
        break;
        case 'helpCenter':
        console.log('Bạn đã bấm nút Help Center');
        break;
      default:
        console.log('Không xác định');
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* NAVBAR */} 
      <NavBar/>
      
      {/* MAIN CONTENT */}
      <div className="w-full min-h-screen flex-grow">
        {/* MAIN NAVIGATE */}
        <div className="w-full flex">
          {/* Section 1 */}
          <div className="bg-[#FF7878] w-1/2 pt-52 pb-36 flex flex-col justify-center items-center">
            {/* Headline */}
            <h1 className="font-montserrat text-6xl text-white font-bold mb-2">Sell</h1>
            {/* Sub-Headline */}
            <div className="flex items-center">
              <p className="font-open-sans text-white text-lg mb-3">Turn your unused tickets into cash</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 pb-2 text-white hover:text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            {/* Button */}
            <button 
            className="font-poppins bg-white text-[#8ACDD7] px-6 py-3 rounded-full font-semibold flex items-center hover:translate-x-3 transition ease-in-out delay-150 duration-300 hover:shadow-2xl hover:ring-2 hover:ring-[#8ACDD7] "
            onClick={() => handleClick('makeSome')}
            >
              Make some money
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-2 mr-0 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Section 2 */}
          <div className="bg-[#8ACDD7] w-1/2 pt-52 pb-36  flex flex-col justify-center items-center">
            {/* Headline */}
            <h1 className="font-montserrat text-6xl text-white font-bold mb-4">Buy</h1>
            {/* Sub-Headline */}
            <div className="flex items-center">
              <p className="font-open-sans text-white text-lg mb-3">Find last-minute tickets at great prices</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 pb-2 text-white hover:text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            {/* Button */}
            <button 
            className="bg-white text-[#FF6F61] px-6 py-3 rounded-full font-semibold flex items-center hover:translate-x-3 transition ease-in-out delay-150 duration-300 hover:shadow-2xl hover:ring-2 hover:ring-[#FF6F61]"
            onClick={() => { handleClick('seeWhat'); navigate("/listEvent"); }}
            >
              See what's out there
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-2 mr-0 text-current " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* EVENT CARDS */}
        <div className=" w-screen pt-20">
          <h1 className="text-5xl text-center font-bold">Popular Events</h1>
          <h4 className="text-center py-2 text-[18px]">Don’t miss out on your favorite events</h4>

          {/* Card-Container */}
          <div className="w-full h-fit flex flex-row justify-center items-center py-5">
            <div className="relative w-[90%] max-w-screen-xl h-fit mx-auto">
              {/* Card */}
              <Slider {...settings} className="flex justify-center items-center">
                {events.map((ev) => (
                  <div key={ev.id} className="bg-[#F4F4F4] w-80 h-fit rounded-lg shadow-md hover:shadow-2xl transition duration-300 group cursor-pointer">
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
                      <h3 className="font-bold text-xl text-ellipsis whitespace-nowrap overflow-hidden">{ev.name}</h3>
                      <p className="text-sm">{ev.location}</p>
                      {/* Card-Quantity */}
                      <div className="flex justify-center">
                        <div className="my-2 px-2 py-1 bg-[#8ACDD7] rounded-2xl flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
                          </svg>
                          <p className="text-white">{ev.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          {/* Button */}
          <div className="flex justify-center pb-2 pt-4">
            <button 
            className="outline outline-2 rounded-sm text-[#8ACDD7] font-medium text-lg px-6 py-3 mx-auto hover:bg-[#8ACDD7] hover:text-white"
            onClick={() => { handleClick('viewMore'); navigate("/listEvent"); }}
            >
              View More
            </button>
          </div>
        </div>
        
        {/* HERO-SECTION */}
        <div className="w-screen h-[70vh] flex justify-center overflow-hidden pt-20">
          {/* Hero-Img */}
          <div 
          className="relative bg-cover bg-center w-full" 
          style={{ backgroundImage: 'url(https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg)', backgroundAttachment: 'fixed'}}
          >
            {/* Overlay màu tối */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Hero-Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
              <h1 className="text-4xl mb-4 font-bold">Can’t Attend? Sell Your Tickets Instantly – Safe and Easy!</h1>
              <div className="w-1/2">
                <p className="mb-8 text-[18px]">Don't let your tickets go to waste! Festix provides a fast and secure way to resell your tickets in just a few clicks,
                ensuring peace of mind with every transaction.</p>
              </div>
              <button 
              className="px-6 py-3 text-lg font-medium bg-transparent rounded-sm border border-white hover:bg-white hover:text-[#FF6F61] transition"
              onClick={() => handleClick('sellNow')}
              >
              Sell Now
              </button>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="w-screen pt-20">
          <h1 className="text-5xl font-bold text-center">Who We Are</h1>

          {/* 3 Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pt-3">
            {/* Column 1 */}
            <div className="p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clip-rule="evenodd" />
                <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
              </svg>
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">Mission</h2>
              <p className="text-gray-600 text-lg">
                Bringing unforgettable event experiences. We believe that every ticket is not just
                an entry pass, but a chance for you to participate and enjoy unforgettable moments.
              </p>
            </div>

            {/* Column 2 */}
            <div className="p-6 text-center">
              <img src={commitent} alt="Commitent" className="w-16 h-[48px] mx-auto"/>
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">Commitment</h2>
              <p className="text-gray-600 text-lg">
                Ensuring genuine tickets and competitive pricing. We are committed to providing
                legitimate tickets, transparent transactions, and delivering the best value for
                our customers.
              </p>
            </div>

            {/* Column 3 */}
            <div className="p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>
              <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Team</h2>
              <p className="text-gray-600 text-lg">
                A professional and dedicated team. With experienced professionals, we are always
                ready to assist you in finding tickets, answering inquiries, and providing the
                best service possible.
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button 
            className="bg-[#8ACDD7] text-white text-lg px-6 py-3 font-medium rounded-sm hover:bg-[#FF7878]"
            onClick={() => handleClick('ourStory')}
            >
              Our Story
            </button>
          </div>
        </div>

        {/* HELP CENTER */}
        <div className="flex h-[60%] bg-black overflow-hidden mt-20">
          {/* Content */}
          <div className="w-2/5 text-white p-32 flex items-center justify-center flex-col">        
            <h2 className="text-4xl font-bold mb-6">
              Need Help? Check Out Our Help Center
            </h2>
            <p className="text-lg mb-6">
            Explore our Help Center for quick solutions, step-by-step guides, and personalized support to keep you moving forward.
            </p>
            <button 
            className="bg-transparent text-white font-medium py-2 px-4 rounded-sm border border-white self-start hover:bg-white hover:text-[#FF6F61] transition"
            onClick={() => handleClick('helpCenter')}
            >
              Go to Help Center
            </button>  
          </div>

          {/* Img */}     
          <div className="w-3/5 transform skew-x-12 translate-x-12">
            <img
              src={helpCenter}
              alt="Help Center"
              className="object-cover w-full h-full"
            />
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

export default MainScreen;