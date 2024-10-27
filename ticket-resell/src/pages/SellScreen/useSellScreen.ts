import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { removeVietnameseTones } from '../../components/Search/useSearch';
import axios from 'axios';

interface TicketInfo {
  type: string;
  section: string;
  row?: string;
  quantity: number;
  price: number;
  images: File[];
}

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
  const [events, setEvents] = useState<Event[]>([]);
  const { evId } = useParams<{ evId?: string }>();
  const [step, setStep] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [ticketInfo, setTicketInfo] = useState<TicketInfo>({
    type: "",
    section: "",
    quantity: 0,
    price: 0,
    images: [],
  });

  const [showRow, setShowRow] = useState<boolean>(false);

  useEffect(() => {
    if (evId) {
      fetchEvent();
    } else {
      fetchEvents();
    }
  }, [evId]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`/api/Event/${evId}`);
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

  const goNext = () => {
    if (step === 1) {
      // Bước 1: Kiểm tra xem sự kiện đã được chọn chưa
      if (!selectedEvent) {
        alert("Vui lòng chọn sự kiện để bán vé.");
        return;
      }
      // Chuyển sang bước 2 nếu sự kiện đã được chọn
      setStep((prev) => Math.min(prev + 1, 2));
    } else if (step === 2) {
      // Bước 2: Kiểm tra các thông tin vé
      if (
        !ticketInfo.type ||
        !ticketInfo.section ||
        (showRow && !ticketInfo.row) || // Kiểm tra hàng nếu loại vé là "Ngồi"
        !ticketInfo.quantity ||
        !ticketInfo.price ||
        ticketInfo.images.length === 0
      ) {
        alert("Vui lòng điền đầy đủ thông tin vé!");
        return;
      }
      // Logic xử lý khi đủ thông tin ở bước 2
      // Ví dụ: Gửi thông tin vé lên server hoặc chuyển sang bước hoàn tất
      alert("Thông tin vé hợp lệ, tiến hành bán vé!");
    }
  };
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleTicketInfoChange = (
    field: keyof TicketInfo,
    value: string | number | File[]
  ) => {
    setTicketInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
  
    // Lọc bỏ các file không phải PDF
    const validPDFFiles = files.filter((file) => {
      if (file.type !== "application/pdf") {
        alert("Chỉ được phép tải file PDF!");
        return false; // Không nhận file không phải PDF
      }
      return true;
    });
  
    // Kiểm tra xem có file nào bị trùng không
    const uniqueFiles = validPDFFiles.filter((file, index, self) => {
      const isDuplicate = self.findIndex(f => f.name === file.name) !== index;
      if (isDuplicate) {
        alert("Có ảnh bị trùng!");
        return false; // Không nhận file bị trùng
      }
      return true;
    });
  
    // Cập nhật danh sách file nếu có file hợp lệ
    if (uniqueFiles.length > 0) {
      handleTicketInfoChange("images", uniqueFiles);
    }
  };
  

  const handleSubmit = () => {
    // Lấy danh sách file đã tải lên
    const files = ticketInfo.images;

    // Kiểm tra số lượng file tải lên phải bằng số lượng vé
    if (files.length !== ticketInfo.quantity) {
      alert("Số lượng ảnh tải lên phải bằng số lượng vé!");
      return;
    }
    alert("Đăng bán vé thành công!");
    navigate("/main");
  };
    
 // Hàm định dạng tiền tệ
 const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN');
};

  return {
    events,
    setEvents,
    evId,
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