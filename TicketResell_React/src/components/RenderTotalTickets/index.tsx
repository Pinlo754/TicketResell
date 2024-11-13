import axios from "axios";
import useRenderTotalTickets from "./useRenderTotalTickets";
import { useEffect, useState } from "react";

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

const RenderTotalTickets = (tickets: Ticket[]) => {
  const {
    navigate,
    visibleTickets,
    isExpanded,
    formatCurrency,
    handleShowMore,
    handleShowLess,
    events,
    formattedDateTime,
  } = useRenderTotalTickets(tickets);


  if (tickets.length === 0) {
    return (
      <div className="w-full py-5 mx-auto">
        <p className="text-xl text-center">Người này không bán vé nào!!!</p>
        <div className="flex justify-center mt-3">
          <button
            className="flex flex-col items-center gap-y-1 text-gray-600 group hover:text-[#87CBB9]"
            onClick={() => navigate("/listEvent")}
          >
            Tiếp tục mua vé
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-2 group-hover:text-[#87CBB9] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
            </svg>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full">
        {tickets.slice(0, visibleTickets).map((ticket) => {
          const event = events[ticket.ticketId];

          return (
            <div key={ticket.ticketId} className="pt-4 hover:bg-neutral-200">
              <p className="px-8 text-xl font-medium">{ticket.ticketName}</p>
              <div className="mt-4 ml-2 px-8 flex justify-start flex-wrap gap-2 text-sm text-gray-500">
                {/* Date */}
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd"/>
                  </svg>
                  <p>{event?.eventTime ? formattedDateTime(event.eventTime) : "Loading..."}</p>
                </div>
                {/* Location */}
                <div className="flex items-center">
                  |
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                  </svg>
                  <p>{event ? event.location : "Loading..."}</p>
                </div>
                {/* City */}
                <div className="flex items-center">
                  |
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm9.75-9.75h-.75v18h.75a.75.75 0 0 0 0-1.5H21V3a.75.75 0 0 0 0-1.5Zm-3.75 0h-.75a.75.75 0 0 0 0 1.5h.75v16.5h-.75a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H18V2.25Z" clip-rule="evenodd"/>
                  </svg>
                  <p>{event ? event.city : "Loading..."}</p>
                </div>
              </div>
              <p className="px-8 mt-3 text-[#8A3F00] text-xs">
                * Giá gốc của vé là {formatCurrency(ticket.originPrice)}
              </p>

              <div className="flex justify-end mt-4 pb-4 border-b-2">
                <button 
                className="bg-[#87CBB9] px-3 mr-4 py-2 rounded-sm text-white hover:bg-[#B9EDDD] hover:text-black"
                onClick={() => navigate(`/ticketDetail/${ticket.ticketId}`)}
                >
                  Xem vé
                </button>
              </div>
            </div>
          );
        })}

        {tickets.length > 4 && (
          <div className="text-center mt-2">
            {!isExpanded ? (
              <button className="font-medium text-[#87CBB9]" onClick={handleShowMore}>Xem thêm</button>
            ) : (
              <button className="font-medium text-[#87CBB9]" onClick={handleShowLess}>Thu gọn</button>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default RenderTotalTickets;
