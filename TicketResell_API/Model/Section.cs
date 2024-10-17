using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Section
{
    public int SectionId { get; set; }

    public string? Section1 { get; set; }

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
