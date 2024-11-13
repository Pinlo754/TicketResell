import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const useMainScreen = () => {
    const navigate: NavigateFunction = useNavigate();
    const [events, setEvents] = useState<Event[]>([]); // State quản lý tất cả sản phẩm

    type Event = {
      eventId: string;
      eventName: string;
      eventImage: string;
      eventTime: string;
      location: string;
      city: string;
      eventStatus: string;
    };

      useEffect(() => {
        fetchEvents();

      }, []);

      const fetchEvents = () => {
        axios.get('/api/Event/list-event')
          .then(response => {
            const events: Event[] = response.data;
            const activeEvents = events.filter(event => event.eventStatus === 'Ongoing');
            setEvents(activeEvents);
          })
          .catch(error => {
            console.error('Error fetching list event data:', error); //lỗi do không kết nối được server api
            toast.error('Error fetching list event data:', error);
          });
      };

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
    }
    
      const [tickets, setTickets] = useState<Ticket[]>([]);

      useEffect(() => {
        const role = localStorage.getItem("role")
        if(role === "Staff") navigate("/staff/main");
      else if (role === "Admin") navigate("/Admin");
      else navigate("/main");
        fetchTickets();
      }, []);
      
      const fetchTickets = () => {
        axios.get('/api/Ticket/list-ticket')
          .then(response => {
            const tickets: Ticket[] = response.data;            
            setTickets(tickets);
          })
          .catch(error => {
            console.error('Error fetching list ticket data:', error);
            toast.error('Error fetching list ticket data:', error);
          });
      };
      const totalTickets = (eventId : string) => {
        return tickets
        .filter(ticket => ticket.eventId === eventId)
        .reduce((total, ticket) => total + ticket.quantity, 0);
      }      
      

    return {
        navigate,
        events, 
        setEvents,
        totalTickets,
        toast
    };
}

export default useMainScreen;