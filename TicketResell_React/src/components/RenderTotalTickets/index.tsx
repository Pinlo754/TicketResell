import useRenderTotalTickets from "./useRenderTotalTickets";

type Ticket = {
    id: number;
    name: string;
    day: string;
    time: string;
    location: string;
    city: string;
    category: string;
    section: string;
    row: number;
    price: number;
    quantity: number;
    description: string;
  };

const RenderTotalTickets = (tickets: Ticket[]) => {

    const {
      navigate,
      visibleTickets,
      isExpanded,
      formatCurrency,
      handleShowMore,
      handleShowLess,
    } = useRenderTotalTickets(tickets);
  
    if (tickets.length === 0) {
      return (
        <div className="w-full py-5 mx-auto">
          <p className="text-xl text-center">
            User does not sell any tickets!!!
          </p>
          <div className="flex justify-center mt-3">
            <button
              className="flex flex-col items-center gap-y-1 text-gray-600 group hover:text-[#87CBB9]"
              onClick={() => navigate("/listEvent")}
            >
              Continue shopping for tickets
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
           {/* Hiển thị các vé, giới hạn số lượng theo visibleTicets */}
           {tickets.slice(0, visibleTickets).map((ticket) => (
            <div key={ticket.id} className="pt-4 hover:bg-neutral-200">
              <p className="px-8 text-xl font-medium">{ticket.name}</p>
              <div className="mt-4 ml-2 px-8 flex justify-start flex-wrap gap-2 text-sm text-gray-500">
                {/* Date */}
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd"/>
                  </svg>
                  <p>
                    {ticket.day}, {ticket.time}
                  </p>
                </div>
                {/* Location */}
                <div className="flex items-center">
                  |
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                  </svg>
                  <p>{ticket.location}</p>
                </div>
                {/* City */}
                <div className="flex items-center">
                  |
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd"/>
                  </svg>
                  <p>{ticket.city}</p>
                </div>
              </div>
              <div className="mt-5 ml-2 px-8 flex flex-wrap justify-start gap-x-4 gap-y-1 text-sm text-gray-500">
                <p><span className="font-medium">Category:</span> <span className="text-gray-700">{ticket.category}</span></p>
                <p><span className="font-medium">Section:</span> <span className="text-gray-700">{ticket.section}</span></p>
                {ticket.category === "Seat" && (
                  <p><span className="font-medium">Row:</span> <span className="text-gray-700">{ticket.row}</span></p>
                )}
                <p><span className="font-medium">Quantity:</span> <span className="text-gray-700">{ticket.quantity}</span></p>
                <p><span className="font-medium">Price Per Ticket:</span> <span className="text-gray-700">{formatCurrency(ticket.price)} VND</span></p>
              </div>
              <div className="flex justify-end mt-6 pb-4 border-b-2">
                <button 
                className="bg-[#87CBB9] px-3 mr-4 py-2 rounded-sm text-white hover:bg-[#B9EDDD] hover:text-black"
                onClick={() => navigate("/eventDetail")}
                >
                  View Page
                </button>
              </div>
            </div>
          ))}
  
          {/* Hiển thị nút "Show More" nếu chưa hiển thị hết các bình luận */}
          {!isExpanded && visibleTickets < tickets.length && (
              <div className="my-3 flex justify-center">
                <button
                  onClick={handleShowMore}
                  className="flex items-center text-[#87CBB9] text-sm group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 group-hover:translate-y-2 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"/>
                  </svg>
                  Show More ({tickets.length-visibleTickets})
                </button>
              </div>
            )}
  
            {/* Hiển thị nút "Show Less" nếu đã hiển thị hết các bình luận */}
            {isExpanded && (
              <div className="my-3 flex justify-center">
                <button
                  onClick={handleShowLess}
                  className="flex items-center text-[#87CBB9] text-sm group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 group-hover:-translate-y-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>
                  Show Less
                </button>
              </div>
            )}
        </div>
      );
    }
  };

  export default RenderTotalTickets;