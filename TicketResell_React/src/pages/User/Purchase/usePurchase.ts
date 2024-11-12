import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const usePurchase = () => {

    type Seller = {
        sellerId: string;
        sellerName: string;
        sellerAvatar: string;
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
      };
  
        type Order = {
          orderId: string,
          orderDate: string,
          totalPrice: number,
          status: string,
          paymentMethod: string,
          tickets: Ticket[],
          seller: Seller;
          events: Event[];
        };
  
        const orders: Order[] = [
          {
            orderId: "o001",
            orderDate: "2024-11-01",
            totalPrice: 500000,
            status: "Pending",
            paymentMethod: "Credit Card",
            tickets: [
              {
                ticketId: "t001",
                ticketName: "Concert Ticket - VIP",
                ticketType: "VIP",
                price: 10000,
                quantity: 1,
                eventId: "e001",
              },
              {
                ticketId: "t002",
                ticketName: "Concert Ticket - Standard",
                ticketType: "Standard",
                price: 10000,
                quantity: 2,
                eventId: "e001",
              },
            ],
            seller: {
              sellerId: "s001",
              sellerName: "Nguyen Van A",
              sellerAvatar: "https://example.com/avatar-a.jpg",
            },
            events: [
              {
                eventId: "e001",
                eventName: "Music Concert 2024",
                eventImage: "https://example.com/event-image1.jpg",
                eventTime: "18:00",
                location: "Stadium A",
                city: "Ho Chi Minh City",
              },
            ],
          },
          {
            orderId: "o002",
            orderDate: "2024-11-02",
            totalPrice: 900000,
            status: "Available",
            paymentMethod: "PayPal",
            tickets: [
              {
                ticketId: "t003",
                ticketName: "Concert Ticket - Balcony",
                ticketType: "Balcony",
                price: 20000,
                quantity: 3,
                eventId: "e001",
              },
            ],
            seller: {
              sellerId: "s002",
              sellerName: "Tran Thi B",
              sellerAvatar: "https://example.com/avatar-b.jpg",
            },
            events: [
              {
                eventId: "e001",
                eventName: "Music Concert 2024",
                eventImage: "https://example.com/event-image1.jpg",
                eventTime: "18:00",
                location: "Stadium A",
                city: "Ho Chi Minh City",
              },
            ],
          },
          {
            orderId: "o003",
            orderDate: "2024-11-03",
            totalPrice: 1200000,
            status: "Sold",
            paymentMethod: "Bank Transfer",
            tickets: [
              {
                ticketId: "t004",
                ticketName: "Festival Ticket - Day 1",
                ticketType: "Festival",
                price: 10000,
                quantity: 1,
                eventId: "e002",
              },
              {
                ticketId: "t005",
                ticketName: "Drama Ticket - Evening Show",
                ticketType: "Drama",
                price: 10000,
                quantity: 4,
                eventId: "e003",
              },
            ],
            seller: {
              sellerId: "s003",
              sellerName: "Le Van C",
              sellerAvatar: "https://example.com/avatar-c.jpg",
            },
            events: [
              {
                eventId: "e002",
                eventName: "Art Festival 2024",
                eventImage: "https://example.com/event-image2.jpg",
                eventTime: "09:00",
                location: "Park C",
                city: "Da Nang",
              },
              {
                eventId: "e003",
                eventName: "Drama Night 2024",
                eventImage: "https://example.com/event-image3.jpg",
                eventTime: "20:00",
                location: "Theater B",
                city: "Ha Noi",
              },
            ],
          },
        ];

        const tabs = [
          { id: 1, label: "Tất cả" },
          { id: 2, label: "Hoàn thành" },
          { id: 3, label: "Hoàn tiền" },
        ];

      const navigate = useNavigate();
      // const [orders, setOrders] = useState<Order[]>([]);
      const userId = localStorage.getItem("userId");
      const [showFeedback, setShowFeedback] = useState(false); // State to control Feedback visibility

      useEffect(() => {
        if (userId != null) {
            fetchOrders(userId);
        };
      },[]);

      const fetchOrders = async (userId: string) => {
        try {
            
        } catch (error) {
            console.error("Error fetching orders:", error);
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

    return {
        navigate,
        orders,
        tabs,
        handleOpenFeedback,
        handleCloseFeedback,
        showFeedback,
    }
}

export default usePurchase;