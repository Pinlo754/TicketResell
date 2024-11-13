using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TicketResell_API.Controllers.ChatController.Model
{
    public class Message
    {
        [Key]public string? messageId { get; set; }
        public ICollection<MessageData> Messages { get; set; } = new List<MessageData>();
        [JsonIgnore]
        public ICollection<ChatData> ChatDataList { get; set; } = new List<ChatData>();
    }
    public class MessageData
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string messageId { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public string SeUserId { get; set; }
        public string Data { get; set; }

        // Navigation properties
        [JsonIgnore]
        public Message? Message { get; set; }
    }
}
