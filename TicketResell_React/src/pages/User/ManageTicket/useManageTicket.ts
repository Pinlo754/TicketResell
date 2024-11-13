import axios from "axios";
import { useEffect, useState } from "react";

const useManageTicket = () => {

    type Event = {
        eventId?: string;
        eventName: string;
        eventImage?: string;
        eventTime: string;
        location: string;
        city: string;
        eventStatus?: string;
      };

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
        event: Event;
        createAt: Date;
        updateAt?: Date;
        eventId?: string;
      };


  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [priceChanged, setPriceChanged] = useState(false);
  const userId = localStorage.getItem("userId")
  useEffect(() => {
    fetchTicketList()
    }, []);

    
    const fetchTicketList = async () => {
      try {
        const response = await axios.get(`/api/Ticket/list-ticket/`);
        if(response.status === 200){
          const ticketList: Ticket[] = response.data;
          const ticketForUser = ticketList.filter(item => item.userId == userId)
          const ticketsWithEvents = await Promise.all(
            ticketForUser.map(async (ticket) => {
              if (ticket.eventId) {
                const eventResponse = await axios.get(`/api/Event/${ticket.eventId}`);
                ticket.event = eventResponse.data; // Gán dữ liệu event vào ticket
                const dateParam = ticket.event.eventTime
                console.log(dateParam);
                
                const utcDate = new Date(dateParam);
                const localDate = new Date(utcDate.getTime());
                const year = localDate.getFullYear();
                const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
                const day = String(localDate.getDate()).padStart(2, "0");
                const hours = String(localDate.getHours()).padStart(2, "0");
                const minutes = String(localDate.getMinutes()).padStart(2, "0");
                const seconds = String(localDate.getSeconds()).padStart(2, "0");
              // Ghép thành chuỗi định dạng dd/mm/yyyy hh:mm:ss
                const formattedDateTime = day+"/" +month+"/" + year+" "+hours+":"+minutes+":"+seconds;
                ticket.event.eventTime = formattedDateTime
              }
              return ticket;
            })
          );
          setTickets(ticketsWithEvents);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    
  // Hàm mở modal chi tiết vé
  const openTicketDetailModal = (ticket: any = null) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = async () => {
    if (selectedTicket && priceChanged) {
      const confirmClose = window.confirm("Bạn có chắc chắn muốn cập nhật giá bán?");
      
      if (confirmClose) {
        try {
          await updateTicket(selectedTicket);
          setIsModalOpen(false);
          setSelectedTicket(null);
          setPriceChanged(false);  
        } catch (error) {
          console.error("Error in closeModal:", error);
        }
      }
    } else {
      setIsModalOpen(false);
      setSelectedTicket(null);
      setPriceChanged(false);
    }
  };

  const updateTicket = async (ticket: Ticket) => {
    try {
      const response = await axios.put(`/api/Ticket/update-ticket/${ticket.ticketId}`, ticket);
      if (response.status === 200) {
        alert("Cập nhật vé thành công!");
        // Lấy dữ liệu vé mới
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

    return {
        tickets,
        isModalOpen,
        selectedTicket,
        setSelectedTicket,
        setIsModalOpen,
        openTicketDetailModal,
        closeModal,
        priceChanged,
        setPriceChanged,
    };
};

export default useManageTicket;