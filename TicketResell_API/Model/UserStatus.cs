using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class UserStatus
{
    public int StatusId { get; set; }

    public string? StatusName { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
