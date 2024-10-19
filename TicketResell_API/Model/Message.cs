using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Message
{
    public int MessageId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? Text { get; set; }

    public int Sid { get; set; }

    public virtual User SidNavigation { get; set; } = null!;
}
