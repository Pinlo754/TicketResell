import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate, useParams  } from "react-router-dom";



const useEventDetail = () => {
    const navigate: NavigateFunction = useNavigate();
    const { eventId } = useParams<{ eventId: string }>();

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
    }
    
      const [tickets, setTickets] = useState<Ticket[]>([]);

      useEffect(() => {
        fetchTickets();
      }, []);

      const fetchTickets = () => {
        axios.get('/api/Ticket/list-ticket')
          .then(response => {
            const tickets: Ticket[] = response.data;
            const activeTickets = tickets.filter(ticket =>ticket.eventId === eventId);
            setTickets(activeTickets);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };


      // Tạo state để lưu số lượng cho từng ticket
      const [quantities, setQuantities] = useState<Record<string, number>>(() => {
       // Khởi tạo state số lượng bằng cách lấy ticket.id làm key, mỗi vé bắt đầu với số lượng là 1
       const initialQuantities: Record<string, number> = {};
       tickets.forEach(ticket => {
         initialQuantities[ticket.ticketId] = 1;
       });
       return initialQuantities;
     });
   
     // Hàm xử lý tăng số lượng cho vé với ticketId tương ứng
     const handleIncrease = (ticketId: string) => {
       setQuantities(prevQuantities => ({
         ...prevQuantities,
         [ticketId]: Math.min(prevQuantities[ticketId] + 1, tickets.find(ticket => ticket.ticketId === ticketId)?.quantity || 1),
       }));
     };
   
     // Hàm xử lý giảm số lượng cho vé với ticketId tương ứng
     const handleDecrease = (ticketId: string) => {
       setQuantities(prevQuantities => ({
         ...prevQuantities,
         [ticketId]: Math.max(prevQuantities[ticketId] - 1, 1),
       }));
     };
   
     // Hàm định dạng tiền tệ
       const formatCurrency = (amount: number): string => {
       return amount.toLocaleString('vi-VN');
     };
       
    return {
        navigate,
        tickets,
        quantities,
        handleIncrease,
        handleDecrease,
        sortOptions,
        formatCurrency,
    };
}

export default useEventDetail;