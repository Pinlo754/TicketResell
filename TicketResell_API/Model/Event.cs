using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Event
{
    public int EventId { get; set; }

    public string? EventName { get; set; }

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
