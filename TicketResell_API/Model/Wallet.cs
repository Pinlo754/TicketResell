using System;
using System.Collections.Generic;

namespace TicketResell_API.Model;

public partial class Wallet
{
    public int WalletId { get; set; }

    public decimal? Balance { get; set; }

    public string? GatewayPayment { get; set; }

    public string? GatewayPaymentStatus { get; set; }

    public virtual ICollection<OrderWallet> OrderWallets { get; set; } = new List<OrderWallet>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
