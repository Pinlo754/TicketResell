using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TicketResell_API.Controllers.TicketController.Model;
using TicketResell_API.Controllers.User.Model;

namespace TicketResell_API.Controllers.OrderController.Model
{
    public class OrderDetail
    {
        [Key]public int? orderDetailId { get; set; }
        [MaxLength(450)] public string? orderId { get; set; }
        [MaxLength(450)] public string? ticketId { get; set; }
        public string? ticketName { get; set; }
        public string? ticketType { get; set; }
        public string? eventImage {  get; set; }
        public string? eventName {  get; set; }
        public string? userName { get; set; }
        public string? receiverPhone { get; set; }
        [Required]
        public string? receiverEmail { get; set; }
        public string? address { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
        public string? status { get; set; }
        public string? paymentMethod { get; set; }
        public DateTime? createdAt { get; set; }

        // Navigation properties
        [JsonIgnore]
        public Order? Order { get; set; }
        [JsonIgnore]
        public Ticket? Tickets { get; set; }
    }
}
