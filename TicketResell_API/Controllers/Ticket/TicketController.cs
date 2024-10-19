using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace TicketResell_API.Controllers.Ticket
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {

            private readonly TicketResellContext _context;

            public TicketController(TicketResellContext context)
            {
                _context = context;
            }
            // GET: api/Ticket/Status/1
            [HttpGet("Status/1")]
            public async Task<ActionResult<IEnumerable<TicketResellContext>>> GetAllTicketsWithStatus1()
            {
                var tickets = await _context.Tickets
                                            .Where(t => t.StatusId == 1)
                                            .ToListAsync();

                if (tickets == null || tickets.Count() == 0)
                {
                    return NotFound();
                }

                return Ok(tickets);
            }

            [HttpPost]
            public async Task<ActionResult<TicketResell_API.Model.Ticket>> CreateTicket(TicketResell_API.Model.Ticket ticket)
            {
                if (ticket == null)
                {
                    return BadRequest("Ticket data is null.");
                }

                // Set default value for StatusID if it is not provided
                if (ticket.StatusId == 0) // Hoặc kiểm tra null nếu cần thiết
                {
                    ticket.StatusId = 2; // Gán giá trị mặc định là 2
                }

                // Add the new ticket to the context
                _context.Tickets.Add(ticket);

                try
                {
                    // Save the changes to the database
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException ex)
                {
                    // Handle the error if there's a conflict or other database issues
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }

                // Return the newly created ticket
                return CreatedAtAction(nameof(GetTicketById), new { id = ticket.TicketId }, ticket);
            }
            [HttpGet("{id}")]
            public async Task<ActionResult<TicketResellContext>> GetTicketById(int id)
            {
                var ticket = await _context.Tickets.FindAsync(id);

                if (ticket == null)
                {
                    return NotFound();
                }

                return Ok(ticket);
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateTicket(int id, TicketResell_API.Model.Ticket updatedTicket)
            {
                if (id != updatedTicket.TicketId)
                {
                    return BadRequest("Ticket ID mismatch.");
                }

                var existingTicket = await _context.Tickets.FindAsync(id);

                if (existingTicket == null)
                {
                    return NotFound($"Ticket with ID {id} not found.");
                }

                // Update the properties of the existing ticket with the values from the updated ticket
                existingTicket.TicketName = updatedTicket.TicketName;
                existingTicket.Quantity = updatedTicket.Quantity;
                existingTicket.Price = updatedTicket.Price;
                existingTicket.OriginPrice = updatedTicket.OriginPrice;
                existingTicket.Image = updatedTicket.Image;
                existingTicket.Description = updatedTicket.Description;
                existingTicket.CategoryId = updatedTicket.CategoryId;
                existingTicket.Time = updatedTicket.Time;
                existingTicket.Location = updatedTicket.Location;
                existingTicket.EventId = updatedTicket.EventId;
                existingTicket.TypeId = updatedTicket.TypeId;
                existingTicket.SectionId = updatedTicket.SectionId;
                existingTicket.Ctid = updatedTicket.Ctid;
                try
                {
                    // Save the changes to the database
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TicketExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent(); // Return HTTP 204 if the update was successful
            }

            private bool TicketExists(int id)
            {
                return _context.Tickets.Any(e => e.TicketId == id);
            }

            // PUT: api/Ticket/ChangeStatus/{id}
            [HttpPut("Delete/{id}")]
            public async Task<IActionResult> ChangeTicketStatus(int id)
            {
                // Tìm ticket theo ID
                var ticket = await _context.Tickets.FindAsync(id);

                if (ticket == null)
                {
                    return NotFound($"Ticket with ID {id} not found.");
                }

                // Kiểm tra nếu StatusID hiện tại là 1
                if (ticket.StatusId == 1)
                {
                    // Thay đổi StatusID từ 1 thành 2
                    ticket.StatusId = 2;

                    try
                    {
                        // Lưu các thay đổi vào cơ sở dữ liệu
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        return StatusCode(500, "Failed to delete the ticket.");
                    }

                    return Ok($"Ticket ID {id} status has been delete.");
                }
                else
                {
                    return BadRequest($"Ticket ID {id} does not have.");
                }

            }
            [HttpGet("SearchByLocation")]
            public async Task<ActionResult<IEnumerable<TicketResellContext>>> GetTicketsByLocation(string location)
            {
                if (string.IsNullOrEmpty(location))
                {
                    return BadRequest("Location is required.");
                }

                // Tìm kiếm vé theo Location, sử dụng phương thức `Where` để lọc dữ liệu
                var tickets = await _context.Tickets
                                            .Where(t => t.Location.Contains(location))
                                            .ToListAsync();

                if (tickets == null || !tickets.Any())
                {
                    return NotFound($"No tickets found for location: {location}");
                }

                return Ok(tickets);
            }
        }
    }
