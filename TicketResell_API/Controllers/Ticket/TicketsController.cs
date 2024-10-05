using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TicketResell_API.Controllers.Ticket
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly TicketResell _context; // t chưa kết nối database sẽ update sau

        public TicketController(TicketResell context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets()
        {
            var tickets = await _context.Tickets.ToListAsync();
            return tickets;
        }
    }
}
