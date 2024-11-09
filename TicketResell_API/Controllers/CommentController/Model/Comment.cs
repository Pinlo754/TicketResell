using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TicketResell_API.Controllers.User.Model;
using TicketResell_API.Controllers.UserController.Model;

namespace TicketResell_API.Controllers.CommentController.Model
{
    public partial class Comment
    {
        [MaxLength(450)] public string? userId { get; set; }
        public string? commentId { get; set;}
        public int? rating { get; set; }
        public DateTime? time { get; set; }
        public string? comment {  get; set; }
        [MaxLength(450)] public string? orderId { get; set; }
        [MaxLength(450)] public string? toUserId { get; set; }

        // Navigation properties
        [JsonIgnore]
        public MainUser? User { get; set; }
        [JsonIgnore]
        public Order? Order { get; set; }
        [JsonIgnore]
        public MainUser? ToUser { get; set; }
    }
}
