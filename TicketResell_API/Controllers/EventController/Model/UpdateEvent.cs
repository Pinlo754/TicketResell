namespace TicketResell_API.Controllers.EventController.Model
{
    public class UpdateEvent
    {
        public string? eventName { get; set; }
        public string? eventImage { get; set; }
        public DateTime? eventTime { get; set; }
        public string? location { get; set; }
        public string? city { get; set; }
        public string? eventStatus { get; set; }
    }
}
