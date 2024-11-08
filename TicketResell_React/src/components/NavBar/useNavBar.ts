import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const useNavBar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvt, setUserAvt] = useState();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (token !== null && userId !== null) {
        setIsLoggedIn(true);
        fetchUserInfo(userId);
    }
  }, []); 

  const fetchUserInfo = async (userId: string) => {
    try {
      const response = await axios.get(
        `/api/Account/user-information/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  return {
    navigate,
    isLoggedIn,
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    userAvt,
    handleLogout,
    };
}

export default useNavBar;