import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const usePurchase = () => {

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

        type Comment = {
          commentId: string;
          userId: string;
          rating: number;
          time: string;
          comment: string;
          toUserId: string;
        };

        type Comment = {
          commentId: string;
          userId: string;
          rating: number;
          time: string;
          comment: string;
          toUserId: string;
        };

        const tabs = [
          { id: 1, label: "Tất cả" },
          { id: 2, label: "Đã mua" },
          { id: 3, label: "Hoàn thành" },
          { id: 4, label: "Hoàn tiền" },
        ];

      const navigate = useNavigate();
      const [orders, setOrders] = useState<Order[]>([]);
      const userId = localStorage.getItem("userId");
      const [showFeedback, setShowFeedback] = useState(false); // State to control Feedback visibility
      const [selectedOrder, setSelectedOrder] = useState<Order>();
      const [comments, setComments] = useState<Comment[]>([]);
      const commentIds = comments.map(comment => comment.commentId);

      useEffect(() => {
        if (userId != null) {
            fetchOrders();
            fetchOrderDetails(orders);
            fetchComments();
        };
      },[]);

      const fetchOrders = async () => {
        try {
            const ordersResponse = await axios.get(`/api/Order/get-user-orders/${userId}`);
            const ordersData:Order[] = ordersResponse.data;
            await fetchOrderDetails(ordersData);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchOrderDetails = async (ordersData: Order[]) => {
      try {
          const orderDetails = await Promise.all(
              ordersData.map(async (order: Order) => {

                  // Ticket
                  const ticketResponse = await axios.get(`/api/Ticket/get-ticket/${order.ticketId}`);
                  const ticketData: Ticket = ticketResponse.data;

                  // Event 
                  const eventResponse = await axios.get(`/api/Event/${ticketData.eventId}`);
                  const eventData: Event = eventResponse.data;

                  // Seller
                  const sellerResponse = await axios.get(`/api/Account/user-information/${ticketData.userId}`);
                  const sellerData: Seller = sellerResponse.data;

                  // TotalAmount
                  const orderResponse = await axios.get(`/api/Order/get/${order.orderId}`);
                  const totalAmount = orderResponse.data.totalAmount;
                  return {
                      orderId: order.orderId,
                      createdAt: order.createdAt,
                      quantity: order.quantity,
                      totalAmount: totalAmount,
                      status: order.status,
                      paymentMethod: order.paymentMethod,
                      userName: order.userName,
                      receiverPhone: order.receiverPhone,
                      receiverEmail: order.receiverEmail,
                      ticketId: order.ticketId,
                      ticket: ticketData,
                      event: eventData,
                      seller: sellerData,
                  };
              })
          );
  
          setOrders(orderDetails);
          console.log(orderDetails);
      } catch (error) {
          console.error("Error fetching order details:", error);
      }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/Comment/list-comment/${userId}`);
      const commentsData: Comment[] = response.data;
      setComments(commentsData);
      
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
        // Function to show Feedback form
        const handleOpenFeedback = () => {
            setShowFeedback(true);
        };

        // Function to close Feedback form
        const handleCloseFeedback = () => {
            setShowFeedback(false);
        };

        const handleComplete = async (
          orderId: string,
          sellerId: string,
          amount: Number
        ) => {
          try {
            const response = await axios.get(`/api/Wallet/get-by-user/${sellerId}`);
            try {
              const finalresponse = await axios.post(
                "/api/Wallet/sell-ticket?walletId=" +
                  response.data.walletId +
                  "&amount=" +
                  amount
              );
            } catch (error) {
              console.log("Error fetching wallet:", error);
            }
          } catch (error) {
            console.error("Error fetching wallet:", error);
          }
      
          try {
            const response = await axios.put(`/api/Order/update/${orderId}`, {
              orderId: orderId,
              status: "Complete",
            });
            if (response.status === 200) {
              alert("Đơn đã hoàn thành!");
                fetchOrders();
                fetchOrderDetails(orders);
            }
          } catch (error) {
            console.error("Error completing order:", error);
          }
        };
        
        const handleRefund = async (orderId: string) => {
          try {
            const response = await axios.put(`/api/Order/update/${orderId}`, {
              orderId: orderId,
              status: "Refund"
            })
            if (response.status === 200) {
              alert("Yêu cầu đã gửi thành công!");
                fetchOrders();
                fetchOrderDetails(orders);
            }
        } catch (error) {
          console.error("Error completing order:", error);
        }
        };

        const formattedDateTime = (dateParam: string | Date): string => {
          const utcDate = new Date(dateParam);
          const localDate = new Date(utcDate.getTime()); // Convert to local time if needed
          
          const year = localDate.getFullYear();
          const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0
          const day = String(localDate.getDate()).padStart(2, "0");
          const hours = String(localDate.getHours()).padStart(2, "0");
          const minutes = String(localDate.getMinutes()).padStart(2, "0");
          const seconds = String(localDate.getSeconds()).padStart(2, "0");
        
          // Return the formatted date string
          return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        };

    return {
        navigate,
        comments,
        commentIds,
        orders,
        selectedOrder,
        setSelectedOrder,
        tabs,
        handleOpenFeedback,
        handleCloseFeedback,
        showFeedback,
        setShowFeedback,
        handleComplete,
        handleRefund,
        formattedDateTime,
    }
}

export default usePurchase;