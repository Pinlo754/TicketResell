using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TicketResell_API.Controllers.CartController.Model
{
    public class Cart
    {
        public string? cartId { get; set; }
        public string? userId { get; set; }
        public string? sellerId { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? ticketId { get; set; }
        public string? ticketName { get; set; }
        public int? ticketRow {  get; set; }
        public string? ticketType {  get; set; }
        public string? ticketSection { get; set; }
        public int quanity { get; set; }
        public decimal price { get; set; }
        public string? eventName { get; set; }
        public string? eventImage { get; set; }
    }

}
