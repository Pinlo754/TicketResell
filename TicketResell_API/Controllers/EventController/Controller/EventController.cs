using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.EventController.Model;

namespace TicketResell_API.Controllers.EventController.Controller
{
    //[Authorize(Roles = "Staff")]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public EventController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost("create-event")]
        public async Task<IActionResult> CreateEvent([FromBody] Event model)
        {
            if (model == null)
            {
                return BadRequest("Invalid event information");
            }

            model.eventId = Guid.NewGuid().ToString();

            await _appDbContext.Events.AddAsync(model);
            await _appDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEventById), new { model.eventId }, model);
        }

        [HttpGet("{eventId}")]
        public async Task<IActionResult> GetEventById(string eventId)
        {
            // Find event by ID
            var evnt = await _appDbContext.Events.FindAsync(eventId);
            if (evnt == null)
            {
                return NotFound("No events found");
            }
            return Ok(evnt);
        }

        [HttpGet("list-event")]
        public async Task<IActionResult> GetEventList()
        {
            //list all event
            var events = await _appDbContext.Events.ToListAsync();
            //Failed to connect database
            return Ok(events);
        }

        [HttpPut("update-event/{eventId}")]
        public async Task<IActionResult> UpdateEvent(string eventId, [FromBody] UpdateEvent model)
        {
            //find event by id
            var existingEvent = await _appDbContext.Events
                .FirstOrDefaultAsync(e => e.eventId == eventId);
            if (existingEvent == null)
            {
                return null;
            }
            //update event information
            existingEvent.eventName = model.eventName;
            existingEvent.eventImage = model.eventImage;
            existingEvent.eventTime = model.eventTime;
            existingEvent.location = model.location;
            existingEvent.city = model.city;
            existingEvent.eventStatus = model.eventStatus;
            //save to db
            var result = await _appDbContext.SaveChangesAsync();
            //check the result <= 0 or not
            if (result <= 0)
            {
                return BadRequest("Failed to update event");
            }

            return Ok("Event updated successfully");
        }

    }
}
