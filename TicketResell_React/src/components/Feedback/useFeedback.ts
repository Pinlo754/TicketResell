import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Seller = {
  Id: string;
  firstName: string;
  lastName: string;
  userImage: string;
};

type Event = {
  eventId: string;
  eventName: string;
  eventImage: string;
  eventTime: string;
  location: string;
  city: string;
};

type Ticket = {
  ticketId: string,
  ticketName: string,
  type: string,
  price: number,
  quantity: number,
  eventId: string,
  userId: string,
};

type Order = {
  orderId: string,
  createdAt: string,
  ticketId: string,
  quantity: number,
  totalAmount: number,
  status: string,
  userName: string,
  receiverPhone: string,
  receiverEmail: string,
  paymentMethod: string,
  ticket: Ticket,
  seller: Seller;
  event: Event;
};
const useFeedback = (order:Order) => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    //const [seller, setSeller] = useState<User>();
    const [orderId, setOrderId] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    type User = {
        userId: string,
        userImage: string,
        firstName: string,
        lastName: string,
    };

    type Comment = {
        id: number;
        name: string;
        avatar: string; // URL ảnh đại diện
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

      type Feedback = {
        userId: string,
        rating: number,
        comment: string,
        orderId: string,
        toUserId: string,
      }

      useEffect(() => {
        setOrderId(order.orderId);
      }, [order, setOrderId]);

    // Rating
  const totalRating = comments.reduce(
    (acc, comment) => acc + comment.rating,
    0
  );
  const averageRating = (totalRating / comments.length).toFixed(1); // Tính trung bình rating

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng đánh giá!");
      return;
    }

    const feedback: Feedback = { userId: userId || "", rating, comment, orderId, toUserId: order.ticket.userId };
    postFeedback(feedback);
  };

  const postFeedback = async (feedback: Feedback) => {
    console.log(feedback);
    try {
      const response = await axios.post("/api/Comment/create-comment", feedback,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
      if (response.status === 201) {
        alert("Đánh giá thành công!")
      }
    } catch (error) {
      console.error("postFeedback:", error);
    }
  };

  return {
    navigate,
    rating, 
    setRating,
    comment, 
    setComment,
    setOrderId,
    totalRating,
    averageRating,
    comments,
    handleSubmit,
  }  
}

export default useFeedback;