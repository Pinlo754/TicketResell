using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class TicketStatus
{
    public int StatusId { get; set; }

    public string? StatusName { get; set; }

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
