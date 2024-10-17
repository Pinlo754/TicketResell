using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Rate
{
    public int RateId { get; set; }

    public int? Rate1 { get; set; }

    public string? Comment { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User User { get; set; } = null!;
}
