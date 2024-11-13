import axios from "axios";
import { response } from "express";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

const useTicketDetail = () => {
  const navigate: NavigateFunction = useNavigate();
  const { ticketId } = useParams<{ ticketId: string }>();
  const [user, setUser] = useState<User>();
  const [eventName, setEventName] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const currentUserId = localStorage.getItem("userId");
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
    commentId: string;
    userId: string;
    user: {
      firstName: string;
      lastName: string;
      userImage: string;
    };
    rating: number;
    time: string;
    comment: string;
    toUserId: string;
  };

  // TICKET
  type Ticket = {
    ticketId: string;
    ticketName: string;
    quantity: number;
    price: number;
    originPrice: number;
    imagesQR: string[];
    imagesVerify: string[];
    userId: string;
    type?: string;
    section?: string;
    row?: number;
    seat?:number;
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
    imagesQR: ["image1.jpg", "image2.jpg"], // Hình ảnh vé
    imagesVerify: ["image1.jpg", "image2.jpg"],
    userId: "USER_001", // ID người dùng
    type: "VIP", // Loại vé
    section: "A", // Khu vực ngồi
    row: 1, // Hàng
    seat:1,
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
        const ticketResponse = await axios.get(
          "/api/Ticket/get-ticket/" + ticketId
        );
        const ticketData = ticketResponse.data;
        setTicket(ticketData);

        // Fetch user (chỉ gọi khi ticket có userId)
        if (ticketData.userId) {
          const userResponse = await axios.get(
            "/api/Account/user-information/" + ticketData.userId
          );
          setUser(userResponse.data);
        }

        if (currentUserId) {

          const chatResponse = await axios.get(
            "/api/Chat/get-chat/" + currentUserId
          );
          const data = chatResponse.data;
          setChatData(data[0].chatData);
        }

        // Fetch event (chỉ gọi khi ticket có eventId)
        if (ticketData.eventId) {
          const eventResponse = await axios.get(
            "/api/Event/" + ticketData.eventId
          );
          setEventName(eventResponse.data.eventName);
          setEventImage(eventResponse.data.eventImage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Gọi hàm fetchData ngay khi component mount
    fetchComments();
  }, []); // Dependency array rỗng để chỉ chạy một lần khi trang load

  const fetchTicket = () => {
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

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/Comment/list/${user?.id}`);
      const comments: Comment[] = response.data;
      const commentDetail = await Promise.all(
        comments.map(async (comment: Comment) => {
          const userResponse = await axios.get(
            `/api/Account/user-information/${comment.userId}`
          );
          const userData = userResponse.data;
          return {
            commentId: comment.commentId,
            userId: comment.userId,
            user: {
              firstName: userData.firstName,
              lastName: userData.lastName,
              userImage: userData.userImage,
            },
            rating: comment.rating,
            time: comment.time,
            comment: comment.comment,
            toUserId: user?.id ?? "",
          };
        })
      );
      setComments(commentDetail);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const [messageId, setMessageId] = useState("");

  const HandleAddChat = async () => {
    try {
      const postResponse = await axios.post("/api/Chat/post-message");
      const newMessageId = postResponse.data.messageId;
      await axios.put(`/api/Chat/update-chat/`, {
        seUserId: currentUserId,
        chatData: [
          {
            id: 0,
            lastMessage: "",
            messageId: newMessageId,
            messageSeen: false,
            reUserId: ticket.userId,
            updatedAt: new Date().toISOString(),
            chatSeUserId: currentUserId,
          },
        ],
      });
      await axios.put(`/api/Chat/update-chat/`, {
        seUserId: ticket.userId,
        chatData: [
          {
            id: 0,
            lastMessage: "",
            messageId: newMessageId,
            messageSeen: false,
            reUserId: currentUserId,
            updatedAt: new Date().toISOString(),
            chatSeUserId: ticket.userId,
          },
        ],
      });
      return newMessageId;
    } catch (error) {
      console.error("Error in HandleAddChat:", error);
    }
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
  const handleCheckReUserId = async () => {
    if (checkReUserId()) {
      navigate("/chat", { state: { chatId: ticket.userId } });
    } else {
      try {
        await HandleAddChat();
        navigate("/chat", { state: { chatId: ticket.userId } });
      } catch (error) {
        console.error("Error creating chat:", error);
      }
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
      sellerId: user?.id,
      sellerImage: user?.userImage + "",
      firstName: user?.firstName,
      lastName: user?.lastName,
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
    fetchTicket,
    setTicket,
    user,
    HandleAddChat,
    currentUserId,
    messageId,
    handleCheckReUserId,
    AddToCart,
    eventImage,
    eventName,
  };
};

export default useTicketDetail;
