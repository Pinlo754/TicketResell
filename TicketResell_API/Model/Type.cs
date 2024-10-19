using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Type
{
    public int TypeId { get; set; }

    public string? Type1 { get; set; }

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
