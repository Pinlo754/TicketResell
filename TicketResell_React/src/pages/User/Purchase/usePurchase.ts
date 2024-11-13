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
        ticketType: string,
        price: number,
        quantity: number,
        eventId: string,
        userId: string,
      };
  
        type Order = {
          orderId: string,
          orderDate: string,
          ticketId: string,
          quantity: number,
          totalAmount: number,
          status: string,
          userName: string,
          receiverPhone: string,
          receiverEmail: string,
          paymentMethod: string,
          tickets: Ticket[],
          seller: Seller;
          events: Event[];
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
      const [sellerId, setSellerId] = useState("");
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
                  const ticketResponse = await axios.get(`/api/Ticket/get-ticket/${order.ticketId}`);
                  const ticketsData: Ticket[] = Array.isArray(ticketResponse.data) ? ticketResponse.data : [ticketResponse.data];
                  
                  // Fetch event data if it's not already in the Set
                  // Unique event and seller tracking
                  const uniqueEventIds = new Set<string>();
                  const uniqueSellerIds = new Map<string, Seller>();
                  const events: Event[] = [];
  
                  for (const ticket of ticketsData) {
                      // Fetch event data if it's not already in the Set
                      if (!uniqueEventIds.has(ticket.eventId)) {
                          uniqueEventIds.add(ticket.eventId);
                          const eventResponse = await axios.get(`/api/Event/${ticket.eventId}`);
                          events.push(eventResponse.data);
                      }
  
                      // Fetch seller data if not already cached
                      if (!uniqueSellerIds.has(ticket.userId)) {
                          const sellerResponse = await axios.get(`/api/Account/user-information/${ticket.userId}`);
                          const sellerData: Seller = sellerResponse.data;
                          uniqueSellerIds.set(ticket.userId, sellerData);
                      }
                  }

                  // Calculate total amount
                  const orderResponse = await axios.get(`/api/Order/get/${order.orderId}`);
                  const orderData = orderResponse.data;
  
                  // Use the first seller found or provide a fallback
                  const seller = uniqueSellerIds.size > 0 ? Array.from(uniqueSellerIds.values())[0] : {
                      Id: "unknown",
                      firstName: "Unknown",
                      lastName: "Seller",
                      userImage: "default-avatar.png",
                  };
  
                  return {
                      orderId: order.orderId,
                      orderDate: order.orderDate,
                      quantity: order.quantity,
                      totalAmount: orderData.totalAmount,
                      status: orderData.status,
                      paymentMethod: order.paymentMethod,
                      userName: order.userName,
                      receiverPhone: order.receiverPhone,
                      receiverEmail: order.receiverEmail,
                      ticketId: ticketsData[0]?.ticketId || "N/A", // Use first ticket's ID or a default value
                      tickets: ticketsData,
                      seller,
                      events,
                  };
              })
          );
  
          setOrders(orderDetails);
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
              if (finalresponse.status === 200) {
                alert("Cộng tiền thành công!");
              }
            } catch (error) {
              console.log("Error fetching wallet:", error);
            }
          } catch (error) {
            console.error("Error fetching wallet:", error);
          }
      
          try {
            const response = await axios.put(`/api/Order/update/${orderId}`, {
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
            const response = await axios.put(`/api/Order/update/${orderId}`, {status: "Refund"})
            if (response.status === 200) {
              alert("Yêu cầu đã gửi thành công!");
                fetchOrders();
                fetchOrderDetails(orders);
            }
        } catch (error) {
          console.error("Error completing order:", error);
        }
        };

    return {
        navigate,
        comments,
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
    }
}

export default usePurchase;