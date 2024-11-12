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
      };

      const tickets: Ticket[] = [
        {
          ticketId: "T12345",
          ticketName: "Concert A - VIP Ticket",
          quantity: 2,
          price: 150,
          originPrice: 200,
          images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
          userId: "U56789",
          type: "Seat",
          section: "A",
          row: 1,
          description: "VIP seating with complimentary drinks",
          status: "Available",
          event: {
            eventId: "E123",
            eventName: "Concert A",
            eventImage: "https://example.com/event1.jpg",
            eventTime: "2024-10-25T18:00:00Z",
            location: "Theater A",
            city: "City A",
            eventStatus: "Running",
          },
          createAt: new Date("2024-11-01T10:00:00Z"),
          updateAt: new Date("2024-11-05T10:00:00Z"),
        },
        {
          ticketId: "T67890",
          ticketName: "Football Match - Standard Ticket",
          quantity: 4,
          price: 50,
          originPrice: 75,
          images: ["https://example.com/image3.jpg"],
          userId: "U98765",
          type: "Stand",
          section: "B",
          description: "Standard seating with good view of the field",
          status: "Sold",
          event: {
            eventId: "E456",
            eventName: "Football Match",
            eventImage: "https://example.com/event2.jpg",
            eventTime: "2024-10-20T14:00:00Z",
            location: "Stadium A",
            city: "City B",
            eventStatus: "Canceled",
          },
          createAt: new Date("2024-10-20T15:00:00Z"),
        },
        {
          ticketId: "T11121",
          ticketName: "Theater Play - Balcony Ticket",
          quantity: 1,
          price: 80,
          originPrice: 100,
          images: ["https://example.com/image4.jpg", "https://example.com/image5.jpg"],
          userId: "U54321",
          type: "Seat",
          section: "C",
          row: 5,
          description: "Balcony seating with great view of the stage",
          status: "Canceled",
          event: {
            eventId: "E789",
            eventName: "Theater Play",
            eventImage: "https://example.com/event3.jpg",
            eventTime: "2024-10-25T16:00:00Z",
            location: "Theater B",
            city: "City C",
            eventStatus: "Completed",
          },
          createAt: new Date("2024-11-02T19:00:00Z"),
          updateAt: new Date("2024-11-08T19:00:00Z"),
        },
        {
          ticketId: "T14151",
          ticketName: "Comedy Show - General Admission",
          quantity: 3,
          price: 40,
          originPrice: 60,
          images: ["https://example.com/image6.jpg"],
          type: "Stand",
          userId: "U13579",
          status: "Pending",
          event: {
            eventId: "E246",
            eventName: "Comedy Show",
            eventImage: "https://example.com/event4.jpg",
            eventTime: "2024-10-22T17:00:00Z",
            location: "Comedy Theater",
            city: "City D",
            eventStatus: "Running",
          },
          createAt: new Date("2024-11-03T20:00:00Z"),
        }
      ];      

  // const [tickets, setTickets] = useState<Ticket[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [priceChanged, setPriceChanged] = useState(false);
  
  /*
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
  */

  // Hàm mở modal chi tiết vé
  const openTicketDetailModal = (ticket: any = null) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    if (selectedTicket) {
      if (priceChanged) {
        const confirmClose = window.confirm(
          "Bạn có chắc chắn muốn cập nhật giá bán?"
        );
        if (!confirmClose) return;
        updateTicket(selectedTicket);
      }
      setPriceChanged(false); // Reset flag
      setIsModalOpen(false);
      setSelectedTicket(null);
    }
  };

  const updateTicket = async (ticket: Ticket) => {
    try {
      const response = await axios.put(`/api/Ticket/update-ticket/${ticket.ticketId}`, ticket);
      if (response.status === 200) {
        alert("Cập nhật vé thành công!");
        // Lấy dữ liệu vé mới
        setPriceChanged(false); // Reset flag
        closeModal(); // Đóng modal
        //fetchTickets();
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