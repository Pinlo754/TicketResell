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

            await _appDbContext.Tickets.AddAsync(model);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTicketById), new { model.ticketId }, model);
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
            existingTicket.image = model.image;
            existingTicket.description = model.description;
            existingTicket.time = model.time;
            existingTicket.isValid = model.isValid;
            existingTicket.location = model.location;
            existingTicket.eventId = model.eventId;
            existingTicket.createAt = model.createAt;
            existingTicket.updateAt = model.updateAt;
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
    }
}
