using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TicketResell_API.Controllers.UserController.Model;

namespace TicketResell_API.Controllers.WalletController.Model;

public partial class Wallet
{
    [MaxLength(450)] public string walletId { get; set; }
    [MaxLength(450)] public string userId { get; set; }
    public int balance { get; set; }
    public string status { get; set; }


    //Nativigate Properties
    [JsonIgnore]
    public MainUser? User { get; set; }
    [JsonIgnore]
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}