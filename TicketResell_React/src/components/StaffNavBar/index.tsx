import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo_festix.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";


const StaffNavBar = () => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvt, setUserAvt] = useState();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token !== null && userId !== null) {
        setIsLoggedIn(true);
        fetchUserInfo(userId);
    }
  }, []); 

  const fetchUserInfo = async (userId: string) => {
    try {
      const response = await axios.get(`/api/Account/user-information/${userId}`);
      const data = response.data;
      setUserAvt(data.userImage);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Đóng menu khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <div className="w-screen">
      <nav className="fixed top-0 left-0 w-full bg-black/50 p-4 z-50 backdrop-blur-lg">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Festix"
              className="w-8 h-12 mr-3 cursor-pointer"
              onClick={() => navigate("/main")}
            />
            <h1
              className="text-white text-3xl font-bold hover:text-gray-300 cursor-pointer"
              onClick={() => navigate("/main")}
            >
              Festix
            </h1>
          </div>
          {/* Menu */}
          <ul className="flex space-x-6">
            <li
              className="text-white text-lg hover:text-gray-300 cursor-pointer"
              onClick={() => navigate("/staff/main")}
            >
              Trang chủ
            </li>
            <li
              className="text-white text-lg hover:text-gray-300 cursor-pointer"
              onClick={() => navigate("/staff/events")}
            >
              Quản lý sự kiện
            </li>

            {/* Search 
            <li className="text-white">
              <div className="relative bg-white/40 backdrop-blur rounded-lg px-3 py-1 flex items-center hover:bg-white/45">
                <div className="absolute left-2 pointer-events-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 3a7.5 7.5 0 015.775 12.425l5.35 5.35a.75.75 0 11-1.06 1.06l-5.35-5.35A7.5 7.5 0 1110.5 3zm0 1.5a6 6 0 100 12 6 6 0 000-12z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-6 pr-3 text-current bg-transparent outline-none w-full placeholder-white caret-gray-400 focus:text-white"
                />
              </div>
            </li>
            */}

            {/* Notification */}
            <li className="text-white hover:text-gray-300 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </li>
            

            {/* Chat */}
            <li className="text-white hover:text-gray-300 cursor-pointer">
              <svg
                onClick={() => navigate("/chat")}
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </li>

            {/* Cart */}
            <li className="text-white hover:text-gray-300 cursor-pointer">
              <svg
                onClick={() => navigate("/cart")}
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </li>

            {/* Q&A 
            <li className="text-white hover:text-gray-300 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
            </li>
            */}

            {/* Sell */}
            <button 
            className="text-white py-1 px-2 border rounded-lg hover:text-gray-300 hover:border-gray-300 "
            onClick={() => navigate("/sell")}
            >
              Bán vé
            </button>

            {/* Login/ Avt User */}
            {isLoggedIn ? (
               <div 
               className="relative"
               ref={menuRef}
               >
                    <div
                        className="overflow-hidden rounded-full cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {userAvt === null ? (
                        <img
                        src="https://static.vecteezy.com/system/resources/previews/007/409/974/non_2x/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-line-style-user-icon-set-vector.jpg"
                        alt="User Avt"
                        className="object-cover w-9 h-9 hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <img
                        src={userAvt}
                        alt="User Avt"
                        className="object-cover w-9 h-9 hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>
            
                    {isMenuOpen && (
                        <div
                        className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-10"
                        >
                        <ul className="text-gray-700">
                            <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/profile");
                            }}
                            >
                            Tài khoản
                            </li>
                            <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setIsMenuOpen(false);
                                handleLogout();
                            }}
                            >
                            Đăng xuất
                            </li>
                        </ul>
                    </div>
                    )}
                </div>
            ) : (
              <li
                className="text-white text-lg hover:text-gray-300 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Đăng nhập
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default StaffNavBar;