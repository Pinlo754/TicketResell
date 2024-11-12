using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using TicketResell_API.Controllers.CartController.Model;
using TicketResell_API.Controllers.ChatController.Model;
using TicketResell_API.Controllers.CommentController.Model;
using TicketResell_API.Controllers.TicketController.Model;
using TicketResell_API.Controllers.User.Model;
using TicketResell_API.Controllers.WalletController.Model;

namespace TicketResell_API.Controllers.UserController.Model
{
    public class MainUser : IdentityUser
    {
        public string? userImage { get; set; }
        public string? firstName { get; set; }
        [MaxLength(256)]
        public string? lastName { get; set; }
        [MaxLength(256)]
        public string? bio { get; set; } = string.Empty;
        public string? gender { get; set; }
        public string? address { get; set; }
        public int FailedConfirmationAttemps { get; set; } = 0;

        // Navigation properties
        public ICollection<Order>? Orders { get; set; }
        public ICollection<Comment>? Comments { get; set; }
        public ICollection<Cart>? Carts { get; set; }
        public ICollection<Chat>? Chats { get; set; }
        public ICollection<Ticket>? Tickets { get; set; }
        public ICollection<Wallet>? Wallets { get; set; }
    }
}
