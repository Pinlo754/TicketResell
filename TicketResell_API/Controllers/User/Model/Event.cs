﻿namespace TicketResell_API.Controllers.User.Model
{
    public class Event
    {
        public string? eventId { get; set; }
        public string? eventName { get; set; }
        public string? eventImage { get; set; }
        public DateTime? eventTime { get; set; }
        public string? location { get; set; }
        public string? eventStatus { get; set; }
    }
}