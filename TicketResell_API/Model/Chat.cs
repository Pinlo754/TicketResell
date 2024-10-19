using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Chat
{
    public int RuserId { get; set; }

    public string? LastMessage { get; set; }

    public DateTime? UpdateAt { get; set; }

    public int? MessageSeen { get; set; }

    public int SuserId { get; set; }

    public int MessageId { get; set; }

    public virtual Message Message { get; set; } = null!;

    public virtual User Ruser { get; set; } = null!;

    public virtual User Suser { get; set; } = null!;
}
