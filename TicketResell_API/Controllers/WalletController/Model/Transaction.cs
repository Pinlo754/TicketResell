using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TicketResell_API.Controllers.User.Model;

namespace TicketResell_API.Controllers.WalletController.Model;

public partial class Transaction
{
    [MaxLength(450)] public string transactionId { get; set; }
    [MaxLength(450)] public string walletId { get; set; }
    public int amount { get; set; }
    public string transactionType { get; set; }
    public DateTime time { get; set; }
    public string status { get; set; }
    public int balanceBefore { get; set; }
    public int balanceAfter { get; set; }
    public string? orderId { get; set; }

    //Nativigate Properties
    [JsonIgnore]
    public Wallet? Wallets { get; set; }

}