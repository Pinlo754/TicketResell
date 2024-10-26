namespace TicketResell_API.Controllers.OrderController.Model
{
    public class OrderWithDetails
    {
        public string? userId { get; set; } 
        public decimal totalAmount { get; set; } 
        public List<OrderDetail> OrderDetails { get; set; } 
    }
}
