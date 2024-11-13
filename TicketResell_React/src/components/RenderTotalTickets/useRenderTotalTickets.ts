import axios from "axios";
import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

type Ticket = {
  ticketId: string;
  ticketName: string;
  quantity: number;
  price: number;
  originPrice: number;
  images: string[];
  userId: string;
  type?: string;
  section?: string;
  row?: number;
  description?: string;
  status: string;
  eventId: string;
  createAt: Date;
  updateAt?: Date;
};

type Event = {
  eventTime: string;
  location: string;
  city: string;
};

const useRenderTotalTickets = (tickets: Ticket[]) => {
    const navigate: NavigateFunction = useNavigate();


    const [events, setEvents] = useState<{ [key: string]: Event | null }>({});

    useEffect(() => {
      const fetchAllEvents = async () => {
        const eventsData: { [key: string]: Event | null } = {};
        for (const ticket of tickets) {
          const eventData = await fetchEvent(ticket);
          eventsData[ticket.ticketId] = eventData;
        }
        setEvents(eventsData);
      };
      fetchAllEvents();
    }, [tickets]);

    // Helper function to fetch event data
const fetchEvent = async (ticket: Ticket): Promise<Event | null> => {
  try {
    const response = await axios.get<Event>(`/api/Event/${ticket.eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
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
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Smooth scrolling effect
      });
    };

    return {
      navigate,
      visibleTickets,
      isExpanded,
      formatCurrency,
      handleShowMore,
      handleShowLess,
      events,
      formattedDateTime,
    };
  };

export default useRenderTotalTickets;