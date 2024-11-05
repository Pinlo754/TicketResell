import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";



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
            console.error('Error fetching data:', error);
          });
      };

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
    }
    
      const [tickets, setTickets] = useState<Ticket[]>([]);

      useEffect(() => {
        fetchTickets();
      }, []);
      
      const fetchTickets = () => {
        axios.get('/api/Ticket/list-ticket')
          .then(response => {
            const tickets: Ticket[] = response.data;            
            setTickets(tickets);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
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
        totalTickets
    };
}

export default useMainScreen;