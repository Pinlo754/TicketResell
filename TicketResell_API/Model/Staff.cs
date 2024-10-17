using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Staff
{
    public int StaffId { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
}
