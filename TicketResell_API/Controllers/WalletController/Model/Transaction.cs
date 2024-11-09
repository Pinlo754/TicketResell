namespace TicketResell_API.Controllers.WalletController.Model;

public partial class Transaction
{
    public string transactionId { get; set; }
    public string walletId { get; set; }
    public int amount { get; set; }
    public string transactionType { get; set; }
    public DateTime time { get; set; }
    public string status { get; set; }
    public int balanceBefore { get; set; }
    public int balanceAfter { get; set; }
    public string? orderId { get; set; }

}