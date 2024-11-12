using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TicketResell_API.Controllers.User.Model;

namespace TicketResell_API.Controllers.RefundController.Model
{
    public class RefundRequest
    {
        [MaxLength(450)] [Key] public string? requestId { get; set; } 
        [MaxLength(450)] public string? orderId { get; set; }
        public string? refundDetail { get; set; }
        public string[] images { get; set; }
        public string? status { get; set; }

        //navigate properties
        [JsonIgnore]
        public Order? Orders { get; set; }
    }
}
