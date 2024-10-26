namespace TicketResell_API.Controllers.User.Model
{
    public class Order
    {
        public int? orderId { get; set; }
        public string? userId { get; set; }
        public string? receiverName { get; set; }
        public string? receiverPhone { get; set; }
        public string? receiverEmail { get; set; }
        public DateTime? orderDate { get; set; }
        public string? Status { get; set; }
        public string? address { get; set; }
        public decimal? totalAmount { get; set; }
        public int? statusId { get; set; }
        public int? rateId { get; set; }
    }
}
