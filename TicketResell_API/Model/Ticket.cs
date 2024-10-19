using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Ticket
{
    public int TicketId { get; set; }

    public string TicketName { get; set; } = null!;

    public int? Quantity { get; set; }

    public decimal Price { get; set; }

    public decimal OriginPrice { get; set; }

    public string Image { get; set; } = null!;

    public int UserId { get; set; }

    public string? Description { get; set; }

    public int CategoryId { get; set; }

    public DateOnly? Time { get; set; }

    public int StatusId { get; set; }

    public string? Location { get; set; }

    public int EventId { get; set; }

    public int TypeId { get; set; }

    public int SectionId { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public int Ctid { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual CategoryTicket Ct { get; set; } = null!;

    public virtual Event Event { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Section Section { get; set; } = null!;

    public virtual ICollection<ShoppingCart> ShoppingCarts { get; set; } = new List<ShoppingCart>();

    public virtual TicketStatus Status { get; set; } = null!;

    public virtual Type Type { get; set; } = null!;

    public virtual User User { get; set; } = null!;

    public virtual ICollection<Staff> Staff { get; set; } = new List<Staff>();
}
