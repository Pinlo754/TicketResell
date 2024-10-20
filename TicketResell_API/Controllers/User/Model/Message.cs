using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class Message
    {
        public string? messageId { get; set; }
        public List<MessageData> messages { get; set; } = new List<MessageData>();
    }
    public class MessageData
    {
        [Key] public string? messageDataId { get; set; }
        public DateTime? createdAt { get; set; } = DateTime.UtcNow;
        public string? seUserId { get; set; }
        public string? Data { get; set; }
    }
}
