import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { removeVietnameseTones } from '../../components/Search/useSearch';
import upload from "../../lib/upload";
import axios from 'axios';

type TicketInfo = {
  ticketId: string;
  ticketName: string,
  type: string;
  section: string;
  row: number;
  quantity: number;
  originPrice: number;
  price: number;
  images: File[];
  description: string;
  status: string;
  createAt: string;
  updateAt: string
};


export type Event = {
  eventId: string;
  eventName: string;
  eventImage: string;
  eventTime: string;
  location: string;
  city: string;
  eventStatus: string;
};

const useSellScreen = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [events, setEvents] = useState<Event[]>([]);
  const { eventId } = useParams<{ eventId: string }>();
  const [imagesURL, setImagesURL] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [ticketInfo, setTicketInfo] = useState<TicketInfo>({
    ticketId: "",
    ticketName: "",
    type: "",
    section: "",
    row: 0,
    quantity: 0,
    originPrice: 0,
    price: 0,
    images: [],
    description: "",
    status: "pending",
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  });

  const [showRow, setShowRow] = useState<boolean>(false);

  useEffect(() => {
    if (token !== null && userId !== null) {
      if (eventId) {
        fetchEvent();
      } else {
        fetchEvents();
      }
    } else {
      navigate("/");
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/api/Event/${eventId}`);
      setSelectedEvent(response.data);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/Event/list-event');
      const events: Event[] = response.data;
      const activeEvents = events.filter(event => event.eventStatus === 'Ongoing');
      setEvents(activeEvents);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEventSelect = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eventFilter = (event: Event, query: string) => {
    const normalizedEventName = removeVietnameseTones(event.eventName.toLowerCase());
    return normalizedEventName.includes(query);
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, 2));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleTicketInfoChange = (
    field: keyof TicketInfo,
    value: string | number | File[]
  ) => {
    setTicketInfo((prev) => ({ ...prev, [field]: value, updateAt: new Date().toISOString(), }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Kiểm tra trùng lặp trước khi tải lên
    const uniqueFiles = files.filter((file, index, self) => {
      const isDuplicate = self.findIndex(f => f.name === file.name) !== index;
      if (isDuplicate) {
        alert("Có ảnh bị trùng!");
        return false;
      }
      return true;
    });
  
    const uploadedUrls: string[] = []; // Mảng để lưu các URL của ảnh đã tải lên
    
    // Duyệt qua từng file và tải lên
    for (const file of uniqueFiles) {
      try {
        const fileUrl = await upload(file); // Tải từng file và lấy URL
        uploadedUrls.push(fileUrl); // Thêm URL vào mảng
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    
    setImagesURL(uploadedUrls);
  };
  

  const handleSubmit = () => {
  
    if (
      !ticketInfo.ticketName ||
      !ticketInfo.type ||
      !ticketInfo.section ||
      (showRow && !ticketInfo.row) || // Kiểm tra hàng nếu loại vé là "Ngồi"
      !ticketInfo.quantity ||
      !ticketInfo.originPrice ||
      !ticketInfo.price ||
      imagesURL.length === 0
    ) {
      alert("Vui lòng điền đầy đủ thông tin vé!");
      return;
    }

    // Kiểm tra số lượng file tải lên phải bằng số lượng vé
    if (imagesURL.length !== ticketInfo.quantity) {
      alert("Số lượng ảnh tải lên phải bằng số lượng vé!");
      return;
    }

    handleSubmitInfo();
  };

  const handleSubmitInfo = async () => {
    try {
      const response = await axios.post("/api/Ticket/create-ticket", {
        ticketId: ticketInfo.ticketId,
        ticketName: ticketInfo.ticketName,
        quantity: ticketInfo.quantity,
        price: ticketInfo.price,
        originPrice: ticketInfo.originPrice,
        images: imagesURL,
        userId: userId,
        type: ticketInfo.type,
        section: ticketInfo.section,
        row: ticketInfo.row,
        description: ticketInfo.description,
        eventId: selectedEvent?.eventId,
        status: "Pending",
        createAt: ticketInfo.createAt,
        updateAt: ticketInfo.updateAt,
      });
  
      if (response.data.ticketId) { 
        alert("Đăng bán vé thành công!");
        navigate("/main");
      }
    } catch (error: any) {
      console.error("handleSubmitInfo error:", error);
    }
  };
  
  
  
    
 // Hàm định dạng tiền tệ
 const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN');
};

  return {
    events,
    setEvents,
    eventId,
    navigate,
    step,
    setStep,
    selectedEvent,
    setSelectedEvent,
    handleEventSelect,
    eventFilter,
    ticketInfo,
    showRow,
    setShowRow,
    goNext,
    goBack,
    handleTicketInfoChange,
    handleImageUpload,
    handleSubmit,
    formatCurrency,
  };
};

export default useSellScreen;