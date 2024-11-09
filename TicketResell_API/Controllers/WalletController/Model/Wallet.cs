namespace TicketResell_API.Controllers.WalletController.Model;

public partial class Wallet
{
    public string walletId { get; set; }
    public string userId { get; set; }
    public int balance { get; set; }
    public string status { get; set; }

}