using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class Chat
    {
        [Required]
       [Key] public string seUserId {  get; set; }
       public List<ChatData> ChatData { get; set; } = new List<ChatData>();
    }
    public class ChatData
    {
        
        public string lastMessage { get; set; }
        [Key]public string messageId { get; set; }
        public bool messageSeen { get; set; } = false;

        [Required]
        public string reUserId { get; set; }
        public DateTime updatedAt { get; set; } = DateTime.Now;
        public string ChatseUserId {  get; set; }
    }
}
