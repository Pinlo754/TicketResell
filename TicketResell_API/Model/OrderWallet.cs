using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class OrderWallet
{
    public int OrderId { get; set; }

    public int WalletId { get; set; }

    public decimal? HistoryTransaction { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual Wallet Wallet { get; set; } = null!;
}
