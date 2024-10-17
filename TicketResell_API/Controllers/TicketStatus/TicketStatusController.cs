using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TicketResell_API.Controllers.TicketStatus
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketStatusController : ControllerBase
    {
        private readonly TicketResellContext _context;

        public TicketStatusController(TicketResellContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketResell_API.Model.TicketStatus>>> GetAllTicketStatus()
        {
            var statuses = await _context.TicketStatuses.ToListAsync();

            if (statuses == null || statuses.Count == 0)
            {
                return NotFound();
            }

            return Ok(statuses);
        }
    }
}
