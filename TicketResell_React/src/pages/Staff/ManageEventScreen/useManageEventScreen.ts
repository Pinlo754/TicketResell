import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import upload from "../../../lib/upload";
import { toast } from "react-toastify";

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

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`/api/Event/list-event`);
      const events: Event[] = response.data;
      setEvents(events);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching list event data!");
    }
  };

  const handleSaveEvent = (event: Event) => {
    if (event.eventId) {
      // Update existing event
      handleUpdateEvent(event);
    } else {
      handleCreateEvent(event);
    }
  };

  const handleUpdateEvent = async (event: Event) => {
    try {
      const response = await axios.put(`/api/Event/update-event/${event.eventId}`, event);
      if (response.status === 200) {
        toast.success("Cập nhật sự kiện thành công!");
        fetchEvents();
      }
    } catch (error) {
      console.error("handleUpdateEvent:", error);
      toast.error("Error updating event!");
    }
  };

  const handleCreateEvent = async (event: Event) => {
    try {
      const response = await axios.post("/api/Event/create-event", event);
      if (response.status === 201) {
        toast.success("Tạo sự kiện thành công!");
        fetchEvents();
      }
    } catch (error) {
      console.error("handleCreateEvent:", error);
      toast.error("Error creating event!");
    }
  };

  const openModal = (event: any = null) => {
    setSelectedEvent(event || { eventImage: '', eventName: '', eventTime: '', location: '', city: '', eventStatus: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {

    // Kiểm tra nếu các trường bắt buộc còn trống
  if (!selectedEvent.eventName || !selectedEvent.eventImage || !selectedEvent.location || !selectedEvent.city || !selectedEvent.eventStatus) {
    alert("Vui lòng nhập đầy đủ thông tin sự kiện!");
    return;
  }
  
  // Kiểm tra nếu `eventTime` trống và để server tự lấy giá trị hiện tại
  const eventToSave = { ...selectedEvent };
  if (!eventToSave.eventTime) {
    delete eventToSave.eventTime;
  }

    handleSaveEvent(selectedEvent); // Gọi hàm để lưu sự kiện
    closeModal();
  };

  const sendImage= async(e: React.ChangeEvent<HTMLInputElement>) =>{
    try {
      const file = e.target.files?.[0];
      if (file) {
        const fileUrl = await upload(file);
        setSelectedEvent({
          ...selectedEvent,
          eventImage: fileUrl,
        })
      }
    } catch (error) {
      console.error("sendImage", error);
      toast.error("can't upload image right now")
    }
  }

  return {
    navigate,
    events,
    handleSaveEvent,
    isModalOpen,
    selectedEvent,
    setSelectedEvent,
    openModal,
    closeModal,
    handleSave,
    sendImage,
  };
};

export default useManageEventScreen;