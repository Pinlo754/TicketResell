using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TicketResell_API.Controllers.CartController.Model
{
    public class Cart
    {
        public string? cartId { get; set; }
        public string? userId { get; set; }
        public string? ticketId { get; set; }
        public int quanity { get; set; }
        public decimal price { get; set; }
    }

}
