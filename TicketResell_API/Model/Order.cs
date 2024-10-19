using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Order
{
    public int OrderId { get; set; }

    public int UserId { get; set; }

    public string? ReceiverName { get; set; }

    public string? ReceiverPhone { get; set; }

    public DateTime? OrderDate { get; set; }

    public string? Address { get; set; }

    public decimal? TotalAmout { get; set; }

    public int StatusId { get; set; }

    public DateTime? ExpectedDate { get; set; }

    public string? CurrentLocation { get; set; }

    public int RateId { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<OrderWallet> OrderWallets { get; set; } = new List<OrderWallet>();

    public virtual Rate Rate { get; set; } = null!;

    public virtual OrderStatus Status { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
