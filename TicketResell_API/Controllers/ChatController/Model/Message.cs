using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.ChatController.Model
{
    public class Message
    {
        [Key][MaxLength(450)] public string? messageId { get; set; }
        public ICollection<MessageData> Messages { get; set; } = new List<MessageData>();
    }
    public class MessageData
    {
        [Key]
        public int Id { get; set; }
        public string messageId { get; set; }
        public DateTime CreatedAt { get; set; }
        [Required]
        [MaxLength(450)] public string SeUserId { get; set; }
        [Required]
        public string Data { get; set; }

        // Navigation properties
        public Message Message { get; set; }
    }
}
