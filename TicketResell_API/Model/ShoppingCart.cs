using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class ShoppingCart
{
    public int CartId { get; set; }

    public int? Quantity { get; set; }

    public int UserId { get; set; }

    public int TicketId { get; set; }

    public virtual Ticket Ticket { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
