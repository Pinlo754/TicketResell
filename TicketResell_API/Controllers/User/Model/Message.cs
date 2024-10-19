using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class Message
    {
        [Key]public string? messageId { get; set; }
        public DateTime? createdAt { get; set; } = DateTime.UtcNow;
        public string? seUserId { get; set; }
        public string? Data { get; set; }
    }
}
