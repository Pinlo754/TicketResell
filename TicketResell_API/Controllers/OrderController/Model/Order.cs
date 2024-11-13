using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TicketResell_API.Controllers.CommentController.Model;
using TicketResell_API.Controllers.OrderController.Model;
using TicketResell_API.Controllers.RefundController.Model;
using TicketResell_API.Controllers.UserController.Model;

namespace TicketResell_API.Controllers.User.Model
{
    public class Order
    {
        [MaxLength(450)] public string? orderId { get; set; }
        [MaxLength(450)] public string? userId { get; set; }
        [MaxLength(450)] public string? sellerId { get; set; }
        public DateTime? orderDate { get; set; }
        public decimal? totalAmount { get; set; }


        // Navigation properties
        [JsonIgnore]
        public MainUser? User { get; set; }
        [JsonIgnore]
        public ICollection<OrderDetail>? OrderDetails { get; set; }
        [JsonIgnore]
        public ICollection<Comment>? Comments { get; set; }
        [JsonIgnore]
        public RefundRequest? RefundRequests { get; set; }
    }
}
