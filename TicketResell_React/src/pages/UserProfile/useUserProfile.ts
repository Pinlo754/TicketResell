import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useUserProfile = () => {

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

  type User = {
    id: string,
    userImage: string,
    firstName: string,
    lastName: string,
    email: string,
    bio: string,
    address: string,
    gender: string,
  };

  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const totalTickets = tickets.length;
  const totalReviews = comments.length;

  useEffect(() => {
    fetchUser();
    fetchTickets();
    fetchComments();
  },[]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/Account/user-information/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`/api/Ticket/list-ticket`);
      const tickets: Ticket[] = response.data;
      const listTicket = tickets.filter((ticket) => ticket.userId === userId).filter((ticket) =>ticket.status === "Available").filter((ticket) =>ticket.quantity > 0);
      setTickets(listTicket);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/Comment/list/${userId}`);
      const comments: Comment[] = response.data;
      const commentDetail = await Promise.all(
        comments.map(async(comment: Comment) => {
          const userResponse = await axios.get(`/api/Account/user-information/${comment.userId}`);
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
            toUserId: userId ?? "",
          }
        })
      );
      setComments(commentDetail);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Rating
  const totalRating = comments.reduce(
    (acc, comment) => acc + comment.rating,
    0
  );
  const averageRating = (totalRating / comments.length).toFixed(1); // Tính trung bình rating

  return {
    user,
    tickets,
    comments,
    totalTickets,
    totalReviews,
    averageRating,
  }
}

export default useUserProfile;