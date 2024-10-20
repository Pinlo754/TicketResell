using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class Message
    {
        [Key]public string? messageId { get; set; }
        public List<MessageData> Messages { get; set; } = new List<MessageData>();
    }
    public class MessageData
    {
        [Key]
        public int Id { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; 
        [Required]
        public string SeUserId { get; set; }
        [Required]
        public string Data { get; set; }
    }
}
