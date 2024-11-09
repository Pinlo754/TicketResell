using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TicketResell_API.Controllers.TicketController.Model;

namespace TicketResell_API.Controllers.EventController.Model
{
    public class Event
    {
        [MaxLength(450)]public string? eventId { get; set; }
        public string? eventName { get; set; }
        public string? eventImage { get; set; }
        public DateTime? eventTime { get; set; }
        public string? location { get; set; }
        public string? city { get; set; }
        public string? eventStatus { get; set; }

        // Navigation properties
        [JsonIgnore]
        public ICollection<Ticket>? Tickets { get; set; }
    }
}
