using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.TicketController.Model;
using TicketResell_API.Controllers.EventController.Model;

namespace TicketResell_API.Controllers.TicketController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public TicketController(AppDbContext context)
        {
            _appDbContext = context;
        }

        [HttpGet("list-ticket")]
        public async Task<IActionResult> GetTickets()
        {
            //list all ticket
            var tickets = await _appDbContext.Tickets.ToListAsync();
            return Ok(tickets);
        }

        [HttpPost("create-ticket")]
        public async Task<IActionResult> CreateTicket([FromBody] Ticket model)
        {
            if (model == null)
            {
                return BadRequest("Invalid ticket information");
            }

            model.ticketId = Guid.NewGuid().ToString();
            model.createAt = DateTime.Now;
            model.status = "Pending";

            await _appDbContext.Tickets.AddAsync(model);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTicketById), new { model.ticketId }, model);
        }

        [HttpPut("verify-ticket/{ticketId}")]
        public async Task<IActionResult> VerifyTicket([FromBody] String ticketId)
        {
            var ticket = await _appDbContext.Tickets.FindAsync(ticketId);
            if (ticket == null)
            {
                return NotFound("No ticket found");
            }

            ticket.status = "Approved";

            await _appDbContext.Tickets.AddAsync(ticket);
            await _appDbContext.SaveChangesAsync();

            return Ok("Verify ticket successfully");
        }



        [HttpGet("get-ticket/{ticketId}")]
        public async Task<IActionResult> GetTicketById(string ticketId)
        {
            // Find ticket by ID
            var ticket = await _appDbContext.Tickets.FindAsync(ticketId);
            if (ticket == null)
            {
                return NotFound("No ticket found");
            }
            return Ok(ticket);
        }

        [HttpGet("get-tickets-by-event/{eventId}")]
        public async Task<IActionResult> GetTicketsByEvent(string eventId)
        {
            // Tìm danh sách ticket theo eventId
            var tickets = await _appDbContext.Tickets
                .Where(ticket => ticket.eventId == eventId)
                .ToListAsync();

            if (tickets == null || !tickets.Any())
            {
                return NotFound("No tickets found for this event");
            }

            return Ok(tickets);
        }

        [HttpPut("update-ticket/{ticketId}")]
        public async Task<IActionResult> UpdateTicket(string ticketId, [FromBody] UpdateTicket model)
        {
            //find event by id
            var existingTicket = await _appDbContext.Tickets
                .FirstOrDefaultAsync(e => e.ticketId == ticketId);
            if (existingTicket == null)
            {
                return null;
            }
            //update event information

            existingTicket.ticketName = model.ticketName;
            existingTicket.quantity = model.quantity;
            existingTicket.price = model.price;
            existingTicket.originPrice = model.originPrice;
            existingTicket.images = model.images;
            existingTicket.description = model.description;
            existingTicket.status = model.status;
            existingTicket.type = model.type;
            existingTicket.section = model.section;
            existingTicket.row = model.row;
            existingTicket.eventId = model.eventId;
            existingTicket.updateAt = DateTime.Now;
            //save to db
            var result = await _appDbContext.SaveChangesAsync();
            //check the result <= 0 or not
            if (result <= 0)
            {
                return BadRequest("Failed to update ticket");
            }

            return Ok("Ticket updated successfully");
        }


        [HttpDelete("delete-ticket/{ticketId}")]
        public async Task<IActionResult> DeleteTicket(string ticketId)
        {
            var ticket = await _appDbContext.Tickets
                .FirstOrDefaultAsync(e => e.ticketId == ticketId);
            if (ticket == null)
            {
                return null;
            }

            _appDbContext.Tickets.Remove(ticket);
            _appDbContext.SaveChanges();

            return Ok("Delete ticket successfully");
        }

        [HttpPut("update-status")]
        public async Task<IActionResult> UpdateStatusTicket(UpdateStatusTicket model)
        {
            var ticket = await _appDbContext.Tickets.FirstOrDefaultAsync(c => c.ticketId == model.ticketId);
            if (ticket == null)
            {
                return BadRequest("Ticket not found");
            }

            ticket.status = model.status;

            var result = await _appDbContext.SaveChangesAsync();
            if (result <= 0)
            {
                return BadRequest("Failed to update ticket");
            }

            return Ok("Ticket updated successfully");
        }
    }
}
