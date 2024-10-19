using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class CategoryTicket
{
    public int Ctid { get; set; }

    public string? Ctname { get; set; }

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
