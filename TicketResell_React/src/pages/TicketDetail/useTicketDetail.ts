import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

const useTicketDetail = () => {
  const navigate: NavigateFunction = useNavigate();
  const { ticketId } = useParams<{ ticketId: string }>();
  const [user, setUser] = useState<User>({
    id: "1",
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    firstName: "John",
    lastName: "Doe",
    bio: "Software developer with a passion for creating innovative solutions.",
    address: "1234 Elm Street, Springfield, USA",
    email: "johndoe@example.com",
    gender: "Male",
  });
  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [chatData, setChatData] = useState<ChatData[]>([]);

  type User = {
    id: string;
    userImage: string;
    firstName: string;
    lastName: string;
    bio: string;
    address: string;
    email: string;
    gender: string;
  };

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

  const [ticket, setTicket] = useState<Ticket>({
    ticketId: "TICKET_001", // ID vé
    ticketName: "Concert Ticket", // Tên vé
    quantity: 100, // Số lượng vé có sẵn
    price: 50.0, // Giá vé
    originPrice: 75.0, // Giá gốc
    images: ["image1.jpg", "image2.jpg"], // Hình ảnh vé
    userId: "USER_001", // ID người dùng
    type: "VIP", // Loại vé
    section: "A", // Khu vực ngồi
    row: 1, // Hàng
    description: "This is a VIP ticket for the concert.", // Mô tả vé
    status: "Available", // Trạng thái vé
    eventId: "EVENT_001", // ID sự kiện liên quan
    createAt: new Date(), // Thời gian tạo vé
    updateAt: new Date(), // Thời gian cập nhật vé
  });  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ticket
        const ticketResponse = await axios.get("/api/Ticket/get-ticket/" + ticketId);
        const ticketData = ticketResponse.data;
        setTicket(ticketData);
  
        // Fetch user (chỉ gọi khi ticket có userId)
        if (ticketData.userId) {
          const userResponse = await axios.get("/api/Account/user-information/" + ticketData.userId);
          setUser(userResponse.data);
        }
  
        // Fetch event (chỉ gọi khi ticket có eventId)
        if (ticketData.eventId) {
          const eventResponse = await axios.get("/api/Event/" + ticketData.eventId);
          setEventName(eventResponse.data.eventName);
          setEventImage(eventResponse.data.eventImage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData(); // Gọi hàm fetchData ngay khi component mount
  }, []); // Dependency array rỗng để chỉ chạy một lần khi trang load
  

  const fetchTickets = () => {
    axios
      .get("/api/Ticket/get-ticket/" + ticketId)
      .then((response) => {
        console.log(response.data);        
        const ticket = response.data;
        setTicket(ticket);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };


  const [messageId, setMessageId] = useState("");
  const PostMessage = () => {
    axios
      .post("/api/Chat/post-message")
      .then((response) => {
        console.log(response.data); 
        setMessageId(response.data.messageId);
      })
      .catch((error) => {
        console.error("Error Post Message:", error);
      });
  };

  const currentUserId = localStorage.getItem("userId");

  const HandleAddChat = () => {
    axios
      .put(`/api/Chat/update-chat/`, {
        seUserId: currentUserId,
        chatData: [
          {
            id: 0,
            lastMessage: "",
            messageId: messageId,
            messageSeen: false,
            reUserId: ticket.userId,
            updatedAt: new Date().toISOString(),
          },
        ],
      })
      .then((response) => {
        console.log("Success:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .put(`/api/Chat/update-chat/`, {
        seUserId: ticket.userId,
        chatData: [
          {
            id: 0,
            lastMessage: "",
            messageId: messageId,
            messageSeen: false,
            reUserId: currentUserId,
            updatedAt: new Date().toISOString(),
          },
        ],
      })
      .then((response) => {
        console.log("Success:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  type ChatData = {
    id: number;
    lastMessage: string;
    messageId: string;
    messageSeen: boolean;
    reUserId: string;
    updatedAt: string;
  };

  


  // Hàm checkReUserId sẽ kiểm tra sự tồn tại của reUserId trong mảng chatData
  const checkReUserId = (): boolean => {
    if (Array.isArray(chatData) && chatData.length > 0) {
      return chatData.some((chat) => chat.reUserId === ticket.userId);
    }
    return false; // Trả về false nếu chatData không phải là một mảng hoặc không có phần tử
  };

  const handleCheckReUserId = () => {
    if (checkReUserId()) {
      navigate("/chat");
    } else {
      PostMessage();
      HandleAddChat();
      navigate("/chat");
    }
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

  const AddToCart = () => {
    const dataItem = {
      cartId: "abc",
      userId: currentUserId,
      sellerId: user.id,
      sellerImage: user.userImage + "",
      firstName: user.firstName,
      lastName: user.lastName,
      ticketId: ticket.ticketId,
      ticketName: ticket.ticketName,
      ticketRow: ticket.row,
      ticketType: ticket.type,
      ticketSection: ticket.section,
      quantity: quantity,
      maxQuantity: ticket.quantity,
      price: ticket.price,
      eventName: eventName,
      eventImage: eventImage,
    };
    axios
      .post(`/api/Cart/add-cart`, dataItem)
      .then((response) => {
        console.log("Success:", response);
        navigate("/cart");
      })
      .catch((error) => {
        console.error("Error add to cart:", error);
        console.log("Sending data to cart:", dataItem);
      });


      interface SummaryCostProps {
        subtotal: number;
        totalQuantity: number;
        selectedItems: {
          ticketId: string;
          sellerName: string;
          quantity: number;
          sellerImg: string;
        };
      }
      
  };
  return {
    navigate,
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
    user,
    HandleAddChat,
    PostMessage,
    currentUserId,
    messageId,
    handleCheckReUserId,
    AddToCart,
    eventImage,
    eventName,
  };
};

export default useTicketDetail;
