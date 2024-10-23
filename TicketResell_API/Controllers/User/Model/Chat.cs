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
        [Key]public int id {  get; set; }
        public string lastMessage { get; set; }
        public string messageId { get; set; }
        public bool messageSeen { get; set; } = false;

        [Required]
        public string reUserId { get; set; }
        public DateTime updatedAt { get; set; } 
    }
}
