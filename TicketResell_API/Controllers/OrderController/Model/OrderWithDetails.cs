using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.OrderController.Model
{
    public class OrderWithDetails
    {
        [MaxLength(450)] public string? userId { get; set; } 
        public decimal totalAmount { get; set; } 
        public string status { get; set; }
        public List<OrderDetail> OrderDetails { get; set; } 
    }
}
