namespace TicketResell_API.Controllers.User.Model
{
    public class Order
    {
        public string? orderId { get; set; }
        public string? userId { get; set; }
        
        public DateTime? orderDate { get; set; }
        public string? Status { get; set; }
        public decimal? totalAmount { get; set; }

    }
}
