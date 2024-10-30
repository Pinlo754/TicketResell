import axios from "axios";
import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

const useEventDetail = () => {
  const navigate: NavigateFunction = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();

  type SortOption = {
    label: string;
    value: string;
  };

  const sortOptions: SortOption[] = [
    { label: "First listed", value: "first" },
    { label: "Latest listed", value: "latest" },
    { label: "Price (Low to High)", value: "price_low" },
    { label: "Price (High to Low)", value: "price_high" },
  ];

  // Ticket and Event Types
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
    eventId: string;
    eventName: string;
    eventImage: string;
    eventTime: string;
    location: string;
    city: string;
    eventStatus: string;
  };

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [event, setEvent] = useState<Event>();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

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
      const response = await axios.get("/api/Ticket/list-ticket");
      const tickets: Ticket[] = response.data;
      const activeTickets = tickets.filter((ticket) => ticket.eventId === eventId);
      setTickets(activeTickets);

      // Initialize quantities based on tickets fetched from database
      const initialQuantities: Record<string, number> = {};
      activeTickets.forEach((ticket) => {
        initialQuantities[ticket.ticketId] = 1; // Set each ticket's initial quantity to 1
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Increase ticket quantity
  const handleIncrease = (ticketId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketId]: Math.min(
        prevQuantities[ticketId] + 1,
        tickets.find((ticket) => ticket.ticketId === ticketId)?.quantity || 1
      ),
    }));
  };

  // Decrease ticket quantity
  const handleDecrease = (ticketId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketId]: Math.max(prevQuantities[ticketId] - 1, 1),
    }));
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("vi-VN");
  };

  return {
    navigate,
    event,
    tickets,
    quantities,
    handleIncrease,
    handleDecrease,
    sortOptions,
    formatCurrency,
  };
};

export default useEventDetail;