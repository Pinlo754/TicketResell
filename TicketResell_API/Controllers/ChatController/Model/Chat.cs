using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TicketResell_API.Controllers.UserController.Model;

namespace TicketResell_API.Controllers.ChatController.Model
{
    public class Chat
    {
        [Required]
        [Key][MaxLength(450)] public string seUserId { get; set; }

        // Navigation properties
        [JsonIgnore]
        public MainUser? User { get; set; }
        public ICollection<ChatData>? ChatData { get; set; }  = new List<ChatData>();


    }
    public class ChatData
    {
        [Key] public int Id { get; set; }
        public string lastMessage { get; set; }
         public string? messageId { get; set; }
        public bool messageSeen { get; set; } = false;
        public string reUserId { get; set; }
        public DateTime updatedAt { get; set; }
        public string ChatSeUserId { get; set; }

        // Navigation properties
        [JsonIgnore]
        public Chat? Chat { get; set; }

        [JsonIgnore]
        public Message? Message { get; set; }
    }
}
