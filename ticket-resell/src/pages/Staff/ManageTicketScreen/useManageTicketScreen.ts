import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const useManageTicketScreen = () => {
  const [event, setEvent] = useState<Event>();
  const { eventId } = useParams<{ eventId: string }>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [sellerName, setSellerName] = useState<string>("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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
    eventId: string;
    createAt: Date;
    updateAt?: Date;
  };

  useEffect(() => {
    fetchEvent();
    fetchTickets();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/api/Event/${eventId}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `/api/Ticket/get-tickets-by-event/${eventId}`
      );
      const tickets: Ticket[] = response.data;
      setTickets(tickets);

      // Fetch user details for each ticket
        tickets.map(async (ticket) => {
            fetchUserNameById(ticket);
        }
      );

    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchUserNameById = async (ticket: Ticket) => {
    try {
      const userResponse = await axios.get(`/api/Account/user-information/${ticket.userId}`);
      const firstName = userResponse.data.firstName;
      const lastName = userResponse.data.lastName;
      setSellerName(`${firstName} ${lastName}`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSaveTicketStatus = async (ticket: Ticket) => {
    try {
      const response = await axios.put(`/api/Ticket/update-ticket/${ticket.ticketId}`, ticket);
      if (response.status === 200) {
        alert("Trạng thái của vé cập nhật thành công!");
        closeModal();
        fetchTickets(); // Refresh tickets to show updated status
      }
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };  

  // Hàm mở modal chi tiết vé
  const openTicketDetailModal = (ticket: any = null) => {
    setSelectedTicket(ticket);
    fetchUserNameById(ticket);
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  return {
    navigate,
    sellerName,
    tickets,
    event,
    selectedTicket,
    setSelectedTicket,
    isModalOpen,
    handleSaveTicketStatus,
    openTicketDetailModal,
    closeModal,
  };
};

export default useManageTicketScreen;