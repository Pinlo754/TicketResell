import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useManageEventScreen = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  type Event = {
    eventId?: string;
    eventName: string;
    eventImage?: string;
    eventTime: string;
    location: string;
    city: string;
    eventStatus?: string;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("/api/Event/list-event")
      .then((response) => {
        const events: Event[] = response.data;
        setEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSaveEvent = (event: Event) => {
    if (event.eventId) {
      // Update existing event
      axios.put(`/api/Event/update-event/${event.eventId}`, event).then(fetchEvents);
    } else {
      // Create new event
      axios.post("/api/Event/create-event", event).then(fetchEvents);
    }
  };

  const handleManageTickets = () => {
    navigate(`/manage-tickets/`);
  };

  
  const openModal = (event: any = null) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    handleSaveEvent(selectedEvent); // Gọi hàm để lưu sự kiện
    closeModal();
  };

  return {
    events,
    handleSaveEvent,
    handleManageTickets,
    isModalOpen,
    selectedEvent,
    setSelectedEvent,
    openModal,
    closeModal,
    handleSave,
  };
};

export default useManageEventScreen;