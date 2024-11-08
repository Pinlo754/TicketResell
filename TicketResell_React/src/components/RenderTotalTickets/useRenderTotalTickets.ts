import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

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

const useRenderTotalTickets = (tickets: Ticket[]) => {
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

    return {
      navigate,
      visibleTickets,
      isExpanded,
      formatCurrency,
      handleShowMore,
      handleShowLess,
    };
  };

export default useRenderTotalTickets;