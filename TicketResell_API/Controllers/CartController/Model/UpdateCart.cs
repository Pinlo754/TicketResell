using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.CartController.Model
{
    public class UpdateCart
    {
        [MaxLength(450)] public string? userId { get; set; }
        [MaxLength(450)] public string? ticketId { get; set; }
        public int quantity { get; set; }
    }
}
