import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

const useTicketDetail = () => {
  const navigate: NavigateFunction = useNavigate();
  const { ticketId } = useParams<{ ticketId: string }>();
  const {eventId} = useParams<{ eventId: string }>();

  type Comment = {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    date: string;
    time: string;
    comment: string;
  };

  const comments: Comment[] = [
    {
      id: 1,
      name: "Martin Luather",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 3,
      date: "28/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      name: "John Doe",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "31/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 3,
      name: "Jane Smith",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "25/05/2004",
      time: "07:45 AM",
      comment:
        "It has survived not only five centuries, but also the leap into electronic typesetting.",
    },
    {
      id: 4,
      name: "Martin Luather",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 3,
      date: "28/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 5,
      name: "John Doe",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "31/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 6,
      name: "Jane Smith",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "25/05/2004",
      time: "07:45 AM",
      comment:
        "It has survived not only five centuries, but also the leap into electronic typesetting.",
    },
    {
      id: 7,
      name: "Martin Luather",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 3,
      date: "28/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 8,
      name: "John Doe",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "31/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
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

  const [event, setEvent] = useState<Event>();
  const [ticket, setTicket] = useState<Ticket>({
    ticketId: "TICKET_001",                // ID vé
    ticketName: "Concert Ticket",           // Tên vé
    quantity: 100,                          // Số lượng vé có sẵn
    price: 50.00,                           // Giá vé
    originPrice: 75.00,                     // Giá gốc
    images: ["image1.jpg", "image2.jpg"],  // Hình ảnh vé
    userId: "USER_001",                     // ID người dùng
    type: "VIP",                            // Loại vé
    section: "A",                           // Khu vực ngồi
    row: 1,                                 // Hàng
    description: "This is a VIP ticket for the concert.", // Mô tả vé
    status: "Available",                    // Trạng thái vé
    eventId: "EVENT_001",                   // ID sự kiện liên quan
    createAt: new Date(),                   // Thời gian tạo vé
    updateAt: new Date()                    // Thời gian cập nhật vé
});
  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
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

  const fetchTickets = () => {
    axios
      .get("/api/Ticket/get-ticket/" + ticketId)
      .then((response) => {
        const ticket = response.data;
        setTicket(ticket);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Rating
  const totalRating = comments.reduce(
    (acc, comment) => acc + comment.rating,
    0
  );
  const averageRating = (totalRating / comments.length).toFixed(1); // Tính trung bình rating

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("vi-VN");
  };

  // State để quản lý số lượng vé hiện tại
  const [quantity, setQuantity] = useState(1); // Bắt đầu với 1

  // Hàm để giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Hàm để tăng số lượng
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return {
    navigate,
    event,
    formatCurrency,
    totalRating,
    averageRating,
    comments,
    ticket,
    quantity,
    decreaseQuantity,
    increaseQuantity,
    fetchTickets,
    setTicket,
  };
};

export default useTicketDetail;
