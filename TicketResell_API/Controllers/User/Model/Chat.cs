using System.ComponentModel.DataAnnotations;

namespace TicketResell_API.Controllers.User.Model
{
    public class Chat
    {

       [Key] public string? seUserId {  get; set; }
       public List<ChatData> ChatData { get; set; } = new List<ChatData>();
    }
    public class ChatData
    {
        public string LastMessage { get; set; }
        public string MessageId { get; set; }
        public bool MessageSeen { get; set; } = false;
        [Key] public string reUserId { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
