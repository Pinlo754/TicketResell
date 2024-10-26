using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.OrderController.Model
{
    public class OrderDetail
    {
        [Key]public int? orderDetailId { get; set; }
        public string? orderId { get; set; }
        public string? ticketId { get; set; }
        public string? receiverName { get; set; }
        public string? receiverPhone { get; set; }
        public string? receiverEmail { get; set; }
        public string? address { get; set; }
        public decimal price { get; set; }
        public int? quantity { get; set; }
        public string? status { get; set; }
        public DateTime? createdAt { get; set; }
    }
}
