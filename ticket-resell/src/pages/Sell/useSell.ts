import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeVietnameseTones } from '../../components/Search/useSearch';

interface TicketInfo {
  type: string;
  section: string;
  row?: string;
  quantity: number;
  price: number;
  images: File[];
}

export interface Event {
  name: string;
  date: string;
  time: string;
  location: string;
}

// Giả lập danh sách sự kiện từ database
const mockEvents: Event[] = [
  { name: "Sự kiện bóng đá", date: "25/10/2024", time: "18:00", location: "Sân vận động" },
  { name: "Sự kiện âm nhạc", date: "30/10/2024", time: "20:00", location: "Nhà hát thành phố" },
];

const useSell = () => {
  const navigate = useNavigate();
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

  const handleEventSelect = (event: Event) => {
    console.log("Selected event:", event);
  };

  const eventFilter = (event: Event, query: string) => {
    const normalizedEventName = removeVietnameseTones(event.name.toLowerCase());
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
    mockEvents,
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

export default useSell;